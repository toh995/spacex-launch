import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import faker from 'faker';

module('Integration | Component | details-page/index', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('should show the correct name', async function(assert) {
    const launch = this.server.create('launch');
    
    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__name').exists({ count: 1 });
    assert.dom('.details-page__name').hasText(launch.name);
  });


  test('should show a video and not an image, if there is a youtube ID', async function(assert) {
    const launch = this.server.create('launch');
    launch.update({
      youtubeId: faker.internet.password(),
    });
    
    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__image').doesNotExist();
    assert.dom('.details-page__video').exists({ count: 1 });
    assert.dom('.details-page__video').hasTagName('iframe');
    assert.dom('.details-page__video')
      .hasAttribute('src', `https://www.youtube.com/embed/${launch.youtubeId}`);
  });


  test('should show an image and not a video, if there is no youtube ID', async function(assert) {
    const rocket = this.server.create('rocket');
    rocket.update({ youtubeId: '' });

    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('rocket', rocket.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__video').doesNotExist();
    assert.dom('.details-page__image').exists({ count: 1 });
    assert.dom('.details-page__image').hasTagName('img');
    assert.dom('.details-page__image').hasAttribute('src', rocket.imageUrl);
  });


  test('should show the correct description', async function(assert) {
    const launch = this.server.create('launch');

    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__description').includesText(launch.description);
  });


  test('should handle no description', async function(assert) {
    const launch = this.server.create('launch');
    launch.update({ description: '' });

    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__description').includesText('No description.');
  });


  test('should show comments if they exist', async function(assert) {
    const launch = this.server.create('launch');
    this.server.createList('comment', 10, { launch });

    const store = this.owner.lookup('service:store');
    
    // query for comments
    await store.query('comment', {
      filter: { launchId: launch.id },
    });

    // get launch record
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__comment').exists({ count: 10 });
  });


  test('should not show comments if there are none', async function(assert) {
    const launch = this.server.create('launch');
    launch.update({
      commentIds: null
    });

    const store = this.owner.lookup('service:store');
    const emberRecord = await store.findRecord('launch', launch.id);

    this.set('model', emberRecord);

    await render(hbs`<DetailsPage @model={{this.model}}/>`);

    assert.dom('.details-page__comment').doesNotExist();
  });
});

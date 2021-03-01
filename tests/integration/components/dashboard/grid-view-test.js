import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | dashboard/grid-view', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('should show one card per record', async function(assert) {
    this.server.createList('rocket', 5);

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    assert.dom('.grid-view__card').exists({ count: 5 });
    assert.dom('.grid-view__card-image').exists({ count: 5 });
    assert.dom('.grid-view__card-description').exists({ count: 5 });
    assert.dom('.grid-view__card-links').exists({ count: 5 });
    assert.dom('.grid-view__card-link-detail').exists({ count: 5 });
    assert.dom('.grid-view__card-link-wiki').exists({ count: 5 });
  });


  test('should show the correct name', async function(assert) {
    const rocket = this.server.create('rocket');

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    assert.dom('.grid-view__card-name').hasText(rocket.name);
  });


  test('should show the correct image', async function(assert) {
    const rocket = this.server.create('rocket');

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    assert.dom('.grid-view__card-image').hasTagName('img');
    assert.dom('.grid-view__card-image').hasAttribute('src', rocket.imageUrl);
  });


  test('should show the correct description', async function(assert) {
    const rocket = this.server.create('rocket');

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    assert.dom('.grid-view__card-description').hasText(rocket.description);
  });


  test('should show the correct detail link', async function(assert) {
    // create record in mirage server, then save that to component
    const rocket = this.server.create('rocket');

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    // start router for LinkTo component
    this.owner.lookup('router:main').startRouting(true);

    // render the component
    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    assert.dom('.grid-view__card-link-detail').hasText('View Detail');
    assert.dom('.grid-view__card-link-detail').hasAttribute('href', `/rockets/${rocket.id}`);
  });


  test('should show the correct wiki link', async function(assert) {
    // create record in mirage server, then save that to component
    const rocket = this.server.create('rocket');

    const store = this.owner.lookup('service:store');
    const records = await store.findAll('rocket');

    this.set('records', records);
    this.set('modelName', 'rocket');

    // render the component
    await render(hbs`
      <Dashboard::GridView
        @records={{this.records}}
        @modelName={{this.modelName}}
      />
    `);

    // check the inner HTML
    assert.dom('.grid-view__card-link-wiki').hasText('View Rocket');
    assert.dom('.grid-view__card-link-wiki').hasAttribute('href', rocket.wikipediaUrl);
  });
});

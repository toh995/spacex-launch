import { visit, click } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  // button tests
  test('should disable the launches button after it has been clicked', async function(assert) {
    await visit('/');
    await click('[data-qid="launches-button"]');
    assert.dom('[data-qid="launches-button"]').isDisabled();
  });


  test('should disable the rockets button after it has been clicked', async function(assert) {
    await visit('/');
    await click('[data-qid="rockets-button"]');
    assert.dom('[data-qid="rockets-button"]').isDisabled();
  });


  test('should disable the list view after it has been clicked', async function(assert) {
    await visit('/');
    await click('[data-qid="list-view"]');
    assert.dom('[data-qid="list-view"]').isDisabled();
  });


  test('should disable the grid view button by default', async function(assert) {
    await visit('/');
    assert.dom('[data-qid="grid-view"]').isDisabled();
  });


  test('should disable the grid view button after clicking list view and clicking grid view again', async function(assert) {
    await visit('/');
    await click('[data-qid="list-view"]');
    await click('[data-qid="grid-view"]');
    assert.dom('[data-qid="grid-view"]').isDisabled();
  });


  // grid view
  test('should only display launches, when launches and grid view are selected', async function(assert) {
    this.server.createList('launch', 10);
    this.server.createList('rocket', 5);

    await visit('/');
    await click('[data-qid="launches-button"]');

    // assume that grid view is already selected by default, so we don't need to select it.
    assert.dom('.grid-view__card').exists({ count: 10 });
  });


  test('should only display rockets, when rockets and grid view are selected', async function(assert) {
    this.server.createList('launch', 10);
    this.server.createList('rocket', 5);
    
    await visit('/');
    await click('[data-qid="rockets-button"]');

    // assume that grid view is already selected by default, so we don't need to select it.
    assert.dom('.grid-view__card').exists({ count: 5 });
  });


  // list view
  test('should only display launches, when launches and list view are selected', async function(assert) {
    this.server.createList('launch', 10);
    this.server.createList('rocket', 5);
    
    await visit('/');
    await click('[data-qid="launches-button"]');
    await click('[data-qid="list-view"]');

    assert.dom('.list-view-card').exists({ count: 10 });
  });


  test('should only display rockets when rockets and list view are selected', async function(assert) {
    this.server.createList('launch', 10);
    this.server.createList('rocket', 5);
    
    await visit('/');
    await click('[data-qid="rockets-button"]');
    await click('[data-qid="list-view"]');

    assert.dom('.list-view-card').exists({ count: 5 });
  });
});

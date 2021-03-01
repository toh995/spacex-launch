import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Controller | dashboard', function(hooks) {
  setupTest(hooks);

  test('#selectedRecords should be populated with data, when appropriate', function(assert) {
    const controller = this.owner.lookup('controller:dashboard');
    const store = this.owner.lookup('service:store');

    store.createRecord('launch');
    store.createRecord('launch');

    const launches = store.peekAll('launch');

    controller.selectedModelName = 'launch';
    controller.model = { launches };

    const { selectedRecords } = controller;

    // make sure that it's sorted by name now
    assert.strictEqual(selectedRecords, launches);
  });


  test('#selectedRecords should return an empty array, when appropriate', function(assert) {
    const controller = this.owner.lookup('controller:dashboard');

    controller.selectedModelName = 'launch';
    controller.model = {};

    assert.strictEqual(controller.selectedRecords.length, 0);
  });


  test('#selectModelName updates the `selectedModelName` property', function(assert) {
    const controller = this.owner.lookup('controller:dashboard');
    controller.send('selectModelName', 'rocket');
    assert.strictEqual(controller.selectedModelName, 'rocket');
  });


  test('#selectModelName updates the `selectedRecords` computed property', function(assert) {
    const controller = this.owner.lookup('controller:dashboard');
    const launches = [1,2,3];
    controller.model = { launches };

    controller.send('selectModelName', 'launch');

    assert.deepEqual(controller.selectedRecords, launches);
  });


  test('#selectLayout updates the `selectedLayout` property', function(assert) {
    const controller = this.owner.lookup('controller:dashboard');
    controller.send('selectLayout', 'list');
    assert.strictEqual(controller.selectedLayout, 'list');
  });
});

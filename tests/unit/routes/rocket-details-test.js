import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | rocket-details', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:rocket-details');
    assert.ok(route);
  });
});

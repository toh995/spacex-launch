import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | rocket', function(hooks) {
  setupTest(hooks);

  test('#urlForFindAll returns the correct url', function(assert) {
    const adapter = this.owner.lookup('adapter:rocket');
    const url = adapter.urlForFindAll('rocket');
    assert.strictEqual(url, 'https://api.spacexdata.com/v4/rockets');
  });


  test('#urlForFindRecord returns the correct url', function(assert) {
    const adapter = this.owner.lookup('adapter:rocket');
    const url = adapter.urlForFindRecord('id', 'rocket');
    assert.strictEqual(url, 'https://api.spacexdata.com/v4/rockets/id');
  });
});

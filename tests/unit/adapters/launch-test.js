import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | launch', function(hooks) {
  setupTest(hooks);

  test('#urlForFindAll returns the correct url', function(assert) {
    const adapter = this.owner.lookup('adapter:launch');
    const url = adapter.urlForFindAll('launch');
    assert.strictEqual(url, 'https://api.spacexdata.com/v4/launches');
  });


  test('#urlForFindRecord returns the correct url', function(assert) {
    const adapter = this.owner.lookup('adapter:launch');
    const url = adapter.urlForFindRecord('id', 'launch');
    assert.strictEqual(url, 'https://api.spacexdata.com/v4/launches/id');
  });
});

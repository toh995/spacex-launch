import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | comment', function(hooks) {
  setupTest(hooks);


  test('#urlForQuery returns the correct url', function(assert) {
    const adapter = this.owner.lookup('adapter:comment');
    
    const queryObj = {
      filter: { launchId: 'launchId' }
    };
    const url = adapter.urlForQuery(queryObj, 'comment')

    assert.strictEqual(url, '/api/comments');
  });
});

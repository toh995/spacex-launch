import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { sortBy } from 'spacex-launch/helpers/sort-by';
import { assert, module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | sort-by', function(hooks) {
  setupTest(hooks);

  test('should sort with one property', function(assert) {
    let colors = [
      { name: 'red', weight: 500 },
      { name: 'green', weight: 600 },
      { name: 'blue', weight: 500 }
    ];
    colors = ArrayProxy.create({ content: A(colors) });

    const sorted = sortBy([colors, 'name']);

    assert.strictEqual(sorted[0].name, 'blue');
    assert.strictEqual(sorted[0].weight, 500);

    assert.strictEqual(sorted[1].name, 'green');
    assert.strictEqual(sorted[1].weight, 600);

    assert.strictEqual(sorted[2].name, 'red');
    assert.strictEqual(sorted[2].weight, 500);
  });


  test('should sort with two properties', function(assert) {
    let colors = [
      { name: 'red', weight: 500 },
      { name: 'green', weight: 600 },
      { name: 'blue', weight: 500 }
    ];
    colors = ArrayProxy.create({ content: A(colors) });

    const sorted = sortBy([colors, 'weight', 'name']);

    assert.strictEqual(sorted[0].name, 'blue');
    assert.strictEqual(sorted[0].weight, 500);

    assert.strictEqual(sorted[1].name, 'red');
    assert.strictEqual(sorted[1].weight, 500);

    assert.strictEqual(sorted[2].name, 'green');
    assert.strictEqual(sorted[2].weight, 600);
  });


  test('should return an empty array, if an empty array is given', function(assert) {
    const arr = ArrayProxy.create({ content: A() });
    const sorted = sortBy([arr, 'name']);
    assert.strictEqual(sorted.length, 0);
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | singularize', function(hooks) {
  setupRenderingTest(hooks);

  /**
   * It is very difficult to have a test case for every possible
   * plural/singular exception in the English language... we just have
   * a few examples here just as a smoke test
   */
  test('should singularize horses', async function(assert) {
    this.set('inputValue', 'horses');
    await render(hbs`{{singularize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'horse');
  });


  test('should singularize sheep', async function(assert) {
    this.set('inputValue', 'sheep');
    await render(hbs`{{singularize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'sheep');
  });


  test('should singularize flies', async function(assert) {
    this.set('inputValue', 'flies');
    await render(hbs`{{singularize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'fly');
  });


  test('should not change the string if it is already singular', async function(assert) {
    this.set('inputValue', 'computer');
    await render(hbs`{{singularize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'computer');
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setResolver } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | capitalize', function(hooks) {
  setupRenderingTest(hooks);

  test('should capitalize the first letter of the string', async function(assert) {
    this.set('inputValue', 'abC');
    await render(hbs`{{capitalize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'AbC');
  });


  test('should not change the string if the first letter is already capitlized', async function(assert) {
    this.set('inputValue', 'AbC');
    await render(hbs`{{capitalize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'AbC');
  });


  test('should not change the string if the first letter is not a letter', async function(assert) {
    this.set('inputValue', '123abc');
    await render(hbs`{{capitalize inputValue}}`);
    assert.equal(this.element.textContent.trim(), '123abc');
  });


  test('should return an empty string if an empty string is supplied', async function(assert) {
    this.set('inputValue', '');
    await render(hbs`{{capitalize inputValue}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});

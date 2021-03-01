import { helper } from '@ember/component/helper';
import { singularize as emberSingularize } from 'ember-inflector';

// takes a string, returns a new copy of the string in singular form
export default helper(function singularize([str]) {
  return emberSingularize(str);
});

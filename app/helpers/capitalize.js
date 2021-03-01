import { helper } from '@ember/component/helper';

// takes a string, returns a new copy of the string, with the first letter capitalized
export default helper(function capitalize([str]) {
  if (str === '') {
    return '';
  }
  
  else {
    return str[0].toUpperCase() + str.substring(1);
  }
});

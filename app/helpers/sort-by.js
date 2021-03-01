import { helper } from '@ember/component/helper';

// takes an EmberArray, and returns a new array that is sorted by the given properties.
export function sortBy([arr, ...props]) {
  return arr.sortBy(...props);
}

export default helper(sortBy);

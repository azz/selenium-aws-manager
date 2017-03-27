import { isFunction } from 'lodash';

export function getNameFromTags(tags) {
  const tag = tags.find(tag => tag.Key === 'Name');
  return tag ? tag.Value : '<No Name>';
}

export function bindMethods(object) {
  for (const key in object) {
    if (isFunction(object[key])) object[key] = bind(object[key], object);
  }
  return object;
}

function bind(func, context) {
  return (...args) => func.apply(context, args);
}

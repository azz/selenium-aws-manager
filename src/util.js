export function getNameFromTags(tags) {
  const tag = tags.find(tag => tag.Key === 'Name');
  return tag ? tag.Value : '<No Name>';
}

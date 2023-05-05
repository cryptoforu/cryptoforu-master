export function toHeadline(str: string, separator = '_') {
  if (!str) {
    return '';
  }
  const strArr = str.split(separator).map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  return strArr.join(' ');
}

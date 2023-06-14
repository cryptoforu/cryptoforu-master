export const numberFormat = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export const parseFloatNumber = (value: string) => {
  const floatValue = parseFloat(value);
  return !isNaN(floatValue) ? floatValue : null;
};

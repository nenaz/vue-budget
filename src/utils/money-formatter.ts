
const moneyFormat = (amount = '0.00', withCurrency?: boolean): string => {
  const value = amount.toString().replace(/[A-z]/g, '');
  // console.log('value', value);
  // const hasSymbol = /[A-z]/g.test(amount.toString());
  // if (hasSymbol) {
  //   return amount.toString().replace(/[A-z]/g, '');
  // }
  if (withCurrency) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(Number(value));
  }
  return new Intl.NumberFormat('ru-RU').format(Number(value));
};

export default moneyFormat;

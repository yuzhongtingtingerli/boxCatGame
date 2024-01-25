export const getAddress = (add) => {
  return add.slice(0, 4) + "......" + add.slice(-4);
};
export const getMoney = (money) => {
  const num = money.toString().split(".")[0].length > 6 ? 3 : 6;
  const m = Number(money).toFixed(num);
  // 每隔三位小数加一个,
  return m?.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
};

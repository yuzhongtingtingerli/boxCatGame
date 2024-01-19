export const getAddress = (add) => {
  return add.slice(0, 4) + "......" + add.slice(-4);
};
export const getMoney = (money) => {
  // 每隔三位小数加一个,
  return money?.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
};

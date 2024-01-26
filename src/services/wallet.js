import { getBrc20Summary } from "./walletApi";

export const getBrc20SummaryData = async (params) => {
  try {
    const { code, data, msg } = await getBrc20Summary(params);
    const statusCode = parseInt(code);
    if (statusCode === 0) {
      return { msg, data };
    } else {
      return { msg };
    }
  } catch (error) {
    return { msg: error };
  }
};

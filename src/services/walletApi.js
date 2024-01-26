import { requestWallet } from "./request.js";
export const getBrc20Summary = (address) => {
  return requestWallet(
    `https://open-api.unisat.io/v1/indexer/address/${address}/brc20/summary`,
    "get"
  );
};

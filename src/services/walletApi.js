import { requestWallet, requestM } from "./request.js";
export const getBrc20Summary = (address) => {
  return requestWallet(
    `https://open-api.unisat.io/v1/indexer/address/${address}/brc20/summary`,
    "get"
  );
};

export const getRecommended = () => {
  return requestM(`https://mempool.space/api/v1/fees/recommended`, "get");
};

export const getTransferableInscriptions = ({ address, ticker }) => {
  return requestWallet(
    `https://open-api.unisat.io/v1/indexer/address/${address}/brc20/${ticker}/transferable-inscriptions`,
    "get"
  );
};

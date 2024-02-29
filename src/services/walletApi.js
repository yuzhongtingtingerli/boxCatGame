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
// https://open-api.unisat.io/v1/indexer/address/bc1pegf237syuuqkwfcgn3fkd76c9w5et5lwtdeqma043l2cwn269xtsce750u/inscription-utxo-data
// export const getTransferableInscriptions = ({ address, ticker }) => {
//   return requestWallet(
//     `https://open-api.unisat.io/v1/indexer/address/${address}/inscription-utxo-data`,
//     "get"
//   );
// };

export const getTransferableInscriptions = ({ address, ticker }) => {
  return requestWallet(
    `https://open-api.unisat.io/v1/indexer/address/${address}/brc20/${ticker}/transferable-inscriptions`,
    "get"
  );
};

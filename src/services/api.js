import { request } from "./request.js";

export const getGroupDetailInfo = (params) => {
  return request(`/blockchain/getGroupDetailInfo?UserAddress=${params}`, "get");
};

export const getScore = (params) => {
  return request(`/blockchain/getScore?UserAddress=${params}`, "get");
};

export const getJoinGroup = (params) => {
  return request(`/blockchain/getJoinGroup?UserAddress=${params}`, "get");
};

export const getGroupList = ({ Offset, Limit }) => {
  return request(
    `/blockchain/getGroupList?Offset=${Offset}&Limit=${Limit}`,
    "get"
  );
};

export const getTokenLogo = () => {
  return request(`/blockchain/getTokenLogo`, "get");
};

export const getGroupScoreRank = ({ Offset, Limit, groupName }) => {
  return request(
    `/blockchain/getGroupScoreRank?Offset=${Offset}&Limit=${Limit}&GroupName=${groupName}`,
    "get"
  );
};

export const getScoreRank = ({ Offset, Limit }) => {
  return request(
    `/blockchain/getScoreRank?Offset=${Offset}&Limit=${Limit}`,
    "get"
  );
};

export const getGroupTVLRank = () => {
  return request(`/blockchain/getGroupTVLRank`, "get");
};

export const getPersonalTVLRank = () => {
  return request(`/blockchain/getPersonalTVLRank`, "get");
};

export const getLastScoreRank = ({ Offset, Limit }) => {
  return request(
    `/blockchain/getLastScoreRank?Offset=${Offset}&Limit=${Limit}`,
    "get"
  );
};

export const getGroupSearch = (groupName) => {
  return request(`/blockchain/getGroupSearch?TokenSymbol=${groupName}`, "get");
};

// 获取桥的记录列表
export const getBridgeList = ({ BridgeType, UserAddress, Offset, Limit }) => {
  return request(
    `/stake/getBridgeList?BridgeType=${BridgeType}&UserAddress=${UserAddress}&Offset=${Offset}&Limit=${Limit}`,
    "get"
  );
};

export const doBridge = ({
  BridgeFromAddress,
  BridgeType,
  BridgeTokenSymbol,
  BridgeTokenBalance,
  BridgeTxHash,
  BridgeToAddress,
}) => {
  return request(
    `/stake/doBridge?BridgeFromAddress=${BridgeFromAddress}&BridgeType=${BridgeType}&BridgeTokenSymbol=${BridgeTokenSymbol}&BridgeTokenBalance=${BridgeTokenBalance}&BridgeTxHash=${BridgeTxHash}&BridgeToAddress=${BridgeToAddress}`,
    "get"
  );
};

export const getTotalStakeInfo = () => {
  return request(`/stake/getTotalStakeInfo`, "get");
};

export const getWalletStakeInfo = ({ UserAddress }) => {
  return request(`/stake/getWalletStakeInfo?UserAddress=${UserAddress}`, "get");
};

export const getSakeList = ({ UserAddress }) => {
  return request(`/stake/getSakeList?UserAddress=${UserAddress}`, "get");
};

export const getTreasure = ({ UserAddress }) => {
  return request(`/stake/getTreasure?UserAddress=${UserAddress}`, "get");
};

export const doStake = ({
  UserAddress,
  StakeTokenSymbol,
  StakeTokenBalance,
  StakeTxHash,
}) => {
  return request(
    `/stake/doStake?UserAddress=${UserAddress}&StakeTokenSymbol=${StakeTokenSymbol}&StakeTokenBalance=${StakeTokenBalance}&StakeTxHash=${StakeTxHash}`,
    "get"
  );
};

export const getTVLStatus = ({ StakeTokenSymbol, StakeTokenBalance }) => {
  return request(
    `/stake/getTVLStatus?StakeTokenSymbol=${StakeTokenSymbol}&StakeTokenBalance=${StakeTokenBalance}`,
    "get"
  );
};

export const checkAddressMapping = ({ BtcAddress, EthAddress }) => {
  return request(
    `/stake/checkAddressMapping?BtcAddress=${BtcAddress}&EthAddress=${EthAddress}`,
    "get"
  );
};

export const insertAddressMapping = ({ BtcAddress, EthAddress }) => {
  return request(
    `/stake/insertAddressMapping?BtcAddress=${BtcAddress}&EthAddress=${EthAddress}`,
    "get"
  );
};

export const getETHContractAddress = ({ TokenSymbol }) => {
  return request(
    `/stake/getETHContractAddress?TokenSymbol=${TokenSymbol}`,
    "get"
  );
};

export const getTransferInfo = () => {
  return request(`/stake/getTransferInfo`, "get");
};

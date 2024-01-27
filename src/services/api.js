import { request } from "./request.js";

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

export const getGroupSearch = ({ groupName }) => {
  return request(`/blockchain/getGroupSearch?TokenSymbol=${groupName}`, "get");
};

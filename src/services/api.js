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

import { getScore, getJoinGroup, getGroupList } from "./api";

export const getScoreData = async (params) => {
  try {
    const { code, result, status } = await getScore(params);
    const statusCode = parseInt(code);
    if (statusCode === 1) {
      return { status, result };
    } else {
      return { status, result: "请求失败" };
    }
  } catch (error) {
    return { result: error };
  }
};

export const getJoinGroupData = async (params) => {
  try {
    const { code, result, status } = await getJoinGroup(params);
    const statusCode = parseInt(code);
    if (statusCode === 1) {
      return { status, result };
    } else {
      return { status, result: "请求失败" };
    }
  } catch (error) {
    return { result: error };
  }
};

export const getGroupListData = async (params) => {
  try {
    const { code, result, status } = await getGroupList(params);
    const statusCode = parseInt(code);
    if (statusCode === 1) {
      return { status, result };
    } else {
      return { status, result: "请求失败" };
    }
  } catch (error) {
    return { result: error };
  }
};

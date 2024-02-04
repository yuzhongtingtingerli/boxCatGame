import {
  getGroupDetailInfo,
  getScore,
  getJoinGroup,
  getGroupList,
  getTokenLogo,
  getGroupScoreRank,
  getScoreRank,
  getGroupTVLRank,
  getPersonalTVLRank,
  getLastScoreRank,
  getGroupSearch,
  getBridgeList,
  doBridge,
  getTotalStakeInfo,
  getWalletStakeInfo,
  getSakeList,
  getTreasure,
  doStake,
  getTVLStatus,
} from "./api";

export const getGroupDetailInfoData = async () => {
  try {
    const { code, result, status } = await getGroupDetailInfo();
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

export const getTokenLogoData = async (params) => {
  try {
    const { code, result, status } = await getTokenLogo(params);
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

export const getGroupScoreRankData = async (params) => {
  try {
    const { code, result, status } = await getGroupScoreRank(params);
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

export const getScoreRankData = async (params) => {
  try {
    const { code, result, status } = await getScoreRank(params);
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

export const getGroupTVLRankData = async (params) => {
  try {
    const { code, result, status } = await getGroupTVLRank(params);
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

export const getPersonalTVLRankData = async (params) => {
  try {
    const { code, result, status } = await getPersonalTVLRank(params);
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

export const getLastScoreRankData = async (params) => {
  try {
    const { code, result, status } = await getLastScoreRank(params);
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

export const getGroupSearchData = async (params) => {
  try {
    const { code, result, status } = await getGroupSearch(params);
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

export const getBridgeListData = async (params) => {
  try {
    const { code, result, status } = await getBridgeList(params);
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

export const doBridgeData = async (params) => {
  try {
    const { code, result, status } = await doBridge(params);
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

export const getTotalStakeInfoData = async (params) => {
  try {
    const { code, result, status } = await getTotalStakeInfo(params);
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

export const getWalletStakeInfoData = async (params) => {
  try {
    const { code, result, status } = await getWalletStakeInfo(params);
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

export const getSakeListData = async (params) => {
  try {
    const { code, result, status } = await getSakeList(params);
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

export const getTreasureData = async (params) => {
  try {
    const { code, result, status } = await getTreasure(params);
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

export const doStakeData = async (params) => {
  try {
    const { code, result, status } = await doStake(params);
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

export const getTVLStatusData = async (params) => {
  try {
    const { code, result, status } = await getTVLStatus(params);
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
<template>
  <div class="myRecord">
    <div class="head">
      <div class="title">
        <div class="left">My Record</div>
        <div class="right">
          <template v-if="Address.getBTCaddress && walletType === 'BTC'">
            <img
              v-if="Address.getBTCWalletType === 'unisat'"
              src="@/assets/uniset-logo.png"
              width="28px"
              alt=""
              srcset=""
            />
            <img
              v-if="Address.getBTCWalletType === 'okx'"
              src="@/assets/okx-wallet.png"
              width="28px"
              alt=""
              srcset=""
            />
            {{ getAddress(Address.getBTCaddress) }}
          </template>
          <template v-if="Address.getETHaddress && walletType === 'ETH'">
            <img
              v-if="Address.getETHWalletType === 'eth'"
              src="@/assets/matemask.png"
              width="28px"
              alt=""
              srcset=""
            />
            <img
              v-if="Address.getETHWalletType === 'ip'"
              src="@/assets/okx-wallet.png"
              width="28px"
              alt=""
              srcset=""
            />
            {{ getAddress(Address.getETHaddress) }}
          </template>
        </div>
      </div>
      <div class="refresh" @click="refreshBridgeList">
        <img src="@/assets/refresh.png" width="18px" />
        Refresh
      </div>
    </div>
    <a-spin :spinning="spinning">
      <div v-if="myRecord?.length > 0" class="information">
        <div
          class="list-item"
          v-for="item in myRecord"
          :key="item.BridgeTokenTime"
        >
          <div class="left">
            <div :class="`sent ${activeColor}`">
              Sent {{ getMoney(item.BridgeTokenBalance) }}
              {{ decodeURIComponent(item.BridgeTokenSymbol) }}
            </div>
            <div class="wait">
              <div
                :class="`point ${
                  item.BridgeWorkFlow == '1'
                    ? `flash ${activeColor}`
                    : activeColor
                }`"
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span :class="`${item.BridgeWorkFlow != '1' ? activeColor : ''}`">
                Wait The {{ walletType }} Network Confirm</span
              >
            </div>
            <div class="tokens">
              <div
                :class="`point  ${
                  item.BridgeWorkFlow == '2' || item.BridgeWorkFlow == '3'
                    ? `flash ${activeColor}`
                    : item.BridgeWorkFlow == '4'
                    ? activeColor
                    : ''
                }`"
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span :class="`${item.BridgeWorkFlow == '4' ? activeColor : ''}`"
                >Bitparty Smactcontract Sent Your ERC20 Tokens</span
              >
            </div>
          </div>
          <div
            :class="`status ${getStatusColor(item.BridgeTokenStatus)}`"
            @click="handleStatus(item)"
          >
            {{ item.BridgeTokenStatus }}
          </div>
        </div>
      </div>
      <div v-else class="information noInformation">No Information</div>
    </a-spin>

    <a-pagination
      v-if="myRecord?.length > 0 && total > 4"
      v-model:current="current"
      :pageSize="4"
      :total="total"
      size="small"
      @change="handleChange"
      :showSizeChanger="false"
    />
  </div>
  <bitpartyAddress ref="bitpartyAddressRef" @change="isSuccess" />
  <StakeSuccess ref="stakeSuccessRef" />
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMoney, getAddress } from "@/utils/Tools.js";
import { getBridgeListData } from "@/services/index";
import StakeSuccess from "@/components/stake-success.vue";
import { useAddressStore } from "@/store/address";
import bitpartyAddress from "./bitpartyAddress.vue";
const Address = useAddressStore();
const current = ref(1);
const total = ref(0);
const myRecord = ref(null);
const handleChange = (page, pageSize) => {
  current.value = page;
  getBridgeList();
};
const stakeSuccessRef = ref(null);
const isSuccess = (txid) => {
  stakeSuccessRef.value.open(txid, TokenSymbol.value);
  getBridgeList();
};
const spinning = ref(false);
const getBridgeList = async () => {
  myRecord.value = null;
  total.value = 0;
  if (!Address.getBTCaddress && walletType.value === "BTC") return;
  if (!Address.getETHaddress && walletType.value === "ETH") return;
  spinning.value = true;
  const bridgeType = walletType.value === "BTC" ? 1 : 2;
  const userAddress =
    walletType.value === "BTC" ? Address.getBTCaddress : Address.getETHaddress;
  try {
    const res = await getBridgeListData({
      BridgeType: bridgeType,
      UserAddress: userAddress,
      Offset: current.value,
      Limit: 4,
    });
    myRecord.value = res.result.BridgeInfo;
    total.value = res.result.TotalListNumber;
    spinning.value = false;
  } catch (error) {
    console.log(error, "error");
    spinning.value = false;
  }
};
const refreshBridgeList = () => {
  myRecord.value = null;
  current.value = 1;
  total.value = 0;
  getBridgeList();
};
const walletType = ref("BTC");
const activeColor = ref("activeY");
const getWalletType = (type) => {
  walletType.value = type;
  if (type === "BTC") {
    activeColor.value = "activeY";
  } else {
    activeColor.value = "activeB";
  }
  getBridgeList();
  console.log("???");
};
const bitpartyAddressRef = ref(null);
const router = useRouter();
const handleStatus = (item) => {
  if (item.BridgeTokenStatus === "Go Stake") {
    router.push({ path: "/stake" });
  }
};
const getStatusColor = (status) => {
  let color = "white";
  switch (status) {
    case "pending":
      color = "white";
      break;
    case "Failed":
      color = "red";
      break;
    case "Go Stake":
      color = "green";
      break;
    default:
      color = "white";
      break;
  }
  return color;
};
watch(
  Address,
  (newVal, oldVal) => {
    getBridgeList();
  },
  { immediate: true }
);

onMounted(() => {
  // 每15分钟执行一次
  // setInterval(() => {
  //   getBridgeList();
  // }, 1000 * 60 * 15);
});
defineExpose({ refreshBridgeList, getWalletType });
</script>

<style>
.myRecord .ant-pagination.ant-pagination-mini {
  margin-top: 16px auto;
}
.ant-pagination {
  text-align: center !important;
}
.ant-pagination.ant-pagination-mini.css-dev-only-do-not-override-19yxfbp {
}
.ant-pagination-item-ellipsis {
  color: #fff !important;
}
</style>
<style scoped lang="scss">
.myRecord {
  margin-top: 32px;
  .head {
    display: flex;
    justify-content: space-between;
    .refresh {
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      margin-top: 50px;
      margin-right: 40px;
      cursor: pointer;
      img {
        margin-right: 10px;
      }
    }
  }
  .title {
    display: flex;
    justify-self: start;
    width: 388px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .left {
      font-family: LilitaOne;
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 0em;
      margin-right: 27px;
      margin-left: 40px;
    }
    .right {
      font-family: LilitaOne;
      font-size: 13px;
      font-weight: 400;
    }
  }
  .information {
    height: 284px;
    margin-top: 22px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    padding-top: 18px;
    padding-right: 30px;
    padding-left: 60px;
    .list-item {
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0em;
      margin-bottom: 38px;

      .left {
        display: flex;
        justify-self: start;
        align-items: center;
        .wait {
          margin-left: 15px;
        }
        .point {
          margin-right: 8px;
          display: inline-flex;
          div {
            background-color: #fff;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 4px;
          }
        }
        .tokens {
          margin-left: 15px;
        }
        .activeY {
          color: #ffaa08;
        }
        .activeY {
          div {
            background-color: #ffaa08;
          }
        }
        .activeB {
          color: #8cc8ff;
        }
        .activeB {
          div {
            background-color: #8cc8ff;
          }
        }
        .flash {
          font-size: 0;
          // color: #ffaa08;
        }
        .flash > div {
          display: inline-block;
          float: none;
          // background-color: #ffaa08;
          border: 0 solid currentColor;
        }

        .flash {
          width: 54px;
        }
        .flash > div:nth-child(1) {
          animation-delay: -200ms;
        }

        .flash > div:nth-child(2) {
          animation-delay: -100ms;
        }

        .flash > div:nth-child(3) {
          animation-delay: 0ms;
        }

        .flash > div {
          width: 10px;
          height: 10px;
          margin: 4px;
          border-radius: 100%;
          animation: ball-pulse 1s ease infinite;
        }
        @keyframes ball-pulse {
          0%,
          60%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          30% {
            opacity: 0.1;
            transform: scale(0.01);
          }
        }
      }
      .status {
        width: 100px;
        border-radius: 4px;
        text-align: center;
        color: #000;
        cursor: pointer;
      }
      .white {
        background-color: #fff;
      }
      .red {
        background-color: #ff4d00;
      }
      .green {
        background-color: #a3dc00;
      }
    }
    .list-item:nth-child(4) {
      margin-bottom: 0;
    }
  }
  .noInformation {
    line-height: 284px;
    text-align: center;
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0em;
  }
}
</style>

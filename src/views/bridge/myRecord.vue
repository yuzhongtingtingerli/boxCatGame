<template>
  <div class="myRecord">
    <div class="title">
      <span class="left">My Record</span>
      <span class="right" v-if="Address.getBTCaddress">{{
        getAddress(Address.getBTCaddress)
      }}</span>
    </div>
    <div v-if="myRecord?.length > 0" class="information">
      <div
        class="list-item"
        v-for="item in myRecord"
        :key="item.BridgeTokenSymbol"
      >
        <div class="left">
          <div :class="`sent ${item.BridgeWorkFlow == '1' ? 'active' : ''}`">
            Sent {{ getMoney(item.BridgeTokenBalance) }}
            {{ item.BridgeTokenSymbol }}
          </div>
          <div :class="`wait ${item.BridgeWorkFlow == '2' ? 'active' : ''}`">
            <span class="point"></span><span class="point"></span
            ><span class="point"></span> Wait The BTC Network Confirm
          </div>
          <div :class="`tokens ${item.BridgeWorkFlow == '3' ? 'active' : ''}`">
            <span class="point"></span><span class="point"></span
            ><span class="point"></span>Bitparty Smactcontract Sent Your ERC20
            Tokens
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
    <a-pagination
      v-if="myRecord?.length > 0"
      v-model:current="current"
      :pageSize="4"
      :total="total"
      size="small"
      @change="handleChange"
    />
  </div>
  <bitpartyAddress ref="bitpartyAddressRef" />
</template>

<script setup>
import { ref, watch } from "vue";
import { getMoney, getAddress } from "@/utils/Tools.js";
import { getBridgeListData } from "@/services/index";

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
const getBridgeList = async () => {
  const res = await getBridgeListData({
    BridgeType: 1,
    UserAddress: Address.getBTCaddress,
    Offset: current.value,
    Limit: 4,
  });
  myRecord.value = res.result.BridgeInfo;
  total.value = res.result.TotalListNumber;
};

const bitpartyAddressRef = ref(null);
const handleStatus = (item) => {
  if (item.BridgeTokenStatus === "Go Stake") {
    bitpartyAddressRef.value.open();
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
  Address.getBTCaddress,
  (newVal, oldVal) => {
    getBridgeList();
  },
  { immediate: true }
);
</script>

<style>
.myRecord .ant-pagination.ant-pagination-mini {
  margin-top: 16px;
}
</style>
<style scoped lang="scss">
.myRecord {
  margin-top: 32px;
  .title {
    width: 332px;
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
    }
    .right {
      font-family: LilitaOne;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0em;
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

        .wait {
          margin-left: 15px;
        }
        .point {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 4px;
          background-color: #fff;
          margin-right: 8px;
        }
        .tokens {
          margin-left: 15px;
        }
        .active {
          color: #ffaa08;
          .point {
            background-color: #ffaa08;
          }
        }
      }
      .status {
        width: 100px;
        border-radius: 4px;
        text-align: center;
        color: #000;
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

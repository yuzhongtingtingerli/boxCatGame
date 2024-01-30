<template>
  <div class="myRecord">
    <div class="title">
      <span class="left">My Record</span>
      <span class="right">0x98......9876</span>
    </div>
    <div v-if="myRecord.length > 0" class="information">
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
        <div :class="`status ${getStatusColor(item.BridgeTokenStatus)}`">
          {{ item.BridgeTokenStatus }}
        </div>
      </div>
    </div>
    <div v-else class="information noInformation">No Information</div>
    <a-pagination v-if="myRecord.length > 0" :total="50" size="small" />
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getMoney } from "@/utils/Tools.js";
/**
 * 仓库
 */
const store = useStore();
/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
const myRecord = [
  {
    BridgeTokenSymbol: "ordi",
    BridgeTokenBalance: "1000",
    BridgeWorkFlow: "2",
    BridgeTokenStatus: "pending",
    BridgeTomeTime: "2024-01-28 16:01:02",
  },
  {
    BridgeTokenSymbol: "sats",
    BridgeTokenBalance: "100000",
    BridgeWorkFlow: "3",
    BridgeTokenStatus: "Failed",
    BridgeTomeTime: "2024-01-28 16:01:03",
  },
  {
    BridgeTokenSymbol: "rats",
    BridgeTokenBalance: "100000",
    BridgeWorkFlow: "3",
    BridgeTokenStatus: "Go Stake",
    BridgeTomeTime: "2024-01-28 16:01:02",
  },
  {
    BridgeTokenSymbol: "abc",
    BridgeTokenBalance: "100000",
    BridgeWorkFlow: "1",
    BridgeTokenStatus: "pending",
    BridgeTomeTime: "2024-01-28 16:01:02",
  },
];
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
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
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

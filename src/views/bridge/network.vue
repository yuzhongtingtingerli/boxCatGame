<template>
  <div class="network">
    <div class="BTCWallet">
      <div class="btn">Connect BTC Wallet</div>
      <div class="title">BRC20 NETWORK</div>
      <div class="tips">
        You Should Do Something First<InfoCircleOutlined
          style="font-size: 12px; margin-left: 10px"
        />
        <div class="tip">You Should Do Something First</div>
      </div>
      <div class="content">
        <div class="brc20 change"></div>
        <div class="amount change"></div>
      </div>
      <div class="transfer" v-if="handover === 'BTC'">Transfer</div>
    </div>
    <div class="handover">
      <div class="left">
        <img
          v-show="handover === 'ETH'"
          @click="changeWallet('BTC')"
          src="@/assets/bridge_l_g.png"
          alt=""
          srcset=""
        />
        <img
          v-show="handover === 'BTC'"
          src="@/assets/bridge_l.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="right">
        <img
          v-show="handover === 'ETH'"
          src="@/assets/bridge_r.png"
          alt=""
          srcset=""
        />
        <img
          v-show="handover === 'BTC'"
          @click="changeWallet('ETH')"
          src="@/assets/bridge_r_g.png"
          alt=""
          srcset=""
        />
      </div>
      <!-- <div
        class="left_g"
        v-show="handover === 'ETH'"
        @click="changeWallet('BTC')"
      ></div>
      <div
        class="left"
        v-show="handover === 'BTC'"
        @click="changeWallet('ETH')"
      ></div>
      <div
        class="right"
        v-show="handover === 'ETH'"
        @click="changeWallet('BTC')"
      ></div>
      <div
        class="right_g"
        v-show="handover === 'BTC'"
        @click="changeWallet('ETH')"
      ></div> -->
    </div>
    <div class="ETHWallet">
      <div class="btn">Connect ETH Wallet</div>
      <div class="title">ERC20 NETWORK</div>
      <div class="tips">
        You Should Do Something First<InfoCircleOutlined
          style="font-size: 12px; margin-left: 10px"
        />
        <div class="tip">You Should Do Something First</div>
      </div>
      <div class="content">
        <div class="brc20 change"></div>
        <div class="amount change"></div>
        <div class="totalFee change"></div>
        <div class="address">
          Ordi eth contract address: 0x98......9876
          <img src="@/assets/Magnifying.png" alt="" />
        </div>
      </div>
      <div class="transfer" v-if="handover === 'ETH'">Transfer</div>
    </div>
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
import { InfoCircleOutlined } from "@ant-design/icons-vue";
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
const handover = ref("ETH");
const changeWallet = (val) => {
  handover.value = val;
};
const data = reactive({});
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
<style scoped lang="scss">
.network {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  position: relative;
  .btn {
    width: 270px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-family: LilitaOne;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0em;
    color: #000;
    border-radius: 8px;
  }
  .title {
    margin-top: 16px;
    font-family: LilitaOne;
    font-size: 36px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }
  .tips {
    font-family: LilitaOne;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #f6cb37;
    margin-top: 20px;
    position: relative;
    .tip {
      position: absolute;
      background-image: url("@/assets/rectangle.png");
      width: 290px;
      height: 75px;
      top: 16px;
      left: -80px;
      line-height: 85px;
      text-align: center;
      font-family: Inter;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0em;
      color: #fff;
      display: none;
    }
    &:hover .tip {
      display: block;
    }
  }
  .content {
    margin-top: 33px;
    .change {
      width: 100%;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      margin-top: 16px;
      border-radius: 4px;
    }
    .address {
      font-family: LilitaOne;
      font-size: 13px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: right;
      margin-bottom: 30px;
      text-decoration: underline;
      margin-top: 12px;
    }
  }
  .transfer {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #f6cb37;
    color: #000;
    font-family: LilitaOne;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0em;
    border-radius: 8px;
    margin-top: 30px;
  }
  .BTCWallet {
    width: 520px;
    padding: 28px 40px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .btn {
      background-color: #f6cb37;
    }
  }

  .handover {
    width: 40px;
    position: absolute;
    top: 168px;
    left: 50%;
    transform: translateX(-50%);
    .left {
      width: 40px;
      height: 12px;
      //   background-image: url("@/assets/bridge_l.png");
      margin-bottom: 10px;
      cursor: pointer;
    }
    .left_g {
      width: 40px;
      height: 12px;
      background-image: url("@/assets/bridge_l_g.png");
      margin-bottom: 10px;
    }
    .right {
      width: 40px;
      height: 12px;
      cursor: pointer;
      //   background-image: url("@/assets/bridge_r.png");
    }
    .right_g {
      width: 40px;
      height: 12px;
      background-image: url("@/assets/bridge_r_g.png");
    }
  }
  .ETHWallet {
    width: 520px;
    padding: 28px 40px;
    background: linear-gradient(
      135deg,
      rgba(131, 196, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    .btn {
      background-color: #bfe1ff;
    }
  }
}
</style>

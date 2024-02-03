<template>
  <div class="YourBrc20">
    <Title title="Your Brc20" />
    <div class="list">
      <div class="list-item" v-for="item in YourBrc" :key="item.ticker">
        <div class="left">
          <div class="img">
            <img
              v-if="TokenLogo && getLogo(item.ticker)"
              width="20px"
              :src="getLogo(item.ticker)"
              alt=""
              srcset=""
            />
            <div class="logo" v-else>{{ getFirstLetter(item.ticker) }}</div>
          </div>
          <div class="name">{{ item.ticker }}</div>
        </div>
        <div class="score">{{ getMoney(item.overallBalance) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";
import { getTokenLogoData } from "@/services/index.js";
import { getBrc20SummaryData } from "@/services/wallet.js";

import { useAddressStore } from "@/store/address";

const Address = useAddressStore();

const YourBrc = ref(null);

const getBrcSummary = async () => {
  if (!Address.getBTCaddress) return;
  const data = await getBrc20SummaryData(Address.getBTCaddress);
  YourBrc.value = data.data.detail;
};

const TokenLogo = ref(null);
const getTokenLogo = async () => {
  const data = await getTokenLogoData();
  TokenLogo.value = data.result;
};
const getLogo = (ticker) => {
  if (ticker in TokenLogo.value && TokenLogo.value[ticker] !== "null")
    return TokenLogo.value[ticker];
  return false;
};
const getFirstLetter = (ticker) => {
  return ticker.split("")[0];
};
watch(
  Address.getBTCaddress,
  () => {
    if (Address.getBTCaddress) {
      getBrcSummary();
    }
  },
  { immediate: true }
);
onMounted(() => {
  getTokenLogo();
});
</script>
<style scoped lang="scss">
.list {
  height: 106px;
  padding-top: 16px;
  padding-right: 7px;
  overflow-y: scroll;
  margin-bottom: 10px;
  .list-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    .left {
      display: flex;
      justify-self: start;
      font-size: 13px;
      font-family: LilitaOne;
      font-weight: 400;
      .img {
        width: 20px;
        margin-right: 6px;
        img {
          display: inline-block;
          vertical-align: middle;
        }
        .logo {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background-color: #000;
          color: #fff;
          line-height: 18px;
          text-align: center;
        }
      }
    }
    .score {
      font-family: Inter;
      font-size: 10px;
      font-weight: 700;
    }
  }
}
</style>

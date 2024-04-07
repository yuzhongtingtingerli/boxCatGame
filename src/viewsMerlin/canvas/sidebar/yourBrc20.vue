<template>
  <div>
    <div class="YourBrc20">
      <div class="top">
        <Title title="Your Merlin Assets" />
        <div class="books" @click="getRedBook">
          <img
            src="@/assets/available-books.png"
            width="28px"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="token">
        <div class="title">token <span></span></div>
        <div class="add" @click="handleAdd">+ Add token</div>
      </div>
      <div class="list-empty" v-if="YourBrc.length === 0">
        <img src="@/assets/empty1.png" width="60px" />
        <span>Empty</span>
      </div>
      <div class="list" v-else>
        <div class="list-item" v-for="item in YourBrc" :key="item.ticker">
          <div class="left">
            <div class="img">
              <img
                v-if="TokenLogo && getLogo(encodeURIComponent(item.ticker))"
                width="20px"
                :src="getLogo(encodeURIComponent(item.ticker))"
                alt=""
                srcset=""
              />
              <div class="logo" v-else>{{ getFirstLetter(item.ticker) }}</div>
            </div>
            <div class="name">{{ decodeURIComponent(item.ticker) }}</div>
          </div>
          <div class="score">{{ getMoney(item.overallBalance) }}</div>
        </div>
      </div>
    </div>
    <CheckBook ref="checkBookRef" @change="changeGroup" />
    <SelectGroup ref="selectGroupRef" @change="isSuccess" />
    <IsNftSuccess ref="isNftSuccessRef" />
    <AddToken ref="addTokenRef" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Title from "@cps/title";
import { getMoney } from "@/utils/Tools.js";
import { getTokenLogoData } from "@/services/index.js";
import { getBrc20SummaryData } from "@/services/wallet.js";
import CheckBook from "./checkBook.vue";
import SelectGroup from "./selectGroup.vue";
import IsNftSuccess from "./isNftSuccess.vue";
import AddToken from "./addToken.vue";
import { useAddressStore } from "@/store/address";

const Address = useAddressStore();

const YourBrc = ref([]);

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

const checkBookRef = ref(null);
const getRedBook = () => {
  checkBookRef.value.open();
};
const selectGroupRef = ref(null);
const changeGroup = (inscriptionID) => {
  selectGroupRef.value.open(inscriptionID, Address.getBTCaddress);
};
const isNftSuccessRef = ref(null);
const isSuccess = (flag, tiker) => {
  isNftSuccessRef.value.open(flag, tiker);
};

const addTokenRef = ref(null);
const handleAdd = () => {
  addTokenRef.value.open();
};

watch(
  Address,
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
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .books {
    width: 44px;
    height: 34px;
    padding: 3px 8px 3px 8px;
    gap: 2px;
    border-radius: 2px 0px 0px 0px;
    opacity: 0px;
    border: 1px solid #000000;
    box-shadow: 2px 2px 0px 0px #000000;
    cursor: pointer;
  }
}
.token {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 22px;
  margin-top: 10px;
  .title {
    font-size: 13px;
    font-weight: 900;
    position: relative;
    span {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 17px;
      height: 4px;
      border-radius: 2px;
      background-color: #000000;
    }
  }
  .add {
    font-size: 13px;
    font-weight: 900;
    color: #b06ce5;
    cursor: pointer;
  }
}
.list-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: LilitaOne;
  font-size: 15px;
  color: rgba(181, 181, 181, 0.5);
  padding: 48px 0;
}
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

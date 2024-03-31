<template>
  <div :class="`bjs ${currentRoute === '/rank' ? 'yellow ' : 'black '}`">
    <div class="header">
      <div class="left">
        <div class="title">
          <img
            v-if="currentRoute === '/rank'"
            src="@/assets/Union1.png"
            style="margin-right: 12px"
            width="42"
          />
          <img
            v-else
            src="@/assets/Union.png"
            style="margin-right: 12px"
            width="42"
          />
          <router-link to="/">BIT PARTY</router-link>
          <span class="handover" @click="handoverMain">on merlin</span>
          <div class="isShowHandover" v-if="isShowHandover">
            <div class="btc-eth" @click="setPartyType('btc-eth')">
              party on BTC-ETH
            </div>
            <div class="merlin" @click="setPartyType('merlin')">
              party on Merlin
            </div>
          </div>
        </div>

        <div class="menu">
          <router-link :class="getCurrentRoute('/map')" to="/map"
            >Map</router-link
          >
          <router-link :class="getCurrentRoute('/rank')" to="/rank"
            >Rank</router-link
          >
          <router-link :class="getCurrentRoute('/bridge')" to="/bridge"
            >Bridge</router-link
          >
          <router-link :class="getCurrentRoute('/stake')" to="/stake"
            >Stake</router-link
          >
          {{ partyStore.getPartyType }}
          <a href="https://docs.bitparty.tech" target="_blank">Whitepaper</a>
          <!-- <router-link to="/empty">Safe And Privacy</router-link> -->
        </div>
      </div>
      <div class="right">
        <div
          class="icon"
          v-if="
            currentRoute != '/bridge' &&
            currentRoute != '/stake' &&
            currentRoute != '/rank'
          "
        >
          <a href="https://discord.gg/xyN9KUXpp5" target="_blank">
            <img
              v-if="currentRoute === '/rank'"
              src="@/assets/head_dog-black.png"
              alt=""
              srcset=""
            />
            <img v-else src="@/assets/head_dog.png" alt="" srcset="" />
          </a>
          <a href="https://t.me/bitparty_games" target="_blank">
            <img
              v-if="currentRoute === '/rank'"
              src="@/assets/head-f-black.png"
              alt=""
              srcset=""
            />
            <img v-else src="@/assets/head-f.png" alt="" srcset="" />
          </a>
          <a href="https://twitter.com/BitPartyTech" target="_blank">
            <img
              v-if="currentRoute === '/rank'"
              src="@/assets/head_t-black.png"
              alt=""
              srcset=""
            />
            <img v-else src="@/assets/head_t.png" alt="" srcset="" />
          </a>
        </div>
        <div
          :class="`Wallet ${currentRoute === '/rank' ? 'white' : ''}`"
          @click="connectWallet"
          v-if="currentRoute != '/bridge' && currentRoute != '/stake'"
        >
          <img
            v-if="Address.getBTCaddress"
            src="@/assets/uniset-logo.png"
            width="32px"
            alt=""
            srcset=""
          />
          {{
            !Address.getBTCaddress
              ? "Connect BTC Wallet"
              : getAddress(Address.getBTCaddress)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAddressStore } from "@/store/address";
import { usePartyStore } from "@/store/partyStore";
import { useRouter } from "vue-router";
import { getAddress } from "@/utils/Tools";
const router = useRouter();
const Address = useAddressStore();
const partyStore = usePartyStore();
const setPartyType = (type) => {
  partyStore.setPartyType(type);
};

let currentRoute = computed(() => router.currentRoute.value.path);
const getCurrentRoute = (path) => {
  if (currentRoute.value === path) return "active";
  return "";
};
const connectWallet = async () => {
  // 没有钱包就跳转
  Address.linkWallet();
};
const isShowHandover = ref(false);
const handoverMain = async () => {
  isShowHandover.value = !isShowHandover.value;
};
onMounted(() => {
  Address.getBTCWallet();
});
</script>
<style scoped lang="scss">
.yellow {
  background-color: #fccd37;
  color: #000;
  .menu {
    a {
      font-family: LilitaOne;
      font-size: 16px;
      margin-right: 38.6px;
      color: #000;
    }
    .active {
      color: #fff;
      text-shadow: 0 1px #000, 1px 0 #000, -1px 0 #000, 0 -1px #000;
    }
  }
  .title {
    a {
      color: #000;
    }
  }
}
.black {
  background: #000;
  color: #fff;
  .menu {
    a {
      font-family: LilitaOne;
      font-size: 16px;
      margin-right: 38.6px;
      color: #fff;
    }
    .active {
      color: #fccd37;
    }
  }
  .title {
    a {
      color: #fff;
    }
  }
}
.bjs {
  height: 60px;
}
.header {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  width: 1440px;
  margin: 0 auto;
  .left {
    display: flex;
    justify-self: start;
    position: relative;
    .title {
      font-family: LuckiestGuy;
      font-size: 30px;
      width: 260px;
      text-align: center;
      margin-right: 30px;
      color: #000;
    }
    .handover {
      width: 50px;
      height: 21px;
      font-family: Urbanist;
      font-size: 10px;
      font-weight: 900;
      line-height: 21px;
      text-align: left;
      border: 1px solid #b06ce5;
      color: #b06ce5;
      margin-left: 10px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .isShowHandover {
      z-index: 1;
      position: absolute;
      width: 257px;
      height: 72px;
      color: #fff;
      text-transform: capitalize;
      font-family: LilitaOne;
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      background: linear-gradient(
        135deg,
        rgba(131, 196, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.2) 100%
      );
      div {
        height: 36px;
        line-height: 36px;
        width: 163px;
        margin: 0 auto;
        cursor: pointer;
      }
      .btc-eth {
        border-bottom: 2px solid #000;
      }
    }
  }

  .right {
    display: flex;
    justify-self: start;
    .icon {
      img {
        width: 20px;
        height: 20px;
        margin-right: 20px;
      }
    }
  }
  .Wallet {
    width: 180px;
    height: 40px;
    line-height: 40px;
    font-family: LilitaOne;
    font-size: 16px;
    text-align: center;
    background-color: #f6cb37;
    color: #000;
    border: 2px solid #000;
    border-radius: 4px;
    box-shadow: 2px 2px 0 #000;
    margin-top: 10px;
    cursor: pointer;
    img {
      width: 32px;
      height: 32px;
      margin-bottom: 7px;
    }
  }
  .white {
    background-color: #fff;
  }
}
</style>

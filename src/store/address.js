import { defineStore } from "pinia";
import Web3 from "web3";
export const useAddressStore = defineStore("address", {
  state: () => {
    return {
      BTCaddress: "",
      ETHaddress: "",
    };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    getBTCaddress: (state) =>
      state.BTCaddress || localStorage.getItem("BTCaddress") || "",
    getETHaddress: (state, actions) => state.ETHaddress || "",
  },
  actions: {
    async linkWallet() {
      // 已经连接了钱包
      if (this.getBTCaddress) {
        return true;
      }
      // 没有钱包就跳转
      if (!window.unisat) {
        window.open("https://unisat.io/");
        return;
      }
      // 链接钱包
      try {
        let unisat = window.unisat;
        const accounts = await unisat?.requestAccounts();
        console.log("connect success", accounts);
        this.BTCaddress = accounts[0];
        localStorage.setItem("BTCaddress", accounts[0]);
        this.subscribeProvider();
      } catch (error) {
        console.log(error, "error");
      }
    },

    async subscribeProvider() {
      // 监听切账号
      window.unisat?.on("accountsChanged", (accounts) => {
        console.log(accounts, "accountsChanged");
        this.BTCaddress = accounts[0] || "";
        localStorage.setItem("BTCaddress", accounts[0] || "");
      });
    },

    async linkETHWallet() {
      console.log("linkETHWallet");
      // 已经连接了钱包
      if (this.getETHaddress) {
        return true;
      }
      if (typeof window.ethereum !== "undefined") {
        const ethereum = await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const res = await web3.eth.getAccounts();
        if (res.length > 0) {
          this.ETHaddress = res[0];
        }
      }
    },

    async getETHWallet() {
      if (!window.ethereum) return;
      const web3 = new Web3(window.ethereum);
      const res = await web3.eth.getAccounts();
      if (res.length > 0) {
        this.ETHaddress = res[0];
      }
    },
  },
});

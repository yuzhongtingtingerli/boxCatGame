import { defineStore } from "pinia";
import Web3 from "web3";
export const useAddressStore = defineStore("address", {
  state: () => {
    return {
      BTCaddress: null,
      ETHaddress: null,
      BTCWalletType: null,
      ETHWalletType: null,
    };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    getBTCaddress: (state) => state.BTCaddress,
    getETHaddress: (state) => state.ETHaddress,
    getBTCWalletType(state) {
      if (state.BTCWalletType) return state.BTCWalletType;
      const BTCWalletType = window.localStorage.getItem("BTCWalletType");
      if (BTCWalletType) {
        return BTCWalletType;
      }
      return null;
    },
    getETHWalletType(state) {
      if (state.ETHWalletType) return state.ETHWalletType;

      const ETHWalletType = window.localStorage.getItem("ETHWalletType");
      if (ETHWalletType) {
        return ETHWalletType;
      }
      return null;
    },
  },
  actions: {
    async linkWallet() {
      // 没有钱包就跳转
      if (!window.unisat) {
        window.open("https://unisat.io/");
        return;
      }
      // 链接钱包
      try {
        let unisat = window.unisat;
        const accounts = await unisat?.requestAccounts();
        this.BTCaddress = accounts[0];
        window.localStorage.setItem("BTClinkWallet", true);
        this.subscribeProvider();
      } catch (error) {
        console.log(error, "error");
      }
    },

    async subscribeProvider() {
      // 监听切账号
      window.unisat?.on("accountsChanged", (accounts) => {
        this.BTCaddress = accounts[0] || "";
      });
    },

    async linkETHWallet() {
      // // 已经连接了钱包
      // if (this.getETHaddress) {
      //   return true;
      // }
      if (typeof window.ethereum !== "undefined") {
        const ethereum = await window.ethereum.enable();
        console.log(ethereum, "ethereum");
        const web3 = new Web3(window.ethereum);
        console.log(web3, "web3");
        const res = await web3.eth.getAccounts();
        if (res.length > 0) {
          this.ETHaddress = res[0];
          window.localStorage.setItem("ETHlinkWallet", true);
        }
        // 监听地址变化事件
        web3.currentProvider.on("accountsChanged", (accounts) => {
          // 处理地址变化事件
          this.ETHaddress = accounts[0] || "";
          this.ETHaddress && window.localStorage.setItem("ETHlinkWallet", true);
        });

        this.checkNetId();
      }
    },
    async checkNetId() {
      if (!this.ETHaddress) return;
      // await window.ethereum.request({
      //   method: "wallet_switchEthereumChain",
      //   params: [
      //     {
      //       chainId: "0x1", // 目标链ID
      //     },
      //   ],
      // });
      // return;
      try {
        if (
          window.location.origin.indexOf("bitparty.tech") !== -1 ||
          window.location.origin.indexOf("18.136.19.168") !== -1
        ) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x1", // 目标链ID
              },
            ],
          });
        } else {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x13882", // 目标链ID
              },
            ],
          });
        }

        console.log("wallet_switchEthereumChain");
      } catch (e) {
        console.log("(e as any).code", e.code);
        if (e.code === 4902) {
          try {
            console.log("wallet_addEthereumChain");
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13882", // 目标链ID
                  chainName: "Amoy",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc-amoy.polygon.technology"],
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (ee) {
            //
          }
        } else if (e.code === 4001) return;
      }
    },
    async getETHWallet() {
      if (!window.ethereum) return;
      const isLink = window.localStorage.getItem("ETHlinkWallet");
      if (isLink === "false") return;
      const ETHWalletType = window.localStorage.getItem("ETHWalletType");
      if (ETHWalletType) {
        if (ETHWalletType === "eth") {
          const web3 = new Web3(window.ethereum);
          const res = await web3.eth.getAccounts();
          if (res.length > 0) {
            this.ETHaddress = res[0] || "";
            this.ETHaddress &&
              window.localStorage.setItem("ETHlinkWallet", true);
          }
          // 监听地址变化事件;
          web3.currentProvider.on("accountsChanged", (accounts) => {
            // 处理地址变化事件
            this.ETHaddress = accounts[0] || "";
            if (accounts.length === 0) {
              this.clearETHWallet();
            }
          });
        } else {
          this.linkIPwallet();
        }

        this.checkNetId();
      }
    },
    async getBTCWallet() {
      const isLink = window.localStorage.getItem("BTClinkWallet");
      if (isLink === "false") return;
      console.log(isLink, "isLink-----");
      this.selectBTC();
    },
    async clearBTCWallet() {
      this.BTCaddress = "";
      window.localStorage.setItem("BTClinkWallet", false);
      window.localStorage.setItem("BTCWalletType", "");
      this.BTCWalletType = null;
    },
    async clearETHWallet() {
      this.ETHaddress = "";
      window.localStorage.setItem("ETHlinkWallet", false);
      window.localStorage.setItem("ETHWalletType", "");
      this.ETHWalletType = null;
    },
    async linkOkxwallet() {
      if (typeof window.okxwallet !== "undefined") {
        const result = await okxwallet.bitcoin.connect();
        console.log(result, "result");
        let res = await okxwallet.bitcoin.getAccounts();
        if (res.length === 0) return false;
        this.BTCaddress = res[0];
        window.localStorage.setItem("BTClinkWallet", true);
        this.subscribeOkxProvider();
        return true;
      }
    },
    async subscribeOkxProvider() {
      // 监听切账号
      window.okxwallet.bitcoin.on("accountChanged", (addressInfo) => {
        if (addressInfo) {
          console.log(addressInfo, "addressInfo");
          this.BTCaddress = addressInfo.address;
        } else {
          this.BTCaddress = "";
          this.clearBTCWallet();
        }
      });
    },
    async linkIPwallet() {
      if (typeof window.okxwallet !== "undefined") {
        const r = await okxwallet.request({ method: "eth_requestAccounts" });
        if (r.length > 0) {
          this.ETHaddress = r[0];
          this.ETHaddress && window.localStorage.setItem("ETHlinkWallet", true);
        } else {
          return false;
        }
        this.getOkxEthProvider();
        return true;
      }
    },
    async getOkxEthProvider() {
      // 监听切账号
      okxwallet?.on("accountsChanged", (accounts) => {
        const ETHWalletType = window.localStorage.getItem("ETHWalletType");
        if (ETHWalletType === "ip") {
          this.ETHaddress = accounts[0] || "";
          this.ETHaddress && window.localStorage.setItem("ETHlinkWallet", true);
          if (accounts.length === 0) {
            this.clearETHWallet();
          }
        }
      });
    },
    async selectBTC() {
      const BTCWalletType = window.localStorage.getItem("BTCWalletType");
      if (BTCWalletType === "unisat") {
        this.linkWallet();
        this.BTCWalletType = "unisat";
      } else if (BTCWalletType === "okx") {
        const flag = await this.linkOkxwallet();
        this.BTCWalletType = "okx";
        return flag;
      }
    },
    async selectETH() {
      const ETHWalletType = window.localStorage.getItem("ETHWalletType");
      if (ETHWalletType === "eth") {
        this.linkETHWallet();
        this.ETHWalletType = "eth";
      } else if (ETHWalletType === "ip") {
        const flag = await this.linkIPwallet();
        this.ETHWalletType = "ip";
        return flag;
      }
    },
  },
});

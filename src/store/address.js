import { defineStore } from "pinia";
import Web3 from "web3";
export const useAddressStore = defineStore("address", {
  state: () => {
    return {
      BTCaddress: null,
      ETHaddress: null,
    };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    getBTCaddress: (state) => state.BTCaddress,
    getETHaddress: (state) => state.ETHaddress,
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
        this.BTCaddress = accounts[0];
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
        // 监听地址变化事件
        web3.currentProvider.on("accountsChanged", (accounts) => {
          // 处理地址变化事件
          this.ETHaddress = accounts[0] || "";
          console.log("Address changed:", accounts);
        });

        this.checkNetId();
      }
    },
    async checkNetId() {
      if (!this.ETHaddress) return;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x13881", // 目标链ID
            },
          ],
        });
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
                  chainId: "0x13881", // 目标链ID
                  chainName: "Mumbai",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.ankr.com/polygon_mumbai "],
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
      console.log(788888, "networkId");

      const web3 = new Web3(window.ethereum);
      const res = await web3.eth.getAccounts();
      if (res.length > 0) {
        this.ETHaddress = res[0] || "";
      }
      // 监听地址变化事件
      web3.currentProvider.on("accountsChanged", (accounts) => {
        // 处理地址变化事件
        this.ETHaddress = accounts[0] || "";
      });
      this.checkNetId();
    },
    async getBTCWallet() {
      let res = await window?.unisat.getAccounts();
      this.BTCaddress = res[0] || "";
      this.subscribeProvider();
    },
  },
});

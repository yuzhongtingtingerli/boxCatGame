import { defineStore } from "pinia";
export const usePartyStore = defineStore("partyStore", {
  state: () => {
    return {
      partyType: "",
    };
  },
  actions: {
    setPartyType(type) {
      this.partyType = type;
      sessionStorage.setItem("partyType", type);
      window.location.reload();
    },
  },
  getters: {
    getPartyType: (state) => {
      if (!state.partyType) {
        const partyType = sessionStorage.getItem("partyType");
        if (partyType) {
          state.partyType = partyType;
          sessionStorage.setItem("partyType", partyType);
          return partyType;
        }
        return "btc-eth";
      }
      return state.partyType;
    },
  },
});

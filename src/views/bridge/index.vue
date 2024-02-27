<template>
  <div class="bridge">
    <div class="w1140">
      <Guidelines />
      <div>
        <Network />
        <MyRecord />
      </div>
    </div>
  </div>
</template>

<script setup>
import Guidelines from "./guidelines.vue";
import Network from "./network.vue";
import MyRecord from "./myRecord.vue";

import { expect } from "chai";
import { AddressType } from "@unisat/wallet-sdk";
import { ErrorCodes } from "@unisat/wallet-sdk/es/error";
import { NetworkType } from "@unisat/wallet-sdk/es/network";
import { LocalWallet } from "@unisat/wallet-sdk/es/wallet";
import { onMounted } from "vue";
console.log(ErrorCodes);
onMounted(() => {
  const testAddressTypes = [
    AddressType.P2TR,
    AddressType.P2SH_P2WPKH,
    AddressType.P2PKH,
    AddressType.P2SH_P2WPKH,
    AddressType.M44_P2TR, // deprecated
    AddressType.M44_P2WPKH, // deprecated
  ];
  testAddressTypes.forEach(async (addressType) => {
    const fromBtcWallet = LocalWallet.fromRandom(
      addressType,
      NetworkType.MAINNET
    );

    const fromAssetWallet = LocalWallet.fromRandom(
      addressType,
      NetworkType.MAINNET
    );

    const toWallet = LocalWallet.fromRandom(addressType, NetworkType.MAINNET);

    const ret = await dummySendInscriptions({
      toAddress: toWallet.address,
      assetWallet: fromAssetWallet,
      assetUtxos: [
        genDummyUtxo(fromAssetWallet, 10000, {
          inscriptions: [{ inscriptionId: "001", offset: 1000 }],
        }),
      ],
      btcWallet: fromBtcWallet,
      btcUtxos: [genDummyUtxo(fromBtcWallet, 10000)],
      feeRate: 1,
    });
    console.log(ret);
  });
});
</script>
<style scoped lang="scss">
.bridge {
  min-width: 1440px;
  background-color: #000;
  height: 1340px;
  color: #fff;
  .w1140 {
    width: 1140px;
    margin: 0 auto;
  }
}
</style>

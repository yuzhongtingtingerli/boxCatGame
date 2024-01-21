<template>
  <div class="Sidebar">
    <YourBrc20 />
    <YourScore />
    <Joined />
    <Groups />
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
import YourBrc20 from "./yourBrc20.vue";
import YourScore from "./yourScore.vue";
import Joined from "./joined.vue";
import Groups from "./groups.vue";
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
.Sidebar {
  position: fixed;
  top: 65px;
  right: 0;
  width: 260px;
  height: 735px;
  background-color: #fff;
  border-radius: 7px 0px 0px 7px;
  box-shadow: 4px 4px 0px 0px #000000;
  border: 3px solid #000;
  padding: 16px 20px;
}
</style>

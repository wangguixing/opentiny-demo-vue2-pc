<!--
 * @Author: wangguixing
 * @Date: 2023-09-25 15:34:40
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 15:58:46
 * @FilePath: \src\App.vue
-->
<template>
  <div id="app"><componentsa></componentsa></div>
</template>

<script>
import componentsa from './components.vue';
export default {
  name: 'app',
  components: {
    componentsa,
  },
};
</script>
<style>
#app {
  height: 100%;
}
</style>

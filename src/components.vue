<!--
 * @Author: wangguixing
 * @Date: 2023-09-25 15:50:22
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 15:58:24
 * @FilePath: \src\components.vue
-->
<template>
  <div>
    <tiny-button>TinyVue</tiny-button>
    <tiny-alert description="TinyVue"></tiny-alert>
  </div>
</template>

<script>
import { Button, Alert } from '@opentiny/vue';

export default {
  components: {
    TinyButton: Button,
    TinyAlert: Alert,
  },
};
</script>

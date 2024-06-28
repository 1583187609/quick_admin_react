<!-- 表格特殊列 -->
<template>
  <UserInfo
    :data="row[col.prop as string]"
    v-bind="col.attrs"
    v-if="col.type === 'UserInfo'"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import UserInfo from "@/views/_components/UserInfo.vue";
import { BaseCrudColItemAttrs } from "@/components/table";
import { CommonObj } from "@/vite-env";
export type CustomSpecialColType = "UserInfo";
const props = withDefaults(
  defineProps<{
    col: BaseCrudColItemAttrs;
    row: CommonObj;
  }>(),
  {}
);
</script>
<style lang="scss" scoped></style>

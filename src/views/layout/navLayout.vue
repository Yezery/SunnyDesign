<template>
  <div class="fixed w-full z-10 select-none">
    <div class="min-w-[650px] h-28 flex items-center justify-start bg-white z-10">
      <Bars3Icon
        class="text-[#dc2626] h-full w-24 pl-10 float-left cursor-pointer"
        @click="openIntro"
      ></Bars3Icon>
      <div
        class="h-full min-w-[500px] text-[#dc2626] font-extrabold text-4xl center sunnyDesign-font"
      >
        Sunny Design（顺利）
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Bars3Icon } from '@heroicons/vue/20/solid'
const emit = defineEmits(['showNav'])
const openIntro = () => {
  emit('showNav')
}
</script>

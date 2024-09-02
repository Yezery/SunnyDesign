<template>
  <LogoIntro @isFinish="isFinish" :showNav="isShowNav" />
  <Transition>
    <div class="w-full" v-if="finish">
      <NavLayout @ShowNav="showNav" />
      <WorkList />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import LogoIntro from '@/components/logo/LogoIntro.vue'
import WorkList from '@/components/works/WorksList.vue'
import { ref } from 'vue'
import NavLayout from './layout/navLayout.vue'
const finish = ref(false)
const isFinish = (value: boolean) => {
  setTimeout(() => {
    finish.value = value
  }, 800)
}
const isShowNav = ref(false)
const showNav = () => {
  isShowNav.value = !isShowNav.value
}
</script>

<style scoped>
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
  transition: all 1.2s ease-in-out;
}
</style>

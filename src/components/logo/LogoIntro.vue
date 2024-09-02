<template>
  <transition>
    <div class="absolute z-20 w-full" v-if="!finish" @touchmove.prevent @mousewheel.prevent>
      <div class="absolute w-full h-28 block" v-if="showNav">
        <XMarkIcon
          class="text-[#dc2626] h-full w-32 float-left pl-10 center cursor-pointer"
          @click="closeIntro"
        ></XMarkIcon>
        <div class="grid grid-cols-1 pl-12 h-full md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(data, index) in navs"
            :key="index"
            class="h-full w-auto text-[#dc2626] font-extrabold text-nowrap center text-[70px] hover:underline ease-in-out cursor-pointer"
          >
            {{ data.name }}
            <!-- <span class="pl-8" v-if="index !== navs.length - 1">/</span> -->
          </div>
        </div>
      </div>
      <div :style="LogoBg" class="center flex-col h-screen w-full select-none">
        <div
          class="bg-[url(@/assets/svg/SUNLI.svg)] bg-no-repeat bg-center bg-contain h-screen w-[980px] center"
        >
          <div
            class="text-[#dc2626] font-[SunnyDesign-Regular] text-center text-[188px] w-fit text-wrap hidden lg:text-nowrap md:text-nowrap lg:block"
            ref="introTitle"
          >
            Sunny Design
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, reactive } from 'vue'
import Typed from 'typed.js'
import { XMarkIcon } from '@heroicons/vue/24/outline'
// import './logo.scss'
const props = defineProps({
  showNav: Boolean
})
watch(props, (value) => {
  if (value.showNav) {
    finish.value = false
  }
})
const closeIntro = () => {
  finish.value = true
}
const navs = [
  {
    id: 1,
    name: 'WORKS',
    to: ''
  },
  {
    id: 2,
    name: 'ABOUT',
    to: ''
  },
  {
    id: 3,
    name: 'CONTENT',
    to: ''
  }
]
const introTitle = ref(null)
const finish = ref(false)

const LogoBg = reactive({
  'background-color': 'black'
})

const emit = defineEmits(['isFinish'])

onMounted(() => {
  typeding()
})

const typeding = () => {
  new Typed(introTitle.value, {
    strings: ['Sunny ^250 Design'],
    typeSpeed: 95,
    cursorChar: '',
    onComplete: () => {
      finish.value = true
      emit('isFinish', finish.value)
      LogoBg['background-color'] = 'white'
    }
  })
}
</script>

<style scoped>
.v-leave-to {
  opacity: 0;
  transition: all 0.8s ease-in-out;
}
</style>

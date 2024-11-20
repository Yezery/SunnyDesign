<template>
    <div
      class="text-center font-['SunnyDesignRegular'] text-white bg-sky-100 h-screen overflow-hidden relative select-none "
    >
      <video
      ref="home_video"
        src="/video/home.mp4"
        autoplay
        muted
        loop
        playsinline
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        class="absolute object-cover left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full"
      ></video>
      <div class="all_center w-full h-full">
        <div class="w-full z-10 ">
          <h1
            id="sunny"
            class="text-[6rem] md:text-[14rem] tracking-tight md:translate-x-[-12rem] translate-x-[0rem] transition-all ease-in-out delay-300"
          ></h1>
          <h1
            id="design"
            class="text-[6rem] md:text-[14rem] tracking-tight md:translate-x-[4rem] translate-x-[0rem] md:translate-y-[-4rem] translate-y-[0] transition-all ease-in-out delay-300"
          ></h1>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import Typed from "typed.js";
let sunntTyped:Typed 
let designTyped:Typed 
const home_video = ref(null)
onMounted(() => {
  sunntTyped = new Typed("#sunny", {
    strings: ["^800Sunny"],
    typeSpeed: 95,
  });
  designTyped =new Typed("#design", {
    strings: ["^2000Design"],
    typeSpeed: 95,
  });

  (home_video.value as unknown as HTMLVideoElement).play()
  
});
</script>

<style>
</style>

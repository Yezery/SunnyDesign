<template>
  <div class="fixed left-12 top-12 cursor-pointer z-30 sm:left-24" @click="goHome">
    <NuxtImg
      id="logo"
      src="/image/shunliJG.svg"
      height="220"
      width="220"
      alt="顺利"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  endTarget:{
    required:true,
  }
})
const {endTarget} = toRefs<any>(props)
const { $gsap } = useNuxtApp();
onMounted(() => {
  $gsap
    .timeline({
      scrollTrigger: {
        trigger: "#logo",
        start: "top top",
        endTrigger: endTarget.value,
        end: "top top",
        scrub: true,
      },
    })
    .fromTo("#logo", { opacity: 1 }, { opacity: 0 });
});
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style></style>

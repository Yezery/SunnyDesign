<template>
  <div class="w-screen h-screen isolate">
      <slot />
      <TheNavbar />
  </div>
</template>

<script lang="ts" setup>
// const { $anime } = useNuxtApp();
// const { $gsap } = useNuxtApp();
// onMounted(() => {
//   $anime({ targets: ".title", translateX: 250, duration: 800 });
//   $gsap.to(".title", { rotation: 3, x: 100, duration: 1 });
// });
// const { data } = await useFetch("/api/test");
</script>

<style></style>

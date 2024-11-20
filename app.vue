<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLayout :name="layout">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useSeoMeta({
  title: '川フ冖ハノホリ',
  ogTitle: '中山顺利设计事务所',
  description: '中山顺利设计事务所',
  ogDescription: '中山顺利设计事务所',
  ogImage: '/image/meta_logo.png',
})
const layout = "custom";
// 是否首次加载
const isFullLoading = ref(true);
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 10000,
  throttle: 200,
  estimatedProgress: (duration, elapsed) =>
    (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50),
});
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", () => {
 
});

nuxtApp.hook("app:mounted", () => {
  isFullLoading.value = false;
  console.log(isLoading.value);
});


</script>

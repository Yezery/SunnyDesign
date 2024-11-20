<template>
  <div class="h-full w-full">
    <ScrollPhoto :title="title" :total="Number(total)" :theme-color="themeColor"></ScrollPhoto>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const title = ref()
const total = ref()
const themeColor = ref()
themeColor.value = route.query.themeColor
title.value = route.query.title 
total.value = route.query.total

</script>

<style>

</style>
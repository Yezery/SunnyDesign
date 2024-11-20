<template>
  <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full z-50"  @click.self="imageClose">
    <div class=" rounded-2xl overflow-hidden">
      <NuxtImg quality="100" densities="x1 x2" preload loading="lazy" :src="imageSource" sizes="75vw sm:80vw md:1000px"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props =defineProps({
  imageSource: {
    type: String,
    required: true
}}
)
const { imageSource } = toRefs(props)
const emit = defineEmits(['close'])
const imageClose = () => {
  emit('close', false)
}
</script>

<style>

</style>
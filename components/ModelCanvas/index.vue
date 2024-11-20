<template>
  <TresCanvas alpha preset="realistic" clearColor powerPreference="low-power">
    <TresPerspectiveCamera :position="position" />
    <OrbitControls />
    <Suspense>
      <GLTFModel :path="modelPath" draco />
    </Suspense>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1" />
    <TresDirectionalLight :position="[4, -8, 5]" :intensity="0.5" />
    <TresDirectionalLight :position="[4, -3, -8]" :intensity="1" />
  </TresCanvas>
</template>

<script lang="ts" setup>
interface Props {
  modelPath: string;
  position: any;
}

const {modelPath,position} = defineProps<Props>();
</script>

<template>
  <div class="bg-white select-none">
    <LogoBack :endTarget="'#container'"/>
    <div
      id="container"
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8"
    >
      <div
        class="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 xl:gap-x-8"
      >
        <div
          class=""
          v-for="(item, index) in modelPath"
          :key="index"
        >
          <div class="all_center">
            <div class="h-80 w-80 sm:h-96 sm:w-full overflow-hidden rounded-lg">
              <div v-if="ModelShow" class="h-full w-full">
                <ModelCanvas
                  :modelPath="item.modelPath"
                  :position="item.position"
                />
              </div>
            </div>
          </div>
          <div class="text-center">
            <NuxtLink
              :to="{
                name: 'PictureWall',
                query: {
                  title: item.englishName,
                  total: item.total,
                  themeColor: item.color,
                },
              }"
              :class="[' text-lg font-[KontrapunktBobBold] font-bold  hover:underline']"
            >
               {{ item.chineseName }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 页面加载完成后调用渲染
onMounted(async () => {
  initialize();
});
onUnmounted(() => {
  ModelShow.value = false;
});
const initialize = () => {
  nextTick().then(() => {
    ModelShow.value = true;
  });
};

const ModelShow = ref(false);
interface ModelPath {
  modelPath: string;
  position: any;
  chineseName: string;
  englishName: string;
  color: string;
  total: number;
}
const modelPath: ModelPath[] = [
  {
    modelPath: "/models/bakecoo.glb",
    position: [4, 3, 6],
    color: "text-[#FF9000]",
    chineseName: "BAKECOO",
    englishName: "Bakecoo",
    total: 32,
  },
  {
    modelPath: "/models/guanChao.glb",
    position: [6, 3, 7],
    chineseName: "觀巢",
    englishName: "GuanChao",
    color: "text-black",
    total: 14,
  },
];
</script>
<style scoped></style>

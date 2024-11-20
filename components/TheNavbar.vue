<template>
  <div
    ref="nav"
    class="text-center fixed bg-white overflow-hidden rounded-lg sm:left-10 left-3 bottom-6 z-50 transition duration-3000 ease-in-out"
  >
    <nav class="relative all_center w-full h-ful" aria-label="Tabs">
      <ul ref="nav_ul" class="all_center z-10">
        <li v-for="tab in tabs" :key="tab.name" class="inline-block">
          <NuxtLink
            ref="nav_item"
            :to="tab.href"
            @click="nav_click($event)"
            class="block p-3 h-full"
            ><div class="all_center w-16">
              <div
                :class="[
                  'uppercase text-xs  transition duration-1000 ease-in-out',
                  tab.active ? 'text-white' : 'text-black',
                ]"
                @mouseenter="handleMouseEnter"
              >
                {{ tab.name }}
              </div>
            </div></NuxtLink
          >
        </li>
      </ul>
      <div
        ref="move_bar"
        class="absolute top-0 block w-[87px] h-10 p-1 left-0 transition duration-700 ease-in-out"
      >
        <div
          class="w-full h-full bg-black rounded-lg transition duration-700 ease-in-out"
        />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useShuffleText } from "~/composables/useShuffleText";
const tabs = ref([
  { index: 1, name: "home", href: "/", current: 0, active: true },
  { index: 2, name: "Works", href: "/Works", current: 0, active: false },
  { index: 3, name: "Info", href: "/Info", current: 0, active: false },
  { index: 4, name: "Archive", href: "/Archive", current: 0, active: false },
]);
const { $anime } = useNuxtApp();
const nav_item = ref(null);
const move_bar = ref();
const nav_ul = ref(null);
const nav = ref(null);
const route = useRoute();
onMounted(() => {
  getTabSet();
});
watch(
  route,
  (n, o) => {
    const regex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/;
    if (route.query.themeColor) {
      const text = n.query.themeColor as string;
      const match = text.match(regex);
      if (move_bar.value.children){
        move_bar.value.children[0].style.backgroundColor = match
          ? match[0]
          : null;
      }else{
        move_bar.value.children[0].style.backgroundColor = "";
      }
    }
  },
  {
    immediate: true,
  }
);

const getTabSet = () => {
  const nav = nav_ul.value as any;
  for (let index = 0; index < nav.children.length; index++) {
    tabs.value[index].current = nav.children[index].offsetLeft;
  }
  refresh("");
};
const refresh = (target_name: string) => {
  setTimeout(() => {
    for (const tab of tabs.value) {
      if (route.path == tab.href || target_name == tab.name) {
        $anime({
          targets: move_bar.value,
          translateX: tab.current,
          duration: 300,
        });
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
    if (route.path == "/PictureWall") {
      $anime({
        targets: move_bar.value,
        translateX: tabs.value[3].current,
        duration: 300,
      });
      tabs.value[3].active = true;
      return;
    }
  }, 500);
};
const nav_click = (el: Event) => {
  const target = el.target as any;
  refresh(target.innerHTML);
};

const { shuffleText } = useShuffleText(300, 100); // 创建独立实例

// 鼠标移入时获取 innerHTML，并传递给 shuffleText 处理
const handleMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target && target.innerHTML) {
    for (const tab of tabs.value) {
      if (target.innerHTML == tab.name && tab.active) {
        return;
      }
    }
    const originalText = target.innerHTML; // 获取原始 innerHTML
    // 每个元素都有独立的 shuffleText 实例
    shuffleText(target, originalText); // 将 target 元素传入，并打乱原文字
  }
};
</script>

<style scoped></style>

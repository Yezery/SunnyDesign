<template>
  <div class="relative isolate overflow-hidden select-none">
    <LogoBack :end-target="''"/>
    <div class="px-6 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center mt-24">
        <div class="all_center">
          <NuxtImg
            class=""
            src="/image/info_logo.svg"
            height="420"
            width="420"
            alt="顺利"
          />
        </div>
      </div>
      <div class="overflow-hidden">
        <p
        class="mx-auto text-center mt-20 max-w-4xl text-pretty text-lg text-black font-[SunnyDesignRegular]"
        @click="handleMouseEnter"
      >
        {{ script_CN }}
      </p>
      <p
        class="mx-auto text-center mt-12 max-w-3xl text-pretty text-base text-black"
      >
        {{ script_EN }}
      </p>
      <div class="flex justify-center flex-col">
        <p
          class="mx-auto mt-14 max-w-2xl text-pretty text-sm text-black font-[KontrapunktBobBold]"
        >
          Designer
        </p>
        <p
          class="mx-auto mt-3 max-w-2xl text-pretty text-base text-black font-sans"
        >
          小李
        </p>
        <p
          class="mx-auto mt-16 max-w-2xl text-pretty text-sm text-black font-[KontrapunktBobBold]"
        >
          Tell / WeChat
        </p>
        <p
          class="mx-auto mt-3 max-w-2xl text-pretty text-base text-black font-sans"
        >
          18819260435
        </p>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const script_CN =
  "中山市顺利设计（ Sunny Design ）事务所，是一家新锐的多元化设计机构，我们擅长打造年轻前卫的视觉创意设计。持续关注品牌视觉设计、零售包装、空间设计、出版物、插图、交互多媒体产品等领域，为客户提供全方位的设计与传播解决方案。";
const script_EN =
  "Is a cutting edge diversified design agency, We are good at creating young and avant garde visua creative designs. Continue to focus on brand visual design, retail packaging, space design, publications, illustrations, interactive multimedia products and other fields, Provide customers with a full range of design and communication solutions";
import { useShuffleText } from "~/composables/useShuffleText";
const { shuffleText } = useShuffleText(1500, 100); // 创建独立实例

// 鼠标移入时获取 innerHTML，并传递给 shuffleText 处理
const handleMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target && target.innerHTML) {
    const originalText = target.innerHTML; // 获取原始 innerHTML
    // 每个元素都有独立的 shuffleText 实例
    shuffleText(target, originalText); // 将 target 元素传入，并打乱原文字
  }
};
</script>
<style></style>

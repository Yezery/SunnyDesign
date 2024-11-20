<template>
    <div id="content" class="relative isolate overflow-hidden select-none">
      <LogoBack :end-target="'#content'"/>
      <div class="relative h-screen all_center">
        <div class="mx-auto max-w-2xl text-center">
          <div class="all_center">
            <NuxtImg
              src="/image/info_logo.svg"
              height="900"
              width="900"
              alt="顺利"
            />
            <h1 class="mt-24 text-3xl">Works</h1>
          </div>
          <div
            class="text-1xl absolute bottom-8 left-1/2 -translate-x-1/2 uppercase font-thin"
          >
            scroll to view more
          </div>
        </div>
      </div>
      <div
        class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8"
      >
        <div class="mt-16 space-y-16">
          <div
            v-for="(feature, featureIdx) in features"
            :key="feature.name"
            class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
          >
            <div
              :class="[
                featureIdx % 2 === 0
                  ? 'lg:col-start-1'
                  : 'lg:col-start-8 xl:col-start-9',
                'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
              ]"
            >
              <h3 class="text-lg font-medium text-gray-900">
                {{ feature.name }}
              </h3>
              <p class="indent-8 leading-8 mt-2 text-base text-black">
                {{ feature.description }}
              </p>
            </div>
            <div
              :class="[
                featureIdx % 2 === 0
                  ? 'lg:col-start-6 xl:col-start-5'
                  : 'lg:col-start-1',
                'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
              ]"
            >
              <div class="overflow-hidden rounded-lg bg-gray-100">
                <NuxtImg
                  class="aspect-video object-cover object-center"
                  :src="feature.imageSrc"
                  :alt="feature.imageAlt"
                  format="webp"
                  quality="80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
const features = [
  {
    name: "焙可阿姨 ® 视觉系列",
    description:
      "焙可阿姨 是一个能传递幸福感的国民甜品烘焙品牌，我们的产品会说话，坚持 “用更好的原料，做幸福的味道” 的品牌核心理念，瞄准新一代年轻消费者推出甜品西点、小蛋糕、手工面包、干活点心、节日限定饮品等产品，以及提供下午茶企业定制、婚礼甜品台定制、企事业蛋糕定制等服务，希望伴随不断推进的城市化建设赋予甜品及甜品店新的内涵，其品牌的愿景是 “从佛山走向全国，开进中国的大街小巷” ",
    imageSrc: "/image/Bakecoo/annouce.jpg",
    imageAlt: "Bakecoo",
  },
  {
    name: "觀巢 ® 品牌包装系列",
    description:
      "觀巢 是一个专注于传递健康与美味的国民燕窝品牌，我们的产品讲求“纯净天然，滋养身心”，秉持“用更好的燕窝，炖出健康滋味”的品牌理念。觀巢精选优质燕窝，采用低温炖煮工艺，推出经典鲜炖、果味鲜炖、花茶燕窝等多种产品，满足新一代消费者对健康滋补的需求。品牌还提供节日礼盒定制、企业福利定制、私人滋补计划等服务，力求在快节奏的城市生活中，带给消费者一份纯粹的滋养体验。觀巢的愿景是“从广州走向全国，让每个人都能品味到燕窝的自然滋养”",
    imageSrc: "/image/GuanChao/annouce.jpg",
    imageAlt: "Guan Chao",
  },
];
</script>


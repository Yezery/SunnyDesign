<template>
  <div class="overflow-hidden">
    <div class="scrollBox">
      <div ref="container" class="photos z-20">
        <div v-for="l in layer" :key="l">
          <div class="photos_line">
            <div
              class="photos_line_photo"
              v-for="v in BakecooPictures.slice((l - 1) * 7, l * 7)"
              :key="v.url"
            >
              <div @click="scan_image_function(v.url)">
                <NuxtImg
                  quality="20"
                  class="w-full h-full"
                  loading="lazy"
                  :src="v.url"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="photos_line z-20">
        <div
          class="photos_line_photo"
          v-for="(v, i) in BakecooPictures.slice(13, 21)"
          :key="i"
        >
          <div @click="scan_image_function(v.url)">
            <NuxtImg quality="20" preload loading="lazy" :src="v.url" />
          </div>
        </div>
      </div>
      <div class="photos_line z-20">
        <div
          class="photos_line_photo"
          v-for="(v, i) in BakecooPictures.slice(21, 29)"
          :key="i"
        >
          <div @click="scan_image_function(v.url)">
            <NuxtImg quality="20" preload loading="lazy" :src="v.url" />
          </div>
        </div>
      </div> -->
      </div>
      <ImageScan
        class="bg-[#000000b3]"
        v-if="ImageScanShow"
        :image-source="scan_image"
        @close="close"
      ></ImageScan>
    </div>
    <div class="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
      <div class="flex justify-center items-center">
        <div id="title_box" :class="[' h-full text-center', themeColor]">
          <h1
            id="title"
            class="font-['KontrapunktBobBold'] text-[4rem] md:text-[10rem] tracking-tight transition-all ease-in-out delay-300"
          ></h1>
        </div>
      </div>
    </div>

    <NuxtImg
      src="/image/back.svg"
      width="100"
      height="100"
      :class="['fixed left-96 bottom-8 z-10']"
    />
  </div>
</template>

<script lang="ts" setup>
function findscroller(element:any) {
  element.onscroll = function () {
    console.log(element);
  };
  Array.from(element.children).forEach(findscroller);
}
import Typed from "typed.js";
const { $gsap } = useNuxtApp();
const scan_image = ref("");
const ImageScanShow = ref(false);
const { title, total, themeColor } = defineProps({
  title: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  themeColor: {
    type: String,
    required: true,
  },
});

const BakecooPictures = ref();
const scan_image_function = (url: string) => {
  scan_image.value = url;
  ImageScanShow.value = true;
};
const close = () => {
  ImageScanShow.value = false;
  scan_image.value = "";
};
interface ImgData {
  node: HTMLElement;
  x: number;
  y: number;
  mov_x: number;
  mov_y: number;
  ani: any;
}
const container = ref<HTMLElement | null>(null);
const photos = ref<HTMLElement[]>([]);
const state = reactive({
  img_data: [] as any,
  container_width: 0,
  container_height: 0,
  photo_width: 0,
  photo_height: 0,
  if_movable: false,
  mouse_x: 0,
  mouse_y: 0,
  standard_width: 1980 / 1.5,
  scale_nums: 1,
});

const resize = () => {
  if (!container.value) return;
  const imgs = Array.from(
    container.value.querySelectorAll<HTMLElement>(".photos_line_photo")
  );
  state.container_width = container.value.offsetWidth;
  state.container_height = container.value.offsetHeight;
  state.photo_width = imgs[0]?.offsetWidth || 0;
  state.photo_height = imgs[0]?.offsetHeight || 0;
  state.scale_nums = document.body.offsetWidth / state.standard_width;
  container.value.style.transform = `scale(${state.scale_nums})`;
  $gsap.to(imgs, {
    transform: `translate(0,0)`,
    duration: 0,
    ease: "power4.out",
  });
  state.img_data = imgs.map((img) => ({
    node: img as HTMLElement,
    x: img.offsetLeft,
    y: img.offsetTop,
    mov_x: 0,
    mov_y: 0,
    ani: null,
  }));
};

const move = (x: number, y: number) => {
  if (!state.if_movable) return;
  const distance_x = (x - state.mouse_x) / state.scale_nums;
  const distance_y = (y - state.mouse_y) / state.scale_nums;

  state.img_data.forEach((img: any) => {
    let duration = 1;
    img.mov_x += distance_x;
    if (img.x + img.mov_x > state.container_width) {
      img.mov_x -= state.container_width;
      duration = 0;
    }
    if (img.x + img.mov_x < -state.photo_width) {
      img.mov_x += state.container_width;
      duration = 0;
    }
    img.mov_y += distance_y;
    if (img.y + img.mov_y > state.container_height) {
      img.mov_y -= state.container_height;
      duration = 0;
    }
    if (img.y + img.mov_y < -state.photo_height) {
      img.mov_y += state.container_height;
      duration = 0;
    }
    if (img.ani) img.ani.kill();
    img.ani = $gsap.to(img.node, {
      transform: `translate(${img.mov_x}px,${img.mov_y}px)`,
      duration: duration,
      ease: "power4.out",
    });
  });

  state.mouse_x = x;
  state.mouse_y = y;
};

const onMouseDown = (event: MouseEvent) => {
  state.if_movable = true;
  state.mouse_x = event.clientX;
  state.mouse_y = event.clientY;
};
const onMouseUp = () => {
  state.if_movable = false;
};

const onMouseLeave = () => {
  state.if_movable = false;
};

const onMouseMove = (event: MouseEvent) => {
  move(event.clientX, event.clientY);
};

const onTouchStart = (event: TouchEvent) => {
  state.if_movable = true;
  state.mouse_x = event.touches[0].clientX;
  state.mouse_y = event.touches[0].clientY;
};

const onTouchMove = (event: TouchEvent) => {
  move(event.touches[0].clientX, event.touches[0].clientY);
};
const setPicture = (divisor: number) => {
  const targetCount = Math.floor(total / divisor) * divisor;

  const array = [];
  for (let index = 1; index <= targetCount; index++) {
    array.push({
      url: `/image/${title}/${index}.webp`,
    });
  }
  return array;
};
const layer = ref(0);

onMounted(() => {
  findscroller(document.body);
  layer.value = Math.ceil(total / 6); // 自动计算所需行数
  BakecooPictures.value = setPicture(7);
  if (!container.value) return;
  photos.value = Array.from(
    container.value.querySelectorAll<HTMLElement>(".photos_line_photo")
  );
  setTimeout(() => {
    resize();
    new Typed("#title", {
      strings: [title],
      typeSpeed: 95,
    });
  }, 300);
  window.addEventListener("resize", resize);
  container.value.addEventListener("mousedown", onMouseDown);
  container.value.addEventListener("touchstart", onTouchStart);
  container.value.addEventListener("mouseup", onMouseUp);
  container.value.addEventListener("mouseleave", onMouseLeave);
  container.value.addEventListener("mousemove", onMouseMove);
  container.value.addEventListener("touchmove", onTouchMove);
});
</script>
<style scoped>
img {
  pointer-events: none;
  user-select: none;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
#title_box {
  display: block !important;
}
.scrollBox {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: hidden;
}

.photos {
  position: absolute;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.photos_line {
  font-size: 1px;
  height: 232em;
  margin-bottom: 58em;
  flex-shrink: 0;
}

.photos_line_photo {
  font-size: 1px;
  width: 334em;
  height: 100%;
  margin-right: 58em;
  flex-shrink: 0;
}

.photos_line_photo img {
  height: 100%;
  width: 100%;
  border-radius: 8em;
  transition: 0.3s ease;
  object-fit: cover;
}

.photos_line_photo:hover img {
  transform: scale(1.1);
}

@media screen and (max-aspect-ratio: 1.5/1) {
  .photos_line,
  .photos_line_photo {
    font-size: 2px;
  }
}

@media screen and (max-aspect-ratio: 0.8/1) {
  .photos_line,
  .photos_line_photo {
    font-size: 2.8px;
  }
}
</style>

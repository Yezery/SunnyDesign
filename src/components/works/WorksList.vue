<template>
  <div class="waterfallContain">
    <div class="waterfall">
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="650.375" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p3.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="251.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="470" data-height="650.375" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p3.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="650.375" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p3.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
      <a href="" class="image" data-width="430" data-height="241.667" data-date="2023">
        <div class="imageInf"></div>
        <img src="/public/img/blank.gif" data-src="img/p2.png" alt="1" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './works.scss'
const autoTop = ref(80)
let timer: any = null

function calculElWidthOuter(el: HTMLDivElement) {
  const style = getComputedStyle(el)
  const marginRight = parseInt(style.marginRight)
  const marginLeft = parseInt(style.marginLeft)
  return el.offsetWidth + marginRight + marginLeft
}

function alignCenterValue(elements: NodeListOf<Element>, colCount: number) {
  let firstRowElWidth = 0
  for (let index = 0; index < colCount; index++) {
    const element = elements[index]
    const style = getComputedStyle(element)
    const marginRight = parseInt(style.marginRight)
    const marginLeft = parseInt(style.marginLeft)
    firstRowElWidth += element.clientWidth + marginRight + marginLeft
  }
  return (document.querySelector('.waterfall')!.clientWidth - firstRowElWidth) / 2
}

function checkColCount(elements: NodeListOf<Element>): number {
  let colCount = 0
  let totalWidth = 0
  const windowWidth = document.querySelector('.waterfall')!.clientWidth
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    const style = getComputedStyle(element)
    const marginRight = parseInt(style.marginRight)
    const marginLeft = parseInt(style.marginLeft)
    totalWidth += element.clientWidth + marginRight + marginLeft
    if (totalWidth > windowWidth) {
      break
    }
    colCount++
  }
  return colCount
}

function waterfallTs(selector: string) {
  const waterfallElements = document.querySelectorAll(selector)
  const imgWidth = calculElWidthOuter(document.querySelector(selector)!)
  const colCount = checkColCount(document.querySelectorAll(selector)!)
  const mainLeft = alignCenterValue(document.querySelectorAll(selector)!, colCount)
  const colHeightArray = new Array(colCount).fill(0)
  waterfallElements.forEach((el: any) => {
    const minTop = Math.min(...colHeightArray)
    const minIndex = colHeightArray.indexOf(Math.min(...colHeightArray))
    el.style.top = minTop + autoTop.value + 'px'
    el.style.left = minIndex * imgWidth + mainLeft + 'px'
    const elementStyle = getComputedStyle(el)
    const marginTop = parseInt(elementStyle.marginTop)
    const marginBottom = parseInt(elementStyle.marginBottom)
    colHeightArray[minIndex] += el.clientHeight + marginTop + marginBottom
  })
}

function LazyloadImage(selector: NodeListOf<HTMLImageElement>) {
  selector.forEach((img: any) => {
    img.children[1].src = img.children[1].getAttribute('data-src') || 'img/blank.gif'
    img.children[1].style.width = img.getAttribute('data-width') + 'px'
    img.children[1].style.height = img.getAttribute('data-height') + 'px' || 'auto'
    img.children[0].innerHTML = img.getAttribute('data-date') || ''
  })
}

function resizeHandler() {
  if (timer != null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    waterfallTs('.waterfall .image')
  }, 900)
}

onMounted(() => {
  LazyloadImage(document.querySelectorAll('.waterfall .image'))
  // setTimeout(() => {

  // }, 100)
  waterfallTs('.waterfall .image')
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
/* Add your styles here */
</style>

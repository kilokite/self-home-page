<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import kilokite from '../assets/kilokite.svg'
import star from '../assets/star.svg'
import bgImg from '../assets/bg.jpg'

/** 是否显示背景图 bg.jpg，可在此切换 */
const showBgImage = ref(false)

const showScrollHint = ref(false)
const contentOffsetY = ref(0)
const SCROLL_THRESHOLD = 40
const scrollRange = ref(800)

function onScroll() {
  const y = window.scrollY
  if (y > SCROLL_THRESHOLD) {
    showScrollHint.value = false
  } else {
    showScrollHint.value = true
  }
  // 滚动时向下移动，最多 50%（相对视口）
  const progress = Math.min(y / scrollRange.value, 1)
  contentOffsetY.value = progress * 40
}

onMounted(() => {
  scrollRange.value = window.innerHeight
  showScrollHint.value = true
  onScroll() // 初始化位移
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="welcome"
    :style="showBgImage ? { backgroundImage: `url(${bgImg})` } : undefined"
  >
    <div
      class="welcome-content"
      :style="{ transform: `translateY(${contentOffsetY}vh)` }"
    >
      <img :src="kilokite" alt="kilokite" />
      <img :src="star" alt="star" class="star" />
    </div>
    <Transition name="scroll-hint-fade">
      <div v-show="showScrollHint" class="scroll-hint" aria-label="向上滚动">
        <div class="scroll-hint-ripple">
          <span class="ripple-ring" aria-hidden="true" />
        </div>
        <span class="scroll-hint-arrow">↑</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  color: #aaaaaa;
  animation: scroll-hint-bounce 2s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  min-height: 80px;
}

.scroll-hint-ripple {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  pointer-events: none;
  z-index: 0;
}

.ripple-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  margin-left: -28px;
  margin-top: -28px;
  border-radius: 50%;
  background: rgba(170, 170, 170, 0.5);
  animation: ripple-wave 1s cubic-bezier(0.33, 0, 0.2, 1) infinite;
  opacity: 0;
}
.scroll-hint-arrow {
  position: relative;
  z-index: 1;
  font-size: 48px;
  line-height: 1;
}

.scroll-hint-fade-enter-active,
.scroll-hint-fade-leave-active {
  transition: opacity 0.35s ease;
}
.scroll-hint-fade-enter-from,
.scroll-hint-fade-leave-to {
  opacity: 0;
}

.star {
  position: absolute;
  top: 53px;
  right: 30px;
  animation: star-spin 4s ease-in-out infinite;
}

@keyframes star-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes scroll-hint-bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
  }
}

/* 水波：从中心散开并变透明 */
@keyframes ripple-wave {
  0% {
    transform: scale(0.4);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}
</style>
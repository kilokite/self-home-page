<!-- 一键自适应缩放容器 -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  initScaleContainer,
  type ScaleContainerOptions,
} from "../utils/ScaleContainer";

interface Props {
  // 设计稿宽度
  width: number;
  // 设计稿高度
  height: number;
  // X轴微调
  x?: number;
  // Y轴微调
  y?: number;
  // 窗口宽度（可选，默认使用 window.innerWidth）
  windowWidth?: number;
  // 窗口大小改变时是否自动刷新
  resizeOnWindowChange?: boolean;
  // 最大宽度限制
  maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  x: 0,
  y: 0,
  resizeOnWindowChange: false,
});

const outerElementRef = ref<HTMLElement | null>(null);
const innerElementRef = ref<HTMLElement | null>(null);
let cleanup: (() => void) | undefined;

// 初始化缩放容器
const initScale = () => {
  if (!outerElementRef.value || !innerElementRef.value) {
    console.warn("ScaleContainer: 外层或内层容器元素不存在");
    return;
  }

  // 清理之前的监听器
  if (cleanup) {
    cleanup();
    cleanup = undefined;
  }

  const options: ScaleContainerOptions = {
    outerElement: outerElementRef.value,
    innerElement: innerElementRef.value,
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y,
    windowWidth: props.windowWidth,
    resizeOnWindowChange: props.resizeOnWindowChange,
    maxWidth: props.maxWidth,
  };

  cleanup = initScaleContainer(options);
};

// 监听 props 变化，重新初始化
watch(
  () => [
    props.width,
    props.height,
    props.x,
    props.y,
    props.windowWidth,
    props.resizeOnWindowChange,
    props.maxWidth,
  ],
  () => {
    initScale();
  },
  { deep: true }
);

onMounted(() => {
  // 使用 nextTick 确保 DOM 已渲染
  setTimeout(() => {
    initScale();
  }, 0);
});

onUnmounted(() => {
  // 清理事件监听器
  if (cleanup) {
    cleanup();
    cleanup = undefined;
  }
});
</script>

<template>
  <div ref="outerElementRef" class="scale-container-outer">
    <div ref="innerElementRef" class="scale-container-inner">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.scale-container-outer {
  position: relative;
  overflow: hidden;
}

.scale-container-inner {
  position: relative;
}
</style>

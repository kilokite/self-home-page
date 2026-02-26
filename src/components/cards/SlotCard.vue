<script setup lang="ts">
defineProps<{
  /** 圆角半径，默认与 LinkCard 一致 */
  radius?: number
}>()
</script>

<template>
  <div class="slot-card" :style="radius != null ? { '--slot-card-radius': `${radius}px` } : undefined">
    <slot />
  </div>
</template>

<style scoped>
.slot-card {
  border-radius: var(--slot-card-radius, 30px);
  overflow: hidden;
}
</style>

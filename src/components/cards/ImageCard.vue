<script setup lang="ts">
defineProps<{
  /** 图片地址（URL 或静态 import） */
  src: string
  /** 图片描述，用于 alt */
  alt?: string
  /** 可选：点击跳转链接，不传则仅为展示卡片 */
  href?: string
  /** 是否新窗口打开，默认 true（仅 href 存在时有效） */
  external?: boolean
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="image-card"
    :href="href"
    :target="href && external !== false ? '_blank' : undefined"
    :rel="href && external !== false ? 'noopener noreferrer' : undefined"
  >
    <div class="image-card__img-wrap" aria-hidden="true">
      <img :src="src" :alt="alt ?? ''" class="image-card__img" />
    </div>
  </component>
</template>

<style scoped>
.image-card {
  display: block;
  background: #ffffff;
  border-radius: 30px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease;
  cursor: var(--image-card-cursor, default);
}

.image-card[href] {
  cursor: pointer;
}

.image-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.image-card__img-wrap {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 30px;
}

.image-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  vertical-align: middle;
}
</style>

<script setup lang="ts">
defineProps<{
  /** 图标地址（图片 URL 或静态 import） */
  icon: string
  /** 平台名称，如 Telegram、GitHub */
  platform: string
  /** 用户名，如 @kilokite，展示时可不带 @ 由调用方决定 */
  username: string
  /** 点击跳转链接 */
  href: string
  /** 是否新窗口打开，默认 true */
  external?: boolean
}>()
</script>

<template>
  <a
    class="link-card"
    :href="href"
    :target="external !== false ? '_blank' : undefined"
    :rel="external !== false ? 'noopener noreferrer' : undefined"
  >
    <div class="link-card__icon" aria-hidden="true">
      <img :src="icon" :alt="platform" />
    </div>
    <div class="link-card__text">
      <span class="link-card__platform">{{ platform }}</span>
      <span class="link-card__username">{{ username }}</span>
    </div>
  </a>
</template>

<style scoped>
.link-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 36px 64px;
  background: #ffffff;
  border-radius: 30px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  min-width: 0;
}

.link-card:hover {
}

.link-card__icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  transform: translate(0px,3px);
}

.link-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.link-card__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
}

.link-card__platform {
  font-weight: 900;
  font-size: 38px;
  line-height: 38px;
  color: #000000;
}

.link-card__username {
  font-weight: 900;
  font-size: 24px;
  line-height: 24px;
  color: #666666;
}
</style>

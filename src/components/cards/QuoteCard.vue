<script setup lang="ts">
defineProps<{
  /** 语录正文 */
  quote: string
  /** 可选：出处/作者 */
  author?: string
  /** 可选：点击跳转链接 */
  href?: string
  /** 是否新窗口打开，默认 true（仅 href 存在时有效） */
  external?: boolean
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="quote-card"
    :href="href"
    :target="href && external !== false ? '_blank' : undefined"
    :rel="href && external !== false ? 'noopener noreferrer' : undefined"
  >
    <span class="quote-card__mark" aria-hidden="true">「</span>
    <p class="quote-card__text">{{ quote }}</p>
    <footer v-if="author" class="quote-card__author">{{ author }}</footer>
  </component>
</template>

<style scoped>
.quote-card {
  display: block;
  padding: 36px 40px 36px 48px;
  background: #ffffff;
  border-radius: var(--slot-card-radius, 30px);
  text-decoration: none;
  color: inherit;
  cursor: var(--quote-card-cursor, default);
  position: relative;
}

.quote-card[href] {
  cursor: pointer;
}

.quote-card__mark {
  position: absolute;
  left: 20px;
  top: 28px;
  font-size: 32px;
  line-height: 1;
  color: #ffe500;
  font-family: 'homo-SC-black', sans-serif;
}

.quote-card__text {
  font-weight: 900;
  font-size: 22px;
  line-height: 1.45;
  color: #000000;
  margin: 0 0 12px 0;
  padding-left: 24px;
}

.quote-card__author {
  font-weight: 900;
  font-size: 18px;
  line-height: 1.3;
  color: #666666;
  margin: 0;
  padding-left: 24px;
}
</style>

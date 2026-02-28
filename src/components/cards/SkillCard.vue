<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    skills?: string[];
  }>(),
  {
    title: "技能栈",
    subtitle: "Tech Stack",
    skills: () => ["Vue 3", "TypeScript", "Node.js", "Vite", "Tailwind", "PostgreSQL"]
  }
);
</script>

<template>
  <section class="skill-card">
    <header class="skill-card__header">
      <p class="skill-card__title">{{ title }}</p>
      <p class="skill-card__subtitle">{{ subtitle }}</p>
    </header>

    <ul class="skill-card__list">
      <li v-for="skill in skills" :key="skill" class="skill-card__chip">
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.skill-card {
  width: 100%;
  height: 100%;
  border-radius: var(--slot-card-radius, 30px);
  background: #ffffff;
  box-sizing: border-box;
  padding: 18px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

.skill-card::after {
  content: "";
  position: absolute;
  right: -16px;
  top: -16px;
  width: 72px;
  height: 72px;
  border: 10px solid #ffe500;
  border-radius: 50%;
  opacity: 0.8;
  pointer-events: none;
}

.skill-card__header {
  margin: 0;
}

.skill-card__title {
  margin: 0;
  color: #000000;
  font-size: 24px;
  line-height: 1;
  font-weight: 900;
}

.skill-card__subtitle {
  margin: 6px 0 0;
  color: #5c5c5c;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.skill-card__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-card__chip {
  min-height: 22px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid #ebebeb;
  background: #fafafa;
  color: #000000;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
}
</style>

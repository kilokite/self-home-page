<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    targetDate: string | Date;
  }>(),
  {
    title: "",
    subtitle: "距离目标日"
  }
);

const now = ref(Date.now());
let timer: number | null = null;

const targetTimestamp = computed(() => new Date(props.targetDate).getTime());

const countdown = computed<CountdownParts>(() => {
  const diff = Math.max(0, targetTimestamp.value - now.value);
  const done = diff <= 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done };
});

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const targetDateText = computed(() => {
  const date = new Date(props.targetDate);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
});

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
});
</script>

<template>
  <section class="countdown-card">
    <header class="countdown-card__header">
      <p v-if="title" class="countdown-card__title">{{ title }}</p>
      <p class="countdown-card__subtitle">{{ subtitle }}</p>
    </header>

    <div v-if="!countdown.done" class="countdown-card__time">
      <div class="countdown-card__cell">
        <span class="countdown-card__value">{{ countdown.days }}</span>
        <span class="countdown-card__label">天</span>
      </div>
      <span class="countdown-card__sep">:</span>
      <div class="countdown-card__cell">
        <span class="countdown-card__value">{{ pad(countdown.hours) }}</span>
        <span class="countdown-card__label">时</span>
      </div>
      <span class="countdown-card__sep">:</span>
      <div class="countdown-card__cell">
        <span class="countdown-card__value">{{ pad(countdown.minutes) }}</span>
        <span class="countdown-card__label">分</span>
      </div>
      <span class="countdown-card__sep">:</span>
      <div class="countdown-card__cell">
        <span class="countdown-card__value">{{ pad(countdown.seconds) }}</span>
        <span class="countdown-card__label">秒</span>
      </div>
    </div>

    <p v-else class="countdown-card__done">目标日已到达</p>

    <footer class="countdown-card__footer">
      <div class="countdown-card__target">
        <span class="countdown-card__target-label">目标日</span>
        <span class="countdown-card__target-value">{{ targetDateText }}</span>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.countdown-card {
  width: 100%;
  height: 100%;
  border-radius: var(--slot-card-radius, 30px);
  background: #ffffff;
  padding: 24px 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  gap: 14px;
}

/* .countdown-card::after {
  content: "";
  position: absolute;
  right: 18px;
  top: 20px;
  width: 42px;
  height: 8px;
  border-radius: 999px;
  background: #ffe500;
} */

.countdown-card__header {
  margin: 0;
}

.countdown-card__title {
  margin: 0;
  font-size: 34px;
  line-height: 1;
  font-weight: 900;
  color: #000000;
}

.countdown-card__subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 900;
  color: #5c5c5c;
}

.countdown-card__time {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  margin-top: 2px;
}

.countdown-card__cell {
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

.countdown-card__value {
  font-size: 30px;
  line-height: 1;
  font-weight: 900;
  color: #000000;
}

.countdown-card__label {
  font-size: 12px;
  line-height: 1.2;
  font-weight: 900;
  color: #5c5c5c;
  transform: translateY(-2px);
}

.countdown-card__sep {
  font-size: 24px;
  line-height: 1;
  font-weight: 900;
  color: #4625ff;
  transform: translateY(-3px);
}

.countdown-card__done {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 900;
  color: #ff4a4a;
}

.countdown-card__footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.countdown-card__target {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.countdown-card__target-label {
  color: #5c5c5c;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

.countdown-card__target-value {
  color: #000000;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.03em;
}

</style>

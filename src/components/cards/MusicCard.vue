<template>
    <div
        class="music-card"
        :class="{ 'is-playing': isPlaying }"
        @click="togglePlay"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
    >
        <audio ref="audioRef" :src="src" @timeupdate="onTimeUpdate" @ended="onEnded" @pause="onPause" @play="onPlay" />
        <div class="music-card__cover" :class="{ 'is-playing': isPlaying }">
            <svg width="270" height="270" viewbox="0 0 270 270" class="progress-svg">
                <rect x="5" y="5" width="256.5" height="256.5" rx="32" ry="32" class="progress-bg" />
                <rect ref="barRef" id="bar" x="5" y="5" width="256.5" height="256.5" rx="32" ry="32" class="progress-bar" />
            </svg>
            <img :src="cover" alt="cover" />
        </div>
        <Transition name="now-playing">
            <div v-if="isPlaying && isHovering" class="music-card__now-playing">
                <span class="music-card__title">{{ title || '正在播放' }}</span>
                <span v-if="artist" class="music-card__artist">{{ artist }}</span>
            </div>
        </Transition>
        <PlayIcon class="play-icon" :class="{ 'is-playing': isPlaying }" :color="playColor" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlayIcon from '../icon/play.vue'

withDefaults(
    defineProps<{
        src: string
        cover: string
        title?: string
        artist?: string
        /** 播放按钮图标颜色，支持任意合法 CSS 颜色值 */
        playColor?: string
    }>(),
    { playColor: '#fff' }
)

const audioRef = ref<HTMLAudioElement | null>(null)
const barRef = ref<SVGGeometryElement | null>(null)
const isPlaying = ref(false)
const isHovering = ref(false)

// 圆角矩形周长: 2(W+H) - 2r(4-π), rect 270×260 rx=ry=32
const TOTAL_LENGTH = 2 * (270 + 260) - 2 * 32 * (4 - Math.PI)

function setProgress(percent: number) {
    const bar = barRef.value
    if (!bar) return
    const offset = TOTAL_LENGTH - (percent / 100) * TOTAL_LENGTH
    bar.style.strokeDashoffset = String(offset)
}

function togglePlay() {
    const audio = audioRef.value
    if (!audio) return

    if (isPlaying.value) {
        audio.pause()
    } else {
        audio.play()
    }
}

function onPause() {
    isPlaying.value = false
}

function onPlay() {
    isPlaying.value = true
}

function onTimeUpdate() {
    const audio = audioRef.value
    if (!audio || !audio.duration) return
    const percent = (audio.currentTime / audio.duration) * 100
    setProgress(percent)
}

function onEnded() {
    isPlaying.value = false
    setProgress(0)
}
</script>

<style scoped>
.music-card {
    position: relative;
    border-radius: var(--slot-card-radius, 30px);
    width: 285px;
    aspect-ratio: 1/1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    cursor: pointer;
}

.music-card__cover img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0, 1.79);
}

.music-card__cover.is-playing img {
    border-radius: var(--slot-card-radius, 30px);
    transform: scale(0.9);
}

.play-icon {
    position: absolute;
    bottom: 36px;
    right: 36px;
    transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0, 1.79);
}

.play-icon.is-playing {
    opacity: 0;
    pointer-events: none;
}

.music-card__now-playing {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    padding: 12px 16px 20px;
    background: linear-gradient(to top, #000000aa, transparent);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 2px;
    pointer-events: none;
}

.now-playing-enter-active,
.now-playing-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.now-playing-enter-from,
.now-playing-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

.music-card__title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.music-card__artist {
    font-size: 12px;
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.music-card__cover.is-playing .progress-bar {
    stroke-width: 8;
}
.progress-svg {
    position: relative;
    z-index: 3;
}
.progress-bg {
    fill: none;
    stroke: #ffffff00;
    stroke-width: 8;
}

.progress-bar {
    fill: none;
    stroke: #FFE500;
    stroke-width: 0;
    stroke-linecap: round;
    /* 周长 2(270+260) - 2×32×(4-π) ≈ 1005 */
    stroke-dasharray: 1005.06;
    stroke-dashoffset: 1005;
    transform: translateY(4px);
    transition: stroke-width 0.3s cubic-bezier(0.25, 0.1, 0, 1.79), stroke-dashoffset 1s linear;
}
</style>
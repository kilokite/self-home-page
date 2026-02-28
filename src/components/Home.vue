<script setup lang="ts">
import { LinkCard } from "./cards";
import ScaleContainer from "./ScaleContainer.vue";
import ImageCard from "./cards/ImageCard.vue";
import MusicCard from "./cards/MusicCard.vue";
// 设计对比用背景图，可与设计稿对照
import testBg from "../assets/test.png";
import tgIcon from "../assets/icons/Telegram.svg";
import githubIcon from "../assets/icons/Github.svg";
import fish from "../assets/cards/fish.svg";
import kilokite from "../assets/cards/kilokite.svg";
import zocsrd from "../assets/cards/zocsrd.svg";
import recycle from "../assets/cards/recycle.svg";
import blog from "../assets/cards/blog.svg";
import violet from "../assets/custom/violet.webp";

</script>

<template>
	<div class="home">
		<img :src="testBg" alt="设计对比用背景" class="home-img" />
		<ScaleContainer :width="1512" :height="982" :resize-on-window-change="true" :max-width="1512" class="home-container">
			<div class="home-cards">
				<LinkCard :icon="tgIcon" platform="Telegram" username="@kilokite" href="https://t.me/kilokite" class="link-tg" />
        <LinkCard :icon="githubIcon" platform="Github" username="kilokite" href="https://github.com/kilokite" class="link-github" />
				<img :src="fish" alt="fish" class="fish-card card" />
				<img :src="kilokite" alt="kilokite" class="kilokite-card card" />
				<img :src="zocsrd" alt="zocsrd" class="zocsrd-card card" />
				<img :src="recycle" alt="recycle" class="recycle-card card" />

				<ImageCard :src="violet" alt="violet" class="violet-card card"></ImageCard>
				<a href="https://blog.kt.sb" target="_blank" rel="noopener noreferrer" class="blog-card card">
					<img :src="blog" alt="blog" />
					<div class="blog-circle"></div>
				</a>
				<MusicCard src="https://monika.jkloli.net/music/god_knows_archive.mp3" cover="https://monika.jkloli.net/image_bed/d033e22ae3-1772176375815-2b8929ef-99d9-43a1-a268-16ad7b07adf4.jpg" class="music-card card" />
			</div>
		</ScaleContainer>
	</div>
</template>

<style scoped>
.home {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* height: 100vh; */
	background-color: #f0f0f0;
}

.home-container {
	/* background: blue; */
	/* max-width: 1512px; */
}

/* 设计对比用背景图 */
.home-img {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
	pointer-events: none;
	z-index: 0;
}

.home-cards {
	position: relative;
	z-index: 1;
	/* display: flex; */
	/* flex-direction: column; */
	/* align-items: center; */
	/* gap: 12px; */
	/* opacity: 0.5; */
}

.link-tg {
	/* background: red; */
	position: absolute;
	width: 382px;
	height: 125px;
	top: 34px;
	left: 436px;
}

.link-github {
	/* background: red; */
	position: absolute;
	width: 382px;
	height: 125px;
	top: 34px;
	left: 25.49px;
}

.card {
	position: absolute;
}
.fish-card {
	top: 349px;
	left: 436px;
}
.kilokite-card {
	top: 536px;
	left: 23px;
}
.zocsrd-card {
	top: 186px;
	left: 436px;
}
.recycle-card {
	top: 352px;
	left: 769px;
}
.violet-card {
	width: 471px;
	height: 283px;
	top: 685px;
	left: 338px;
}
.blog-card {
	top: 34px;
	left: 856px;
  overflow: hidden;

  &:hover {
    .blog-circle {
      transform: scale(1.1);
    }
  }
}
.music-card {
	top: 687px;
	left: 23px;
}
.blog-circle {
	border: 19px solid #ffe500;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0, 1.79);
  height: 207px;
  aspect-ratio: 1/1;
  position: absolute;
  top: 139px;
  left: 113px;
}
</style>

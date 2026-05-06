<template>
  <main class="page">
    <div class="viewer" ref="refViewer">
      <Transition
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div class="viewer__frame" :key="currentItem.id ?? 'hero'">
          <div class="viewer__media">
            <template v-if="currentItem.hasVideo">
              <video
                :src="currentItem.video"
                autoplay
                muted
                playsinline
                @ended="onVideoEnded"
              />
              <img
                v-if="currentItem.imageEnd"
                :src="currentItem.imageEnd"
                class="viewer__video-end"
                :class="{ 'viewer__video-end--visible': videoEnded }"
              />
            </template>
            <template v-else-if="currentItem.variants">
              <img
                v-for="v in currentItem.variants"
                :key="v.name"
                :src="v.image"
                class="viewer__variant-img"
                :class="{ 'viewer__variant-img--active': v.name === activeVariant?.name }"
              />
            </template>
            <img v-else :src="viewerImage" />
          </div>
        </div>
      </Transition>
      <Transition name="close-fade">
        <button v-if="activeFeature" class="viewer__close" @click="onClose" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path d="m20.1211 18 3.4395-3.4395c.5859-.5854.5859-1.5356 0-2.1211-.5859-.5859-1.5352-.5859-2.1211 0l-3.4395 3.4395-3.4395-3.4395c-.5859-.5859-1.5352-.5859-2.1211 0-.5859.5854-.5859 1.5356 0 2.1211l3.4395 3.4395-3.4395 3.4395c-.5859.5854-.5859 1.5356 0 2.1211.293.293.6768.4395 1.0605.4395s.7676-.1465 1.0605-.4395l3.4395-3.4395 3.4395 3.4395c.293.293.6768.4395 1.0605.4395s.7676-.1465 1.0605-.4395c.5859-.5854.5859-1.5356 0-2.1211l-3.4395-3.4395z"/>
          </svg>
        </button>
      </Transition>
      <Chooser
        :features="features"
        :active-id="activeFeature?.id ?? null"
        :active-variant-name="activeVariant?.name ?? null"
        @select="onSelect"
        @select-variant="onSelectVariant"
      />
    </div>
  </main>
</template>

<script setup>
import gsap from "gsap";
import { computed, onMounted, ref, watch } from "vue";
import Chooser from "./components/Chooser.vue";
import { features, hero } from "./data/features.js";

const activeFeature = ref(null);
const activeVariant = ref(null);
const videoEnded = ref(false);

const currentItem = computed(() => activeFeature.value ?? hero);
const viewerImage = computed(() => currentItem.value.imageStart);

function onClose() {
  activeFeature.value = null;
  activeVariant.value = null;
}

function onSelect(feature) {
  if (activeFeature.value?.id !== feature.id) {
    activeVariant.value = feature.variants?.[0] ?? null;
  }
  activeFeature.value = feature;
}

function onSelectVariant(variant) {
  activeVariant.value = variant;
}

function onVideoEnded() {
  videoEnded.value = true;
}

// Reset video state and preload imageEnd whenever the active item changes
watch(
  currentItem,
  (item) => {
    videoEnded.value = false;
    if (item.imageEnd) {
      new Image().src = item.imageEnd;
    }
  },
  { immediate: true },
);

const refViewer = ref(null);

const SCALE_SMALL = 1440 / 1728; // ~0.833 — matches 1440×760 at native ratio

function onBeforeEnter(el) {
  const media = el.querySelector(".viewer__media");
  gsap.set(el, { xPercent: 10 });
  if (media) gsap.set(media, { scale: SCALE_SMALL, opacity: 0 });
}

function onEnter(el, done) {
  el._enterDone = done;
  const media = el.querySelector(".viewer__media");
  gsap
    .timeline({ onComplete: done })
    .to(el, { xPercent: 0, duration: 1.5, ease: "expo.out" }, 0)
    .to(media ?? el, { scale: 1, opacity: 1, duration: 1, ease: "expo.out" }, 0)
    .set(el, { clearProps: "transform" })
    .set(media ?? el, { clearProps: "transform,opacity" });
}

function onLeave(el, done) {
  const media = el.querySelector(".viewer__media");
  // Kill any in-flight enter animation and resolve it so Vue can clean up
  gsap.killTweensOf([el, media]);
  el._enterDone?.();
  el._enterDone = null;
  // Snap out instantly
  gsap.set(el, { xPercent: -10 });
  gsap.set(media ?? el, { opacity: 0 });
  done();
}

onMounted(() => {
  const allImages = [
    hero.imageStart, hero.imageEnd,
    ...features.flatMap(f => [
      f.imageStart, f.imageEnd,
      ...(f.variants?.map(v => v.image) ?? []),
    ].filter(Boolean)),
  ];
  allImages.forEach(src => { new Image().src = src; });

  gsap.from(refViewer.value, {
    autoAlpha: 0,
    y: 40,
    duration: 1,
    ease: "expo.out",
  });
});
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.viewer {
  position: relative;
  border-radius: var(--viewer-border-radius);
  overflow: hidden;
  clip-path: inset(0 round var(--viewer-border-radius));
  background-color: var(--viewer-bg);
  width: 1440px;
  height: 760px;
  display: flex;
  align-items: center;
  transform: translateZ(0);
}

.viewer__frame {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer__media {
  width: 1728px;
  max-width: none;
  height: 912px;
  flex-shrink: 0;
  position: relative;
}

.viewer__media > img,
.viewer__media > video {
  width: 100%;
  height: 100%;
  display: block;
}

.viewer__video-end {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.viewer__video-end--visible {
  opacity: 1;
}

.viewer__variant-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.viewer__variant-img--active {
  opacity: 1;
  z-index: 1;
}

.viewer__close {
  position: absolute;
  top: 23px;
  right: 23px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 44px;
  border: none;
  background-color: var(--chooser-item-bg);
  backdrop-filter: blur(20px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.viewer__close svg {
  width: 33px;
  height: 33px;
  fill: black;
}

.close-fade-enter-active,
.close-fade-leave-active { transition: opacity 0.2s ease; }
.close-fade-enter-from,
.close-fade-leave-to { opacity: 0; }
</style>

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
            <video
              v-if="showVideo"
              :src="currentItem.video"
              autoplay
              muted
              playsinline
              @ended="onVideoEnded"
            />
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
const showVideo = computed(
  () => !!currentItem.value.hasVideo && !videoEnded.value,
);
const viewerImage = computed(() =>
  videoEnded.value ? currentItem.value.imageEnd : currentItem.value.imageStart
);

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
  const media = el.querySelector(".viewer__media");
  gsap
    .timeline({ onComplete: done })
    .to(el, { xPercent: 0, duration: 1.5, ease: "expo.out" }, 0)
    .to(media ?? el, { scale: 1, opacity: 1, duration: 1, ease: "expo.out" }, 0);
}

function onLeave(el, done) {
  const media = el.querySelector(".viewer__media");
  gsap
    .timeline({ onComplete: done })
    .to(el, { xPercent: -10, duration: 1, ease: "expo.out" }, 0)
    .to(media ?? el, { scale: SCALE_SMALL, opacity: 0, duration: 0.5, ease: "expo.out" }, 0);
}

onMounted(() => {
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
  background-color: var(--viewer-bg);
  width: 1440px;
  height: 760px;
  display: flex;
  align-items: center;
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
</style>

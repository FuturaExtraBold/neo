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
          <video
            v-if="showVideo"
            :src="currentItem.video"
            autoplay
            muted
            playsinline
            @ended="onVideoEnded"
          />
          <img v-else :src="viewerImage" />
        </div>
      </Transition>
      <Chooser
        :features="features"
        :active-id="activeFeature?.id ?? null"
        @select="onSelect"
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
const videoEnded = ref(false);

const currentItem = computed(() => activeFeature.value ?? hero);
const showVideo = computed(
  () => !!currentItem.value.hasVideo && !videoEnded.value,
);
const viewerImage = computed(() =>
  videoEnded.value ? currentItem.value.imageEnd : currentItem.value.imageStart,
);

function onSelect(feature) {
  activeFeature.value = feature;
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
  const media = el.querySelector("img, video");
  gsap.set(el, { xPercent: 10 });
  if (media) gsap.set(media, { scale: SCALE_SMALL, opacity: 0 });
}

function onEnter(el, done) {
  const media = el.querySelector("img, video");
  gsap
    .timeline({ onComplete: done })
    .to(el, { xPercent: 0, duration: 1.5, ease: "expo.out" }, 0)
    .to(
      media ?? el,
      { scale: 1, opacity: 1, duration: 1, ease: "expo.out" },
      0,
    );
}

function onLeave(el, done) {
  const media = el.querySelector("img, video");
  gsap
    .timeline({ onComplete: done })
    .to(el, { xPercent: -10, duration: 1, ease: "expo.out" }, 0)
    .to(
      media ?? el,
      {
        scale: SCALE_SMALL,
        opacity: 0,
        duration: 0.5,
        ease: "expo.out",
      },
      0,
    );
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

.viewer__frame img,
.viewer__frame video {
  width: 1728px;
  max-width: none;
  height: 912px;
  flex-shrink: 0;
}
</style>

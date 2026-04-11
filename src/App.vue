<template>
  <main class="page">
    <div class="viewer" ref="refViewer">
      <div class="viewer__frame">
        <video
          v-if="showVideo"
          :key="currentItem.id ?? 'hero'"
          :src="currentItem.video"
          autoplay
          muted
          playsinline
          @ended="onVideoEnded"
        />
        <img
          v-else
          :src="viewerImage"
        />
      </div>
      <Chooser :features="features" :active-id="activeFeature?.id ?? null" @select="onSelect" />
    </div>
  </main>
</template>

<script setup>
import gsap from "gsap";
import { computed, onMounted, ref, watch } from "vue";
import Chooser from "./components/Chooser.vue";
import { features, hero } from "./data/features.js";

const activeFeature = ref(null)
const videoEnded    = ref(false)

const currentItem = computed(() => activeFeature.value ?? hero)
const showVideo   = computed(() => !!currentItem.value.hasVideo && !videoEnded.value)
const viewerImage = computed(() =>
  videoEnded.value ? currentItem.value.imageEnd : currentItem.value.imageStart
)

function onSelect(feature) {
  activeFeature.value = feature
}

function onVideoEnded() {
  videoEnded.value = true
}

// Reset video state and preload imageEnd whenever the active item changes
watch(currentItem, (item) => {
  videoEnded.value = false
  if (item.imageEnd) {
    new Image().src = item.imageEnd
  }
}, { immediate: true })

const refViewer = ref(null)

onMounted(() => {
  gsap.from(refViewer.value, {
    autoAlpha: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
  })
})
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
}

.viewer__frame img,
.viewer__frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

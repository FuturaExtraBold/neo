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
                :class="{
                  'viewer__variant-img--active': v.name === activeVariant?.name,
                }"
              />
            </template>
            <img v-else :src="viewerImage" />
          </div>
        </div>
      </Transition>
      <Transition name="close-fade">
        <button
          v-if="activeFeature"
          class="viewer__close"
          @click="onClose"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path
              d="m20.1211 18 3.4395-3.4395c.5859-.5854.5859-1.5356 0-2.1211-.5859-.5859-1.5352-.5859-2.1211 0l-3.4395 3.4395-3.4395-3.4395c-.5859-.5859-1.5352-.5859-2.1211 0-.5859.5854-.5859 1.5356 0 2.1211l3.4395 3.4395-3.4395 3.4395c-.5859.5854-.5859 1.5356 0 2.1211.293.293.6768.4395 1.0605.4395s.7676-.1465 1.0605-.4395l3.4395-3.4395 3.4395 3.4395c.293.293.6768.4395 1.0605.4395s.7676-.1465 1.0605-.4395c.5859-.5854.5859-1.5356 0-2.1211l-3.4395-3.4395z"
            />
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
import Chooser from "./components/Chooser.vue";
import { features } from "./data/features.js";
import { useViewerState } from "./composables/useViewerState.js";
import { useViewerTransition } from "./composables/useViewerTransition.js";

const {
  activeFeature,
  activeVariant,
  videoEnded,
  currentItem,
  viewerImage,
  onClose,
  onSelect,
  onSelectVariant,
  onVideoEnded,
} = useViewerState();
const { refViewer, onBeforeEnter, onEnter, onLeave } = useViewerTransition();
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
  transform: translateZ(0);
}

.viewer__frame {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: inset(0 round var(--viewer-border-radius));
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
.close-fade-leave-active {
  transition: opacity 0.2s ease;
}
.close-fade-enter-from,
.close-fade-leave-to {
  opacity: 0;
}
</style>

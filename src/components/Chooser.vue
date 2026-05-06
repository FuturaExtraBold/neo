<template>
  <div class="chooser">
    <div class="chooser__nav">
      <button
        class="chooser__nav-btn"
        :disabled="isFirst"
        @click="onPrev"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path
            d="m11 20c0-.3838.1465-.7676.4395-1.0605l5.5-5.5c.5854-.5859 1.5356-.5859 2.1211 0l5.5 5.5c.5859.5859.5859 1.5352 0 2.1211-.5854.5859-1.5356.5859-2.1211 0l-4.4395-4.4395-4.4395 4.4395c-.5854.5859-1.5356.5859-2.1211 0-.293-.293-.4395-.6768-.4395-1.0605z"
          />
        </svg>
      </button>
      <button
        class="chooser__nav-btn"
        :disabled="isLast"
        @click="onNext"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          style="transform: rotate(180deg)"
        >
          <path
            d="m11 20c0-.3838.1465-.7676.4395-1.0605l5.5-5.5c.5854-.5859 1.5356-.5859 2.1211 0l5.5 5.5c.5859.5859.5859 1.5352 0 2.1211-.5854.5859-1.5356.5859-2.1211 0l-4.4395-4.4395-4.4395 4.4395c-.5854.5859-1.5356.5859-2.1211 0-.293-.293-.4395-.6768-.4395-1.0605z"
          />
        </svg>
      </button>
    </div>
    <ul class="chooser__list">
      <ChooserItem
        v-for="feature in features"
        :key="feature.id"
        :feature="feature"
        :is-active="activeId === feature.id"
        @select="emit('select', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ChooserItem from "./ChooserItem.vue";

const props = defineProps({
  features: {
    type: Array,
    required: true,
  },
  activeId: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["select"]);

const activeIndex = computed(() =>
  props.features.findIndex((f) => f.id === props.activeId),
);

const isFirst = computed(() => activeIndex.value <= 0);
const isLast = computed(() => activeIndex.value === props.features.length - 1);

function onPrev() {
  if (activeIndex.value > 0) {
    emit("select", props.features[activeIndex.value - 1]);
  }
}

function onNext() {
  const next = activeIndex.value < 0 ? 0 : activeIndex.value + 1;
  if (next < props.features.length) {
    emit("select", props.features[next]);
  }
}
</script>

<style scoped>
.chooser {
  position: relative;
  margin-left: 90px;
}

.chooser__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chooser__nav {
  position: absolute;
  left: -67px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.chooser__nav-btn {
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
  flex-shrink: 0;
}

.chooser__nav-btn svg {
  width: 33px;
  height: 33px;
  fill: black;
  transition: fill 0.2s ease;
}

.chooser__nav-btn:disabled {
  cursor: default;
}

.chooser__nav-btn:disabled svg {
  fill: #b0b0b5;
}
</style>

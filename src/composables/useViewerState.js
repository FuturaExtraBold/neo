import { computed, ref, watch } from "vue";
import { hero } from "../data/features.js";

export function useViewerState() {
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

  watch(
    currentItem,
    (item) => {
      videoEnded.value = false;
      if (item.imageEnd) new Image().src = item.imageEnd;
    },
    { immediate: true },
  );

  return {
    activeFeature,
    activeVariant,
    videoEnded,
    currentItem,
    viewerImage,
    onClose,
    onSelect,
    onSelectVariant,
    onVideoEnded,
  };
}

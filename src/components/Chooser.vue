<template>
  <ul class="chooser">
    <ChooserItem
      v-for="feature in features"
      :key="feature.id"
      :feature="feature"
      :is-active="activeId === feature.id"
      @select="emit('select', $event)"
    />
  </ul>
</template>

<script setup>
import ChooserItem from "./ChooserItem.vue";

defineProps({
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
</script>

<style scoped>
.chooser {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 90px;
}
</style>

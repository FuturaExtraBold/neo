<template>
  <li
    class="chooser__item"
    :class="{ 'chooser__item--active': isActive }"
    @click="emit('select', feature)"
  >
    <template v-if="!isActive">
      <div class="chooser__item__icon-container">
        <div class="chooser__item__icon">&plus;</div>
      </div>
      <div class="chooser__item__label">{{ feature.label }}</div>
    </template>

    <div
      v-else
      class="chooser__item__description"
      v-html="feature.description"
    />
  </li>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select"]);
</script>

<style scoped>
.chooser__item {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 56px;
  background-color: var(--chooser-item-bg);
  font-size: 17px;
  color: black;
  padding: 15px 30px 15px 15px;
  border-radius: 28px;
  font-weight: 600;
  justify-content: flex-start;
  transition: all 0.1s ease-out;
  cursor: pointer;
  width: fit-content;
  list-style: none;
  backdrop-filter: blur(20px);
}

.chooser__item__icon-container {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chooser__item__icon {
  position: relative;
  line-height: 1;
  left: 1px;
  top: -1px;
}

.chooser__item__label {
  line-height: 1;
}

/* --- active / expanded state --- */
.chooser__item--active {
  height: auto;
  width: 420px;
  align-items: flex-start;
  padding: 30px;
}

.chooser__item__description {
  font-size: 17px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: -0.374px;
}
</style>

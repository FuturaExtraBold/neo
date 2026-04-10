<template>
  <li class="chooser__item" @click="emit('select', feature)">
    <div class="chooser__item__icon-container">
      <div class="chooser__item__icon">&plus;</div>
    </div>
    <div class="chooser__item__label">{{ feature.label }}</div>
  </li>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select'])
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
</style>

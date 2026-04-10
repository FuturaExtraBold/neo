<template>
  <ul class="chooser">
    <ChooserItem label="Colors" />
    <ChooserItem label="Durable design" />
    <ChooserItem label="Display" />
    <ChooserItem label="Keyboard and trackpad" />
    <ChooserItem label="Touch ID" />
    <ChooserItem label="Camera" />
    <ChooserItem label="Mics and speakers" />
    <ChooserItem label="Connectivity" />
  </ul>
</template>

<script setup>
import ChooserItem from "./ChooserItem.vue";
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

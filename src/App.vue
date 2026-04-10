<template>
  <main class="page">
    <div class="viewer" ref="refViewer">
      <div class="viewer__frame">
        <img
          class="hero-image"
          src="./assets/images/hero_start.jpg"
          alt="Closed MacBook Neo"
        />
      </div>
      <Chooser />
    </div>
  </main>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, ref } from "vue";
import Chooser from "./components/Chooser.vue";

const refViewer = ref(null);

onMounted(() => {
  gsap.from(refViewer.value, {
    autoAlpha: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
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
}
</style>

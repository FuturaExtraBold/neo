<template>
  <li
    class="chooser__item"
    :class="{ 'chooser__item--active': isActive }"
    ref="itemEl"
    @click="emit('select', feature)"
  >
    <div class="chooser__item__inner" ref="innerEl">
      <div class="chooser__item__icon-container">
        <div class="chooser__item__icon">&plus;</div>
      </div>
      <div class="chooser__item__label">{{ feature.label }}</div>
    </div>
    <div
      class="chooser__item__description"
      ref="descEl"
      v-html="renderedDescription"
    />
    <div
      v-if="feature.variants"
      class="chooser__item__variants"
      ref="variantsEl"
    >
      <button
        v-for="v in feature.variants"
        :key="v.name"
        class="chooser__item__swatch"
        :class="{
          'chooser__item__swatch--active': v.name === activeVariantName,
        }"
        :style="{ backgroundColor: v.bgColor }"
        @click.stop="emit('select-variant', v)"
      />
    </div>
  </li>
</template>

<script setup>
import gsap from "gsap";
import { computed, nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  feature: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
  activeVariantName: { type: String, default: null },
});

const emit = defineEmits(["select", "select-variant"]);

const itemEl = ref(null);
const innerEl = ref(null);
const descEl = ref(null);
const variantsEl = ref(null);

const activeVariant = computed(
  () =>
    props.feature.variants?.find((v) => v.name === props.activeVariantName) ??
    props.feature.variants?.[0] ??
    null,
);

const renderedDescription = computed(() => {
  if (!props.feature.variants || !activeVariant.value)
    return props.feature.description;
  return `${props.feature.description} Shown in ${activeVariant.value.displayName}.`;
});

// Must match CSS closed state
const CLOSED_H = 56;
const CLOSED_PT = 15;
const CLOSED_PB = 15;
const CLOSED_PL = 15;
const CLOSED_PR = 30;

// Open state design constants
const OPEN_W = 420;
const OPEN_P = 30;

let closedWidth = 0;

onMounted(() => {
  gsap.set(descEl.value, { autoAlpha: 0, display: "none" });
  if (variantsEl.value)
    gsap.set(variantsEl.value, { autoAlpha: 0, display: "none" });
  closedWidth = itemEl.value.offsetWidth;
});

watch(
  () => props.isActive,
  async (active) => {
    await nextTick(); // ensure --active class (gap:0, flex-direction:column) is in DOM before measuring
    gsap.killTweensOf([
      itemEl.value,
      innerEl.value,
      descEl.value,
      variantsEl.value,
    ]);

    if (active) {
      // Remove inner from flow so it doesn't inflate the height measurement
      gsap.set(innerEl.value, { display: "none" });
      gsap.set(descEl.value, { display: "block", autoAlpha: 0 });
      if (variantsEl.value)
        gsap.set(variantsEl.value, { display: "flex", autoAlpha: 0 });

      // Set item to open state — height:'auto' overrides the CSS 56px rule
      gsap.set(itemEl.value, {
        height: "auto",
        width: OPEN_W,
        paddingTop: OPEN_P,
        paddingRight: OPEN_P,
        paddingBottom: OPEN_P,
        paddingLeft: OPEN_P,
      });

      // Force synchronous reflow → real pixel height at 420px with text present
      const openHeight = itemEl.value.offsetHeight;

      // Width + padding: power3.out — no overshoot, stays at 420px max
      gsap.fromTo(
        itemEl.value,
        {
          width: closedWidth,
          paddingTop: CLOSED_PT,
          paddingRight: CLOSED_PR,
          paddingBottom: CLOSED_PB,
          paddingLeft: CLOSED_PL,
        },
        {
          width: OPEN_W,
          paddingTop: OPEN_P,
          paddingRight: OPEN_P,
          paddingBottom: OPEN_P,
          paddingLeft: OPEN_P,
          duration: 0.3,
          ease: "power3.out",
        },
      );

      // Height: back.out(2) — bounce feel on vertical axis only
      gsap.fromTo(
        itemEl.value,
        { height: CLOSED_H },
        {
          height: openHeight,
          duration: 0.3,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.to(descEl.value, { autoAlpha: 1, duration: 0.1 });
            if (variantsEl.value)
              gsap.to(variantsEl.value, { autoAlpha: 1, duration: 0.1 });
          },
        },
      );
    } else {
      // Snap description invisible
      gsap.set(descEl.value, { autoAlpha: 0 });
      if (variantsEl.value) gsap.set(variantsEl.value, { autoAlpha: 0 });

      // Read current open dims so fromTo has explicit FROM — same as opening approach
      const fromWidth = itemEl.value.offsetWidth;
      const fromHeight = itemEl.value.offsetHeight;

      // Width + padding: explicit fromTo, power3.out — hard stop at closedWidth
      gsap.fromTo(
        itemEl.value,
        {
          width: fromWidth,
          paddingTop: OPEN_P,
          paddingRight: OPEN_P,
          paddingBottom: OPEN_P,
          paddingLeft: OPEN_P,
        },
        {
          width: closedWidth,
          paddingTop: CLOSED_PT,
          paddingRight: CLOSED_PR,
          paddingBottom: CLOSED_PB,
          paddingLeft: CLOSED_PL,
          duration: 0.3,
          ease: "power3.out",
        },
      );

      // Height: explicit fromTo, back.out(2)
      gsap.fromTo(
        itemEl.value,
        { height: fromHeight },
        {
          height: CLOSED_H,
          duration: 0.3,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.set(descEl.value, { display: "none" });
            if (variantsEl.value)
              gsap.set(variantsEl.value, { display: "none" });
            gsap.set(itemEl.value, { clearProps: "all" });
            gsap.set(innerEl.value, { display: "flex", autoAlpha: 0 });
            gsap.to(innerEl.value, { autoAlpha: 1, duration: 0.1 });
          },
        },
      );
    }
  },
);
</script>

<style scoped>
.chooser__item {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 56px;
  overflow: hidden;
  background-color: var(--chooser-item-bg);
  font-family: var(--font-sans);
  font-size: 17px;
  color: black;
  padding: 15px 30px 15px 15px;
  border-radius: 28px;
  font-weight: 600;
  justify-content: flex-start;
  cursor: pointer;
  width: fit-content;
  align-self: flex-start;
  list-style: none;
  backdrop-filter: blur(20px);
}

/* GSAP owns width / height / padding — only align-items/direction/gap live here */
.chooser__item--active {
  align-items: flex-start;
  flex-direction: column;
  gap: 0;
}

.chooser__item__inner {
  display: flex;
  align-items: center;
  gap: 14px;
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
  top: -1px;
}

.chooser__item__label {
  line-height: 1;
}

.chooser__item__description {
  font-size: 17px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: -0.1px;
}

.chooser__item__description :deep(strong) {
  font-family: var(--font-sans);
  font-weight: 600;
}

.chooser__item__variants {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
}

.chooser__item__swatch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.chooser__item__swatch--active {
  outline: 2px solid rgba(0, 0, 0, 0.6);
  outline-offset: 2px;
}
</style>

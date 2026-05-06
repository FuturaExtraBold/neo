import gsap from "gsap";
import { onMounted, ref } from "vue";
import { features, hero } from "../data/features.js";

const SCALE_SMALL = 1440 / 1728;

export function useViewerTransition() {
  const refViewer = ref(null);

  function onBeforeEnter(el) {
    const media = el.querySelector(".viewer__media");
    gsap.set(el, { xPercent: 0 });
    if (media) gsap.set(media, { scale: SCALE_SMALL, opacity: 0 });
  }

  function onEnter(el, done) {
    el._enterDone = done;
    const media = el.querySelector(".viewer__media");
    gsap
      .timeline({ onComplete: done })
      .to(el, { xPercent: 0, duration: 1, ease: "expo.out" }, 0)
      .to(
        media ?? el,
        { scale: 1, opacity: 1, duration: 1, ease: "expo.out" },
        0,
      )
      .set(el, { clearProps: "transform" })
      .set(media ?? el, { clearProps: "transform,opacity" });
  }

  function onLeave(el, done) {
    const media = el.querySelector(".viewer__media");
    gsap.killTweensOf([el, media]);
    el._enterDone?.();
    el._enterDone = null;
    gsap
      .timeline({ onComplete: done })
      .to(el, { xPercent: -10, duration: 1, ease: "expo.out" }, 0)
      .to(media ?? el, { opacity: 0, duration: 1, ease: "expo.out" }, 0);
  }

  onMounted(() => {
    const allImages = [
      hero.imageStart,
      hero.imageEnd,
      ...features.flatMap((f) =>
        [
          f.imageStart,
          f.imageEnd,
          ...(f.variants?.map((v) => v.image) ?? []),
        ].filter(Boolean),
      ),
    ];
    allImages.forEach((src) => {
      new Image().src = src;
    });

    gsap.from(refViewer.value, {
      autoAlpha: 0,
      y: 40,
      duration: 1,
      ease: "expo.out",
    });
  });

  return { refViewer, onBeforeEnter, onEnter, onLeave };
}

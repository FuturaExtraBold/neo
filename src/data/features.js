// --- images ---
import imgAudioEnd from "../assets/images/audio_end.jpg";
import imgAudioStart from "../assets/images/audio_start.jpg";
import imgCamera from "../assets/images/camera.jpg";
import imgColorsBlush from "../assets/images/colors_blush.jpg";
import imgColorsCitrus from "../assets/images/colors_citrus.jpg";
import imgColorsIndigo from "../assets/images/colors_indigo.jpg";
import imgColorsSilver from "../assets/images/colors_silver.jpg";
import imgConnectivity from "../assets/images/connectivity.jpg";
import imgDisplay from "../assets/images/display.jpg";
import imgDurable from "../assets/images/durable.jpg";
import imgHeroEnd from "../assets/images/hero_end.jpg";
import imgHeroStart from "../assets/images/hero_start.jpg";
import imgKeyboardEnd from "../assets/images/keyboard_end.jpg";
import imgKeyboardStart from "../assets/images/keyboard_start.jpg";
import imgTouchID from "../assets/images/touchid.jpg";

// --- videos ---
import vidAudio from "../assets/videos/audio.mp4";
import vidHero from "../assets/videos/hero.mp4";
import vidKeyboard from "../assets/videos/keyboard.mp4";

// Default viewer state — shown before any item is selected
export const hero = {
  imageStart: imgHeroStart,
  imageEnd: imgHeroEnd,
  video: vidHero,
  hasVideo: true,
};

// Chooser feature list
// descriptions are raw HTML strings — render with v-html, never as text nodes
export const features = [
  {
    id: "colors",
    label: "Colors",
    description:
      "<strong>Colors.</strong> The most colorful MacBook lineup ever. Choose from four stunning colors with color-coordinated keyboards.",
    imageStart: imgColorsSilver,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: [
      { name: "Silver", displayName: "Silver",      bgColor: "rgb(227, 228, 229)", image: imgColorsSilver },
      { name: "Blush",  displayName: "Blush",       bgColor: "rgb(232, 208, 208)", image: imgColorsBlush  },
      { name: "Citrus", displayName: "Citrus",      bgColor: "rgb(221, 220, 140)", image: imgColorsCitrus },
      { name: "Indigo", displayName: "Indigo", bgColor: "rgb(89, 102, 128)",  image: imgColorsIndigo },
    ],
  },
  {
    id: "durable-design",
    label: "Durable design",
    description:
      "<strong>Durable design.</strong> MacBook Neo is made with a durable recycled aluminum enclosure that helps it reach 60 percent recycled content by weight, the most ever in any Apple product.",
    imageStart: imgDurable,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "display",
    label: "Display",
    description:
      "<strong>Display.</strong> With outstanding resolution and 500 nits of brightness, the 13-inch Liquid Retina display brings photos, websites, and videos to life with refreshing clarity and vivid colors.",
    imageStart: imgDisplay,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "keyboard-and-trackpad",
    label: "Keyboard and trackpad",
    description:
      "<strong>Keyboard and trackpad.</strong> The Magic Keyboard delivers a precise and comfortable typing experience. And the large Multi-Touch trackpad lets you tap, pinch, swipe, and click anywhere.",
    imageStart: imgKeyboardStart,
    imageEnd: imgKeyboardEnd,
    hasVideo: true,
    video: vidKeyboard,
    variants: null,
  },
  {
    id: "touch-id",
    label: "Touch ID",
    description:
      "<strong>Touch ID.</strong> The model with Touch ID lets you easily unlock your MacBook Neo, sign in to websites and apps, and download apps with the touch of your finger.",
    imageStart: imgTouchID,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "camera",
    label: "Camera",
    description:
      "<strong>Camera.</strong> The 1080p FaceTime HD camera gives you a clear and crisp appearance on video calls.",
    imageStart: imgCamera,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "mics-and-speakers",
    label: "Mics and speakers",
    description:
      "<strong>Mics and speakers.</strong> Two side-firing speakers deliver immersive sound, and dual microphones isolate and enhance your voice for crystal clarity.",
    imageStart: imgAudioStart,
    imageEnd: imgAudioEnd,
    hasVideo: true,
    video: vidAudio,
    variants: null,
  },
  {
    id: "connectivity",
    label: "Connectivity",
    description:
      "<strong>Connectivity.</strong> Two USB-C ports and a headphone jack let you connect a variety of accessories, transfer your data, and charge MacBook Neo.",
    imageStart: imgConnectivity,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
];

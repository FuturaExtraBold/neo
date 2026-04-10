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
export const features = [
  {
    id: "colors",
    label: "Colors",
    description: "",
    imageStart: imgColorsSilver, // first variant is the default view
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: [
      { name: "Silver", image: imgColorsSilver },
      { name: "Blush", image: imgColorsBlush },
      { name: "Citrus", image: imgColorsCitrus },
      { name: "Indigo", image: imgColorsIndigo },
    ],
  },
  {
    id: "durable-design",
    label: "Durable design",
    description: "",
    imageStart: imgDurable,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "display",
    label: "Display",
    description: "",
    imageStart: imgDisplay,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "keyboard-and-trackpad",
    label: "Keyboard and trackpad",
    description: "",
    imageStart: imgKeyboardStart,
    imageEnd: imgKeyboardEnd,
    hasVideo: true,
    video: vidKeyboard,
    variants: null,
  },
  {
    id: "touch-id",
    label: "Touch ID",
    description: "",
    imageStart: imgTouchID,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "camera",
    label: "Camera",
    description: "",
    imageStart: imgCamera,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
  {
    id: "mics-and-speakers",
    label: "Mics and speakers",
    description: "",
    imageStart: imgAudioStart,
    imageEnd: imgAudioEnd,
    hasVideo: true,
    video: vidAudio,
    variants: null,
  },
  {
    id: "connectivity",
    label: "Connectivity",
    description: "",
    imageStart: imgConnectivity,
    imageEnd: null,
    hasVideo: false,
    video: null,
    variants: null,
  },
];

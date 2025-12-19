import type { AvatarMakerConfig } from "react-avatar-maker";

// Import RPG assets
import skinBase03 from "../assets/rpg/skin/free_base_03_idle.png";
import skinBase06 from "../assets/rpg/skin/free_base_06_idle.png";
import skinBase07 from "../assets/rpg/skin/free_base_07_idle.png";
import skinGrayscale from "../assets/rpg/skin/free_base_grayscale_idle.png";

import eyesBlue from "../assets/rpg/eyes/free_eyes_blue_idle.png";
import eyesBrown from "../assets/rpg/eyes/free_eyes_brown_idle.png";
import eyesGreen from "../assets/rpg/eyes/free_eyes_green_idle.png";

import hairMediumBrown from "../assets/rpg/hair/free_hair_mediu_brown__idle.png";
import hairMediumRed from "../assets/rpg/hair/free_hair_medium_red_idle.png";
import hairMediumYellow from "../assets/rpg/hair/free_hair_medium_yellow_idle.png";
import hairShortBrown from "../assets/rpg/hair/free_hair_short_brown_idle.png";
import hairShortRed from "../assets/rpg/hair/free_hair_short_red_idle.png";
import hairShortYellow from "../assets/rpg/hair/free_hair_short_yellow_idle.png";

import topBlue from "../assets/rpg/top/free_base_top_blue_idle.png";
import topGreen from "../assets/rpg/top/free_base_top_green_idle.png";
import topRed from "../assets/rpg/top/free_base_top_red_idle.png";
import topWhite from "../assets/rpg/top/free_base_top_white_idle.png";
import topYellow from "../assets/rpg/top/free_base_top_yellow_idle.png";

import pantsBlue from "../assets/rpg/bottom/free_pants_blue_idle.png";
import pantsBrown from "../assets/rpg/bottom/free_pants_brown_idle.png";

/**
 * RPG Character Configuration
 * Pixel art character creator with layered sprite system
 */
export const rpgConfig: AvatarMakerConfig = {
  width: 64,
  height: 64,
  mode: "full",
  preset: "rpg-avatar",
  pixelScale: 7, // Scale up pixel art 7x for better visibility without losing quality
  features: {
    allowToggle: true,
    multipleSheets: true,
    showLabels: true,
    allowConfigExport: true,
    autoPositioning: false,
  },
  parts: [
    {
      category: "body",
      label: "Skin Tone",
      zIndex: 1,
      enabled: true,
      optional: false,
      spriteSheets: [
        {
          url: skinBase03,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: skinBase06,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: skinBase07,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: skinGrayscale,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
      ],
    },
    {
      category: "face",
      label: "Eyes",
      zIndex: 2,
      enabled: true,
      optional: false,
      spriteSheets: [
        {
          url: eyesBlue,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: eyesBrown,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: eyesGreen,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
      ],
    },
    {
      category: "cosmetic",
      label: "Top",
      zIndex: 3,
      enabled: true,
      optional: true,
      spriteSheets: [
        {
          url: topBlue,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: topGreen,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: topRed,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: topWhite,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: topYellow,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
      ],
    },
    {
      category: "custom",
      label: "Pants",
      zIndex: 4,
      enabled: true,
      optional: true,
      spriteSheets: [
        {
          url: pantsBlue,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: pantsBrown,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
      ],
    },
    {
      category: "head",
      label: "Hair",
      zIndex: 5,
      enabled: true,
      optional: true,
      spriteSheets: [
        {
          url: hairMediumBrown,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: hairMediumRed,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: hairMediumYellow,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: hairShortBrown,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: hairShortRed,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
        {
          url: hairShortYellow,
          spriteWidth: 32,
          spriteHeight: 32,
          columns: 1,
          rows: 1,
        },
      ],
    },
  ],
};

/**
 * Default RPG character selection
 */
export const defaultRpgSelection = {
  body: { sheetIndex: 0, spriteIndex: 0 },
  face: { sheetIndex: 0, spriteIndex: 0 },
  cosmetic: { sheetIndex: 0, spriteIndex: 0 },
  custom: { sheetIndex: 0, spriteIndex: 0 },
  head: { sheetIndex: 0, spriteIndex: 0 },
};

/**
 * RPG part labels for UI display
 */
export const rpgPartLabels = {
  body: ["Light", "Medium", "Dark", "Grayscale"],
  face: ["Blue Eyes", "Brown Eyes", "Green Eyes"],
  cosmetic: ["Blue Top", "Green Top", "Red Top", "White Top", "Yellow Top"],
  custom: ["Blue Pants", "Brown Pants"],
  head: [
    "Medium Brown Hair",
    "Medium Red Hair",
    "Medium Yellow Hair",
    "Short Brown Hair",
    "Short Red Hair",
    "Short Yellow Hair",
  ],
};

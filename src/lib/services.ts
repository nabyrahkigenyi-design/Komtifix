// src/lib/services.ts

export type Service = {
  slug: string;

  // i18n keys (translate these via t() in components)
  titleKey: string;
  excerptKey: string;
  bulletsKeys: string[];
  introKey?: string;

  // media
  img: string; // hero/background image
  images: string[]; // gallery images
};

export const services: Service[] = [
  {
    slug: "laminaat-leggen",
    titleKey: "svc_title_laminaat",
    excerptKey: "svc_excerpt_laminaat",
    bulletsKeys: ["svc_b_laminaat_1", "svc_b_laminaat_2", "svc_b_laminaat_3", "svc_b_laminaat_4"],
    introKey: "svc_intro_laminaat",
    img: "https://i.ibb.co/jPvG1bZ1/laminaat-1.jpg",
    images: [
      "https://i.ibb.co/jPvG1bZ1/laminaat-1.jpg",
      "https://i.ibb.co/fV9nfn5r/laminaat-2.jpg",
      "https://i.ibb.co/LdZD4SzL/laminaat-4.jpg",
      "https://i.ibb.co/MkGqPZ5t/laminaat-5.jpg",
      "https://i.ibb.co/4gJBpwsN/laminaat-unsplash.jpg",
      "https://i.ibb.co/v4XRLXLX/laminnat-3.jpg",
    ],
  },

  {
    slug: "badkamer-renovatie",
    titleKey: "svc_title_badkamer",
    excerptKey: "svc_excerpt_badkamer",
    bulletsKeys: ["svc_b_badkamer_1", "svc_b_badkamer_2", "svc_b_badkamer_3", "svc_b_badkamer_4"],
    introKey: "svc_intro_badkamer",
    img: "https://i.ibb.co/8gsnQCkL/hoofd-Tegelwerk.jpg",
    images: [
      "https://i.ibb.co/qM0Zr8hy/2.jpg",
      "https://i.ibb.co/pBRq6qgD/3.jpg",
      "https://i.ibb.co/3mpvnfG9/4.jpg",
      "https://i.ibb.co/dJfDjbcH/5.jpg",
      "https://i.ibb.co/B5mp3w6N/6.jpg",
      "https://i.ibb.co/35NJSdXx/8.jpg",
      "https://i.ibb.co/s90X4CNz/bathroom-design.jpg",
      "https://i.ibb.co/wrwwGcYS/Bathroom-Tile-Designs.jpg",
      "https://i.ibb.co/8gsnQCkL/hoofd-Tegelwerk.jpg",
      "https://i.ibb.co/S4qN791C/jpg.jpg",
      "https://i.ibb.co/cX8mM2FF/Project-Zandvoort.jpg",
      "https://i.ibb.co/bgzxpV2j/Wij-realiseren-uw-droom-badkamer-Designa-Architectuur.jpg",
    ],
  },

  // NOTE: slug kept to avoid breaking existing links
  {
    slug: "plavuizen-vloer",
    titleKey: "svc_title_gietvloer",
    excerptKey: "svc_excerpt_gietvloer",
    bulletsKeys: ["svc_b_gietvloer_1", "svc_b_gietvloer_2", "svc_b_gietvloer_3", "svc_b_gietvloer_4"],
    introKey: "svc_intro_gietvloer",
    img: "https://i.ibb.co/qFYnC3qh/gietvloer.jpg",
    images: [
      "https://i.ibb.co/HT7pzNvq/6516cebb816a4907c137d26e-IMG-1473-kopie.webp",
      "https://i.ibb.co/7Jz2Z9LY/epoxyvloeren.jpg",
      "https://i.ibb.co/ccYGQBjD/epoxyvloer-keuken-1024x768.jpg",
      "https://i.ibb.co/qFYnC3qh/gietvloer.jpg",
      "https://i.ibb.co/N6BMq8Dn/hoofd-Gietvloer.jpg",
      "https://i.ibb.co/dJ5640Wn/pu-gietvloer.jpg",
    ],
  },

  {
    slug: "schilder",
    titleKey: "svc_title_schilder",
    excerptKey: "svc_excerpt_schilder",
    bulletsKeys: ["svc_b_schilder_1", "svc_b_schilder_2", "svc_b_schilder_3", "svc_b_schilder_4"],
    img: "https://i.ibb.co/YTWmppVT/hoofd-Schilderwerk.jpg",
    images: [
      "https://i.ibb.co/Swksd1jk/image.jpg",
      "https://i.ibb.co/Zpcm4Mv7/3.jpg",
      "https://i.ibb.co/hFfCFZmb/4.jpg",
      "https://i.ibb.co/HpFfB2Fc/5.jpg",
      "https://i.ibb.co/6RThDd8f/Buiten-schilderen-voor-en-na-boeidelen-opknappen.jpg",
      "https://i.ibb.co/nssJw0TH/verticale-of-horizontaleof-schuine-strepen-schilderen.jpg",
    ],
  },

  {
    slug: "stukadoor",
    titleKey: "svc_title_stukadoor",
    excerptKey: "svc_excerpt_stukadoor",
    bulletsKeys: ["svc_b_stukadoor_1", "svc_b_stukadoor_2", "svc_b_stukadoor_3", "svc_b_stukadoor_4"],
    img: "https://i.ibb.co/q2QRxrt/Hoofd-stucwerk.jpg",
    images: [
      "https://i.ibb.co/TDqQSt3X/Faster-Drywall-Finishing-Fine-Homebuilding.jpg",
      "https://i.ibb.co/RGqxZgGJ/hoelang-moet-stucwerk-drogen.webp",
      "https://i.ibb.co/q2QRxrt/Hoofd-stucwerk.jpg",
      "https://i.ibb.co/xSqLLKgr/I-Hate-Spackeling.jpg",
      "https://i.ibb.co/cXYKNrhS/Stucadoorsbedrijf-Peter-Jansen-Stucadoor-in-Stiens-Friesland.jpg",
      "https://i.ibb.co/WpPRZRnj/Stukadoor-gezocht-Prijs-Advies.jpg",
    ],
  },

  {
    slug: "tegelzetter",
    titleKey: "svc_title_tegelzetter",
    excerptKey: "svc_excerpt_tegelzetter",
    bulletsKeys: ["svc_b_tegelzetter_1", "svc_b_tegelzetter_2", "svc_b_tegelzetter_3", "svc_b_tegelzetter_4"],
    img: "https://i.ibb.co/3mpvnfG9/4.jpg",
    images: [
      "https://i.ibb.co/qM0Zr8hy/2.jpg",
      "https://i.ibb.co/pBRq6qgD/3.jpg",
      "https://i.ibb.co/3mpvnfG9/4.jpg",
      "https://i.ibb.co/dJfDjbcH/5.jpg",
      "https://i.ibb.co/B5mp3w6N/6.jpg",
      "https://i.ibb.co/35NJSdXx/8.jpg",
      "https://i.ibb.co/s90X4CNz/bathroom-design.jpg",
      "https://i.ibb.co/wrwwGcYS/Bathroom-Tile-Designs.jpg",
      "https://i.ibb.co/8gsnQCkL/hoofd-Tegelwerk.jpg",
      "https://i.ibb.co/S4qN791C/jpg.jpg",
      "https://i.ibb.co/cX8mM2FF/Project-Zandvoort.jpg",
      "https://i.ibb.co/bgzxpV2j/Wij-realiseren-uw-droom-badkamer-Designa-Architectuur.jpg",
    ],
  },

  {
    slug: "vloerverwarming",
    titleKey: "svc_title_vloerverwarming",
    excerptKey: "svc_excerpt_vloerverwarming",
    bulletsKeys: [
      "svc_b_vloerverwarming_1",
      "svc_b_vloerverwarming_2",
      "svc_b_vloerverwarming_3",
      "svc_b_vloerverwarming_4",
    ],
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop"],
  },

  {
    slug: "wc-renovatie",
    titleKey: "svc_title_wc",
    excerptKey: "svc_excerpt_wc",
    bulletsKeys: ["svc_b_wc_1", "svc_b_wc_2", "svc_b_wc_3", "svc_b_wc_4"],
    img: "https://i.ibb.co/wrwwGcYS/Bathroom-Tile-Designs.jpg",
    images: [
      "https://i.ibb.co/qM0Zr8hy/2.jpg",
      "https://i.ibb.co/pBRq6qgD/3.jpg",
      "https://i.ibb.co/3mpvnfG9/4.jpg",
      "https://i.ibb.co/dJfDjbcH/5.jpg",
      "https://i.ibb.co/B5mp3w6N/6.jpg",
      "https://i.ibb.co/35NJSdXx/8.jpg",
      "https://i.ibb.co/s90X4CNz/bathroom-design.jpg",
      "https://i.ibb.co/wrwwGcYS/Bathroom-Tile-Designs.jpg",
      "https://i.ibb.co/8gsnQCkL/hoofd-Tegelwerk.jpg",
      "https://i.ibb.co/S4qN791C/jpg.jpg",
      "https://i.ibb.co/cX8mM2FF/Project-Zandvoort.jpg",
      "https://i.ibb.co/bgzxpV2j/Wij-realiseren-uw-droom-badkamer-Designa-Architectuur.jpg",
    ],
  },

  {
    slug: "timmerwerk",
    titleKey: "svc_title_timmerwerk",
    excerptKey: "svc_excerpt_timmerwerk",
    bulletsKeys: ["svc_b_timmerwerk_1", "svc_b_timmerwerk_2", "svc_b_timmerwerk_3", "svc_b_timmerwerk_4"],
    introKey: "svc_intro_timmerwerk",
    img: "https://i.ibb.co/4g0wpcFn/hoofd-Timmerwerk-jpg.webp",
    images: [
      "https://i.ibb.co/vCP1gM0q/Go-ralskie-wne-trze.jpg",
      "https://i.ibb.co/4g0wpcFn/hoofd-Timmerwerk-jpg.webp",
      "https://i.ibb.co/7dy8Rh2G/timmerwerk-jpeg.jpg",
      "https://i.ibb.co/WNb5FpXf/Umbau-und-Erweiterung-in-der-Indianersiedlung-Ko-ln-Zollstock-CATALANOQUIEL-Architekten-BDA.jpg",
      "https://i.ibb.co/4gWN3KsY/X.jpg",
      "https://i.ibb.co/cSDWkscJ/ZARNESTI-HOUSE-AIM.jpg",
      "https://i.ibb.co/4wpQTchX/image.jpg",
    ],
  },

  // ------------------ NEW SERVICES (as keys) ------------------

  {
    slug: "sloopwerk",
    titleKey: "svc_title_sloopwerk",
    excerptKey: "svc_excerpt_sloopwerk",
    bulletsKeys: ["svc_b_sloopwerk_1", "svc_b_sloopwerk_2", "svc_b_sloopwerk_3", "svc_b_sloopwerk_4"],
    introKey: "svc_intro_sloopwerk",
    img: "https://i.ibb.co/ycJLF4mp/092091021.jpg",
    images: [
      "https://i.ibb.co/ycJLF4mp/092091021.jpg",
      "https://i.ibb.co/rGWbsRmd/Afbeelding-van-Whats-App-op-2023-08-11-om-15-23-55-1920w-jpg.webp",
      "https://i.ibb.co/XrgHXXHX/d3304cc6-58ff-4283-847c-1fc541724f46.jpg",
      "https://i.ibb.co/35d1qFcx/IMG-1569-jpg.avif",
      "https://i.ibb.co/Gfq1ZxDr/metgroep-footer01.jpg",
      "https://i.ibb.co/zhpQ12YG/renovatiesloopwerkzaamheden-binnenshuis.jpg",
      "https://i.ibb.co/BDwYSGj/sloopbedrijf-in-rotterdam-jpg.webp",
    ],
  },

  {
    slug: "raam-en-deurmontage",
    titleKey: "svc_title_raam_deur",
    excerptKey: "svc_excerpt_raam_deur",
    bulletsKeys: ["svc_b_raam_deur_1", "svc_b_raam_deur_2", "svc_b_raam_deur_3", "svc_b_raam_deur_4"],
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    images: [],
  },

  {
    slug: "keukenmontage",
    titleKey: "svc_title_keuken",
    excerptKey: "svc_excerpt_keuken",
    bulletsKeys: ["svc_b_keuken_1", "svc_b_keuken_2", "svc_b_keuken_3", "svc_b_keuken_4"],
    img: "https://images.unsplash.com/photo-1556912167-f556f1f39df1?q=80&w=1600&auto=format&fit=crop",
    images: [],
  },

  {
    slug: "tuinmuur-en-hekwerk",
    titleKey: "svc_title_tuinmuur",
    excerptKey: "svc_excerpt_tuinmuur",
    bulletsKeys: ["svc_b_tuinmuur_1", "svc_b_tuinmuur_2", "svc_b_tuinmuur_3", "svc_b_tuinmuur_4"],
    img: "https://images.unsplash.com/photo-1595433707802-3c92bda4f7a4?q=80&w=1600&auto=format&fit=crop",
    images: [],
  },

  {
    slug: "op-maat-kastbouwen",
    titleKey: "svc_title_kasten",
    excerptKey: "svc_excerpt_kasten",
    bulletsKeys: ["svc_b_kasten_1", "svc_b_kasten_2", "svc_b_kasten_3", "svc_b_kasten_4"],
    img: "https://images.unsplash.com/photo-1598300053545-d2b42bba0b88?q=80&w=1600&auto=format&fit=crop",
    images: [],
  },

  {
    slug: "loodgieterij",
    titleKey: "svc_title_loodgieterij",
    excerptKey: "svc_excerpt_loodgieterij",
    bulletsKeys: ["svc_b_loodgieterij_1", "svc_b_loodgieterij_2", "svc_b_loodgieterij_3", "svc_b_loodgieterij_4"],
    img: "https://i.ibb.co/x88Q4CpM/hoofd-Loodgieterij.jpg",
    images: [
      "https://i.ibb.co/1fH1Gh1Z/image.jpg",
      "https://i.ibb.co/hxh30yG7/2.jpg",
      "https://i.ibb.co/yc98WLcD/3.jpg",
      "https://i.ibb.co/PyF19Sr/4.jpg",
      "https://i.ibb.co/x88Q4CpM/hoofd-Loodgieterij.jpg",
    ],
  },

  {
    slug: "elektriciteit",
    titleKey: "svc_title_elektriciteit",
    excerptKey: "svc_excerpt_elektriciteit",
    bulletsKeys: ["svc_b_elektriciteit_1", "svc_b_elektriciteit_2", "svc_b_elektriciteit_3", "svc_b_elektriciteit_4"],
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1600&auto=format&fit=crop",
    images: [],
  },

  {
    slug: "traprenovatie",
    titleKey: "svc_title_trap",
    excerptKey: "svc_excerpt_trap",
    bulletsKeys: ["svc_b_trap_1", "svc_b_trap_2", "svc_b_trap_3", "svc_b_trap_4"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://i.ibb.co/j9D7dVNk/2.jpg",
      "https://i.ibb.co/mV03bNvh/Chique-hal-Den-Breejen-Interieur.jpg",
      "https://i.ibb.co/DHRdyjpJ/Hallway-Black-white-wood.jpg",
      "https://i.ibb.co/9M5YVQK/hoofd-Traprenovatie.jpg",
      "https://i.ibb.co/FLnCHtNR/Opentrap.jpg",
      "https://i.ibb.co/CKS9jpcP/Trap-gestoffeerd-met-Cunera-Schaft-sisal-tapijt-in-visgraat.jpg",
      "https://i.ibb.co/Z1JxMmxf/Traprenovatie-met-PVC-trapbekleding-Vloeren-Trappen.jpg",
    ],
  },

  {
    slug: "metselwerk",
    titleKey: "svc_title_metselwerk",
    excerptKey: "svc_excerpt_metselwerk",
    bulletsKeys: ["svc_b_metselwerk_1", "svc_b_metselwerk_2", "svc_b_metselwerk_3", "svc_b_metselwerk_4"],
    img: "https://i.ibb.co/WvR12F9S/hoofd-metselwerk.webp",
    images: [
      "https://i.ibb.co/b56gqW7T/Blokverband-metselwerk.jpg",
      "https://i.ibb.co/WvR12F9S/hoofd-metselwerk.webp",
      "https://i.ibb.co/8SkcPR4/Metselwerk-rond-raam.jpg",
      "https://i.ibb.co/HLfxJcxg/Moderne-jaren-30-woning.jpg",
      "https://i.ibb.co/Rp3YX4hB/Moderne-tweewoonst-B-B.jpg",
      "https://i.ibb.co/KBmpgk7/Mossoux-Architecten.jpg",
    ],
  },
];

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* ---------- Types ---------- */
export type Lang = "nl" | "en" | "de" | "fr" | "tr" | "ar";

const LANGS: Lang[] = ["nl", "en", "de", "fr", "tr", "ar"];
const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as string[]).includes(v);

/* ---------- Dictionary ---------- */
const dict: Record<Lang, Record<string, string>> = {
  nl: {
    /* Nav / UI */
    home: "Home",
    diensten: "Diensten",
    over: "Over ons",
    projecten: "Projecten",
    contact: "Contact",
    cta_quote: "Vrijblijvende offerte",
    call_now: "Bel direct",
    hero_h: "Bouw, renovatie en afbouw in Schiedam",
    hero_p:
      "Laminaat, badkamers, plavuizen, schilderwerk, stukadoor, tegelzetter, vloerverwarming, WC renovatie en timmerwerk. Eén aanspreekpunt, vakwerk gegarandeerd.",
    view_options: "Bekijk onze mogelijkheden",
    read_more: "Lees meer",
    all_services: "Alle diensten",
    recent_projects: "Recente projecten",
    reviews_h: "Wat onze klanten zeggen",
    open_menu: "Menu openen",


    contact_company: "Bedrijfsnaam",
contact_name: "Naam",
contact_email: "E-mail",
contact_phone_optional: "Telefoon (optioneel)",
contact_choose_service: "Kies een dienst (optioneel)",
contact_message_placeholder: "Vertel kort je project (ruimte, maten, wensen)…",
contact_sending: "Versturen…",
contact_send: "Versturen",
contact_prefer_call: "Liever bellen?",
contact_success: "Bedankt! We hebben je aanvraag ontvangen.",
contact_send_error: "Verzenden mislukt. Probeer het opnieuw of bel ons.",


    /* PreHeader */
    ph_trust: "Vakkundig & betrouwbaar",
    ph_region: "Schiedam en regio Rotterdam",
    ph_services: "Badkamer • Tegelzetter • Stukadoor • Timmerwerk",
    ph_floorheat: "Vloerverwarming & plavuizen",
    ph_paint: "Schilderwerk binnen en buiten",

    /* Footer */
    footer_intro: "Allround bouw & renovatie in Schiedam en regio Rotterdam.",
    footer_follow: "Volg ons",
    footer_company: "Bedrijf",
    footer_contact: "Contact",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. Alle rechten voorbehouden.",

    /* Footer service labels (kept for compatibility) */
    svc_laminaat: "Laminaat laten leggen",
    svc_badkamer: "Badkamer renovatie",
    svc_gietvloer: "Gietvloer",
    svc_schilder: "Schilderwerk",
    svc_stukadoor: "Stukadoor",
    svc_tegelzetter: "Tegelzetter",
    svc_vloerverwarming: "Vloerverwarming",
    svc_wc: "WC renovatie",
    svc_timmerwerk: "Timmerwerk",

    /* ------------------ Services (FULL) ------------------ */

    /* Laminaat */
    svc_title_laminaat: "Laminaat laten leggen",
    svc_excerpt_laminaat:
      "Strak gelegd laminaat met perfecte plinten en nette afwerking. Snel, stofarm en volgens afspraak.",
    svc_b_laminaat_1: "Strakke legpatronen (recht, visgraat, Hongaarse punt).",
    svc_b_laminaat_2: "Vakkundig afgewerkte plinten, dilataties en afkitten.",
    svc_b_laminaat_3: "Stofarm, snel en zonder verrassingen.",
    svc_b_laminaat_4: "Scherpe planning en heldere communicatie.",
    svc_intro_laminaat:
      "We adviseren over ondervloeren, patronen en plintprofielen. Ons team werkt netjes met beschermde looproutes en dagelijks opgeruimde werkplek.",

    /* Badkamer */
    svc_title_badkamer: "Badkamer renovatie",
    svc_excerpt_badkamer:
      "Compleet vernieuwde badkamer: tegelwerk, sanitair, leidingwerk en afwerking. Eén aanspreekpunt, duidelijke planning.",
    svc_b_badkamer_1: "Vlak en waterdicht tegelwerk (wanden en vloeren).",
    svc_b_badkamer_2: "Inloopdouche, nisjes, maatwerk betimmering.",
    svc_b_badkamer_3: "Loodgieterij & elektra conform normering.",
    svc_b_badkamer_4: "Heldere planning en garantie op de oplevering.",
    svc_intro_badkamer:
      "We denken mee over indeling, vochtbestendige materialen en onderhoudsgemak. Tijdens het werk blijft je woning netjes en leefbaar.",
    svc_faq_badkamer_q1: "Hoe lang duurt een complete badkamerrenovatie?",
    svc_faq_badkamer_a1:
      "Gemiddeld 10–15 werkdagen, afhankelijk van omvang en levertijden. Je krijgt vooraf een heldere planning.",
    svc_faq_badkamer_q2: "Werken jullie stofarm?",
    svc_faq_badkamer_a2:
      "Ja, we dekken af, zetten stofschotten waar nodig en gebruiken professionele afzuiging.",

    /* Gietvloer (slug blijft plavuizen-vloer) */
    svc_title_gietvloer: "Gietvloer",
    svc_excerpt_gietvloer:
      "Naadloze gietvloer met moderne uitstraling. Slijtvast, onderhoudsvriendelijk en geschikt voor vloerverwarming.",
    svc_b_gietvloer_1: "Naadloos en strak eindresultaat.",
    svc_b_gietvloer_2: "PU- en epoxy gietvloeren mogelijk.",
    svc_b_gietvloer_3: "Geschikt voor vloerverwarming.",
    svc_b_gietvloer_4: "Duurzaam, waterdicht en onderhoudsvriendelijk.",
    svc_intro_gietvloer:
      "Wij adviseren over type gietvloer, kleur en afwerking. De vloer wordt in meerdere lagen aangebracht voor een duurzaam en strak resultaat.",

    /* Schilder */
    svc_title_schilder: "Schilderwerk",
    svc_excerpt_schilder:
      "Strak en duurzaam schilderwerk binnen en buiten. Voorbereiding, reparatie en professionele afwerking.",
    svc_b_schilder_1: "Voorbewerking: ontvetten, schuren, plamuren.",
    svc_b_schilder_2: "A-merk verven, juiste laagopbouw.",
    svc_b_schilder_3: "Strakke snijranden, nette ruimtes.",
    svc_b_schilder_4: "Heldere afspraken en nazorg.",

    /* Stukadoor */
    svc_title_stukadoor: "Stukadoor",
    svc_excerpt_stukadoor:
      "Strak stucwerk klaar voor verf of behang. Wand- en plafondafwerking met oog voor detail.",
    svc_b_stukadoor_1: "Glad stucwerk of lichte structuur.",
    svc_b_stukadoor_2: "Haakse hoeken en nette aansluitingen.",
    svc_b_stukadoor_3: "Snelle droging met juiste ventilatie.",
    svc_b_stukadoor_4: "Schoon opgeleverd en stofbeperkt.",

    /* Tegelzetter */
    svc_title_tegelzetter: "Tegelzetter",
    svc_excerpt_tegelzetter:
      "Nauwkeurig tegelwerk met strakke voegen, in natte ruimtes en woonvloeren. Patronen en grootformaat.",
    svc_b_tegelzetter_1: "Laser-uitlijnen en strak snijwerk.",
    svc_b_tegelzetter_2: "Waterdichte opbouw in badkamers/WC.",
    svc_b_tegelzetter_3: "Grootformaat en visgraat mogelijk.",
    svc_b_tegelzetter_4: "Correcte voeg- en kitafwerking.",

    /* Vloerverwarming */
    svc_title_vloerverwarming: "Vloerverwarming",
    svc_excerpt_vloerverwarming:
      "Comfortabele, energiezuinige vloerverwarming: infrezen, verdelers en druktest. Klaar voor afwerkvloer/tegels.",
    svc_b_vloerverwarming_1: "Infrezen, leggen en aansluiten van groepen.",
    svc_b_vloerverwarming_2: "Waterzijdig inregelen en druktest.",
    svc_b_vloerverwarming_3: "Samen met plavuizen of laminaat mogelijk.",
    svc_b_vloerverwarming_4: "Uitleg over bediening en nazorg.",

    /* WC renovatie */
    svc_title_wc: "WC renovatie",
    svc_excerpt_wc:
      "Compacte renovatie van toilet: tegelwerk, hangtoilet, nis en afwerking. Snel klaar en supernetjes.",
    svc_b_wc_1: "Strak tegelwerk en voeg-/kitafwerking.",
    svc_b_wc_2: "Inbouwreservoir, hangtoilet en nisje.",
    svc_b_wc_3: "Snelle doorlooptijd, stofarm.",
    svc_b_wc_4: "Transparante kosten en planning.",

    /* Timmerwerk */
    svc_title_timmerwerk: "Timmerwerk",
    svc_excerpt_timmerwerk:
      "Maatwerk interieurbouw, plafonds, wanden en reparaties. Strak en duurzaam met oog voor detail.",
    svc_b_timmerwerk_1: "Maatwerk kasten, ombouwen en koofwerk.",
    svc_b_timmerwerk_2: "Egalisatie, aftimmering en afwerking.",
    svc_b_timmerwerk_3: "Passend advies bij materiaalkeuze.",
    svc_b_timmerwerk_4: "Netjes gewerkt: afdekken en opruimen.",
    svc_intro_timmerwerk:
      "Wij maken en monteren maatwerk dat past bij jouw woning. We werken netjes, meten nauwkeurig in en leveren strak af.",

    /* Sloopwerk */
    svc_title_sloopwerk: "Sloopwerk",
    svc_excerpt_sloopwerk:
      "Vakkundig sloopwerk met oog voor veiligheid en nette afvoer. Ideaal voor renovatie en verbouwing.",
    svc_b_sloopwerk_1: "Binnen- en buitensloop (wanden, vloeren, keukens, badkamers).",
    svc_b_sloopwerk_2: "Stofbeperkt werken met afscherming waar nodig.",
    svc_b_sloopwerk_3: "Afvoer van puin en bouwafval.",
    svc_b_sloopwerk_4: "Voorbereiding voor de volgende bouwfase.",
    svc_intro_sloopwerk:
      "We slopen gecontroleerd en veilig. De werkplek wordt netjes achtergelaten en het afval voeren we volgens afspraak af.",

    /* Raam & deur */
    svc_title_raam_deur: "Raam- en deurmontage",
    svc_excerpt_raam_deur:
      "Vakkundige montage van ramen en deuren voor betere isolatie, veiligheid en een strakke afwerking.",
    svc_b_raam_deur_1: "Montage en afstelling van ramen en deuren.",
    svc_b_raam_deur_2: "Goede kierdichting voor comfort en energiebesparing.",
    svc_b_raam_deur_3: "Netjes aftimmeren en afwerken.",
    svc_b_raam_deur_4: "Geschikt voor renovatie en nieuwbouw.",

    /* Keuken */
    svc_title_keuken: "Keukenmontage",
    svc_excerpt_keuken:
      "Professionele keukenmontage: kasten plaatsen, stellen en een strakke, nette oplevering.",
    svc_b_keuken_1: "Monteren en stellen van keukenkasten.",
    svc_b_keuken_2: "Uitsparingen en maatwerk waar nodig.",
    svc_b_keuken_3: "Aansluiten van apparatuur (in overleg).",
    svc_b_keuken_4: "Netjes afgewerkt en klaar voor gebruik.",

    /* Tuinmuur & hekwerk */
    svc_title_tuinmuur: "Tuinmuur en hekwerk",
    svc_excerpt_tuinmuur: "Stevige tuinmuren en hekwerk voor veiligheid, privacy en een nette uitstraling.",
    svc_b_tuinmuur_1: "Metselen of plaatsen van tuinmuur.",
    svc_b_tuinmuur_2: "Plaatsen van hekwerk en poorten.",
    svc_b_tuinmuur_3: "Duurzame materialen en stevige montage.",
    svc_b_tuinmuur_4: "Strakke lijnen en nette afwerking.",

    /* Kasten op maat */
    svc_title_kasten: "Op maat kastbouwen",
    svc_excerpt_kasten: "Maatwerk kasten die perfect passen: strak ontwerp, slimme indeling en duurzame afwerking.",
    svc_b_kasten_1: "Inbouwkasten, garderobekasten en tv-meubels.",
    svc_b_kasten_2: "Slimme indeling en maximale benutting van ruimte.",
    svc_b_kasten_3: "Netjes gemonteerd en strak afgewerkt.",
    svc_b_kasten_4: "Materiaal- en afwerkingsadvies mogelijk.",

    /* Loodgieterij */
    svc_title_loodgieterij: "Loodgieterij",
    svc_excerpt_loodgieterij:
      "Betrouwbaar loodgieterswerk: leidingwerk, sanitair en afvoer. Netjes en volgens afspraak.",
    svc_b_loodgieterij_1: "Leidingwerk voor water en afvoer.",
    svc_b_loodgieterij_2: "Sanitair aansluiten en vervangen.",
    svc_b_loodgieterij_3: "Lekreparaties en onderhoud.",
    svc_b_loodgieterij_4: "Netjes gewerkt en duidelijk overleg.",

    /* Elektriciteit */
    svc_title_elektriciteit: "Elektriciteit",
    svc_excerpt_elektriciteit:
      "Veilige en nette elektrische werkzaamheden: stopcontacten, verlichting en aanpassingen in huis.",
    svc_b_elektriciteit_1: "Aanleggen en verplaatsen van stopcontacten en schakelaars.",
    svc_b_elektriciteit_2: "Verlichting plaatsen (binnen/buiten).",
    svc_b_elektriciteit_3: "Netjes wegwerken van kabels en goten.",
    svc_b_elektriciteit_4: "Veilig werken en duidelijke afspraken.",

    /* Trap */
    svc_title_trap: "Traprenovatie",
    svc_excerpt_trap: "Geef je trap een nieuwe uitstraling met een duurzame en strakke renovatie.",
    svc_b_trap_1: "Overzettreden of nieuwe bekleding mogelijk.",
    svc_b_trap_2: "Strakke afwerking en duurzame materialen.",
    svc_b_trap_3: "Snel uitgevoerd met minimale overlast.",
    svc_b_trap_4: "Moderne uitstraling passend bij je interieur.",

    /* Metselwerk */
    svc_title_metselwerk: "Metselwerk",
    svc_excerpt_metselwerk: "Professioneel metselwerk voor binnen en buiten: nieuw, herstel of aanpassingen.",
    svc_b_metselwerk_1: "Nieuw metselwerk en herstelwerk.",
    svc_b_metselwerk_2: "Strakke voegen en nette afwerking.",
    svc_b_metselwerk_3: "Sterke en duurzame constructies.",
    svc_b_metselwerk_4: "Voor renovatie, aanbouw en tuinwerk.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "Ga naar review",

    review_1: "Super strak tegelwerk in onze badkamer. Heldere communicatie en alles binnen planning. Aanrader!",
    review_2: "Vloerverwarming en plavuizen laten leggen. Netjes gewerkt en duidelijke offerte. Heel tevreden.",
    review_3: "Snel en professioneel. Laminaat en plinten perfect afgewerkt. Dankjewel!",
    review_4: "Stucwerk en schilderwerk boven verwachting. Zeer netjes opgeleverd.",

    why_klusdam: "Waarom kiezen voor Klusdam",
why_b_1: "Premium materialen en A-merk gereedschap voor duurzaam resultaat.",
why_b_2: "Heldere offertes en planning. Geen verrassingen achteraf.",
why_b_3: "Netjes werken: afdekking, stofbeperking en dagelijks schoon.",
why_b_4: "Lokale vakmensen met jaren ervaring in Schiedam en regio Rotterdam.",

examples_work: "Voorbeelden van ons werk",
open_image: "Open afbeelding",
example: "voorbeeld",

quote_help: "Vul je gegevens in. We reageren snel.",
back_all_services: "Terug naar alle diensten",

prev: "Vorige",
next: "Volgende",
reset: "Reset",

contact_inline_intro:
  "Vul je gegevens in. Je ontvangt een bevestiging per e-mail en we nemen snel contact met je op.",
contact_address: "Adres",
contact_phone: "Telefoon",
contact_email_label: "E-mail",

over_title: "Klusdam in Schiedam",
over_intro:
  "Woningrenovatie zonder stress. Wij plannen, coördineren en leveren op met garantie. Eén team voor sloop, leidingwerk, tegel- en timmerwerk, stuken en schilderen.",
over_bullet_1:
  "Afspraak = afspraak. Strakke planning en vaste contactpersoon.",
over_bullet_2:
  "Netjes werken: stofbeperking, afdekking en elke dag opgeruimd.",
over_bullet_3:
  "Duurzame materialen en vakmanschap dat jaren mooi blijft.",
over_location:
  "Standplaats: Von Leibnizstraat 23 a, 3112 XN Schiedam. Werkgebied: Schiedam, Rotterdam, Vlaardingen, Delft en omgeving.",
over_image_alt: "Klusdam team aan het werk",

cat_badkamers: "Badkamers",
cat_vloeren: "Vloeren",
cat_laminaat: "Laminaat",
cat_stuc_schilder: "Stuc/Schilder",
cat_timmerwerk: "Timmerwerk",
cat_traprenovatie: "Traprenovatie",
cat_behangwerk: "Behangwerk",
cat_metselwerk: "Metselwerk",
cat_loodgieterij: "Loodgieterij",
cat_overig: "Overig",

prj_title_badk_1: "Badkamer renovatie – donker marmer",
prj_title_badk_2: "Badkamer – inloopdouche & nis",
prj_title_vloer_1: "Plavuizen grootformaat",
prj_title_lam_1: "Laminaat warm eiken",
prj_title_stuk_1: "Stucwerk en schilder",
prj_title_tim_1: "Timmerwerk – maatwerk kast",
prj_title_trap_1: "Traprenovatie – overzettreden",
prj_title_behang_1: "Behangwerk – patroon",
prj_title_mets_1: "Metselwerk & voeg",
prj_title_lood_1: "Loodgieterij – leidingen & afvoer",
prj_title_overig_1: "Diverse renovatieprojecten",

tag_badkamer: "badkamer",
tag_tegelzetter: "tegelzetter",
tag_inloopdouche: "inloopdouche",
tag_plavuizen: "plavuizen",
tag_laminaat: "laminaat",
tag_stukadoor: "stukadoor",
tag_schilder: "schilder",
tag_timmerwerk: "timmerwerk",
tag_trap: "trap",


  },

  en: {
    /* Nav / UI */
    home: "Home",
    diensten: "Services",
    over: "About us",
    projecten: "Projects",
    contact: "Contact",
    cta_quote: "Free quote",
    call_now: "Call now",
    hero_h: "Construction and renovation in Schiedam",
    hero_p:
      "Laminate floors, bathrooms, tiling, painting, plastering, underfloor heating, toilet renovation and carpentry. One point of contact. Guaranteed craftsmanship.",
    view_options: "Explore our services",
    read_more: "Read more",
    all_services: "All services",
    recent_projects: "Recent projects",
    reviews_h: "What our clients say",

    /* PreHeader */
    ph_trust: "Skilled & reliable",
    ph_region: "Schiedam and the Rotterdam region",
    ph_services: "Bathrooms • Tiling • Plastering • Carpentry",
    ph_floorheat: "Underfloor heating & tile floors",
    ph_paint: "Interior and exterior painting",

    /* Footer */
    footer_intro: "All-round construction & renovation in Schiedam and the Rotterdam region.",
    footer_follow: "Follow us",
    footer_company: "Company",
    footer_contact: "Contact",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. All rights reserved.",

    /* Footer service labels (kept for compatibility) */
    svc_laminaat: "Laminate flooring",
    svc_badkamer: "Bathroom renovation",
    svc_gietvloer: "Seamless floor (gietvloer)",
    svc_schilder: "Painting",
    svc_stukadoor: "Plastering",
    svc_tegelzetter: "Tiling",
    svc_vloerverwarming: "Underfloor heating",
    svc_wc: "Toilet renovation",
    svc_timmerwerk: "Carpentry",

    /* Services */
    svc_title_laminaat: "Laminate flooring",
    svc_excerpt_laminaat: "Neatly installed laminate with perfect skirting and clean finishing. Fast, low-dust and on schedule.",
    svc_b_laminaat_1: "Clean patterns (straight, herringbone, Hungarian point).",
    svc_b_laminaat_2: "Professional skirting, expansion gaps and sealing.",
    svc_b_laminaat_3: "Low-dust, fast and no surprises.",
    svc_b_laminaat_4: "Tight planning and clear communication.",
    svc_intro_laminaat: "We advise on underlays, patterns and skirting profiles. We work cleanly with protected walkways and a tidy site every day.",

    svc_title_badkamer: "Bathroom renovation",
    svc_excerpt_badkamer: "A complete new bathroom: tiling, sanitary, pipework and finishing. One contact person and a clear schedule.",
    svc_b_badkamer_1: "Flat and waterproof tiling (walls and floors).",
    svc_b_badkamer_2: "Walk-in shower, niches and custom boxing-in.",
    svc_b_badkamer_3: "Plumbing & electrical work to standard practice.",
    svc_b_badkamer_4: "Clear planning and reliable handover.",
    svc_intro_badkamer: "We help with layout, moisture-resistant materials and easy maintenance. We keep your home as clean and livable as possible during the work.",
    svc_faq_badkamer_q1: "How long does a full bathroom renovation take?",
    svc_faq_badkamer_a1: "Typically 10–15 working days, depending on scope and delivery times. You receive a clear plan in advance.",
    svc_faq_badkamer_q2: "Do you work low-dust?",
    svc_faq_badkamer_a2: "Yes. We protect areas, use dust barriers where needed and professional extraction.",

    svc_title_gietvloer: "Seamless floor (gietvloer)",
    svc_excerpt_gietvloer: "A seamless floor with a modern look. Wear-resistant, easy to maintain and suitable for underfloor heating.",
    svc_b_gietvloer_1: "Seamless and clean finish.",
    svc_b_gietvloer_2: "PU and epoxy options available.",
    svc_b_gietvloer_3: "Suitable for underfloor heating.",
    svc_b_gietvloer_4: "Durable, waterproof and easy to maintain.",
    svc_intro_gietvloer: "We advise on type, color and finish. The floor is applied in multiple layers for a durable and sleek result.",

    svc_title_schilder: "Painting",
    svc_excerpt_schilder: "Clean and durable painting for inside and outside. Preparation, repairs and professional finishing.",
    svc_b_schilder_1: "Prep work: degrease, sand, fill and repair.",
    svc_b_schilder_2: "Quality paint and correct coating system.",
    svc_b_schilder_3: "Sharp edges and tidy rooms.",
    svc_b_schilder_4: "Clear agreements and aftercare.",

    svc_title_stukadoor: "Plastering",
    svc_excerpt_stukadoor: "Smooth plaster ready for paint or wallpaper. Wall and ceiling finishing with attention to detail.",
    svc_b_stukadoor_1: "Smooth finish or light texture.",
    svc_b_stukadoor_2: "Straight corners and clean transitions.",
    svc_b_stukadoor_3: "Proper drying with correct ventilation.",
    svc_b_stukadoor_4: "Clean handover with minimal dust.",

    svc_title_tegelzetter: "Tiling",
    svc_excerpt_tegelzetter: "Precise tiling with clean grout lines in wet areas and living floors. Patterns and large-format tiles.",
    svc_b_tegelzetter_1: "Laser alignment and clean cuts.",
    svc_b_tegelzetter_2: "Waterproof build-up for bathrooms/toilets.",
    svc_b_tegelzetter_3: "Large-format and herringbone possible.",
    svc_b_tegelzetter_4: "Correct grouting and sealing.",

    svc_title_vloerverwarming: "Underfloor heating",
    svc_excerpt_vloerverwarming: "Comfortable, efficient underfloor heating: milling, manifolds and pressure test. Ready for tiles/finishing floor.",
    svc_b_vloerverwarming_1: "Milling, laying and connecting circuits.",
    svc_b_vloerverwarming_2: "Hydraulic balancing and pressure test.",
    svc_b_vloerverwarming_3: "Works with tiles or laminate.",
    svc_b_vloerverwarming_4: "Clear instructions and aftercare.",

    svc_title_wc: "Toilet renovation",
    svc_excerpt_wc: "Compact toilet renovation: tiling, wall-hung toilet, niche and finishing. Fast and very tidy.",
    svc_b_wc_1: "Clean tiling and grout/seal finish.",
    svc_b_wc_2: "Concealed cistern, wall-hung toilet and niche.",
    svc_b_wc_3: "Fast turnaround with low dust.",
    svc_b_wc_4: "Transparent costs and planning.",

    svc_title_timmerwerk: "Carpentry",
    svc_excerpt_timmerwerk: "Custom interior work, ceilings, walls and repairs. Clean and durable with attention to detail.",
    svc_b_timmerwerk_1: "Custom cabinets, boxing-in and framing.",
    svc_b_timmerwerk_2: "Leveling, finishing and clean edges.",
    svc_b_timmerwerk_3: "Advice on materials and finishes.",
    svc_b_timmerwerk_4: "We protect and clean up properly.",
    svc_intro_timmerwerk: "We build and install custom work that fits your home. Accurate measuring, tidy work and a clean finish.",

    svc_title_sloopwerk: "Demolition work",
    svc_excerpt_sloopwerk: "Professional demolition with safety first and clean waste removal. Ideal for renovations and remodels.",
    svc_b_sloopwerk_1: "Interior and exterior demo (walls, floors, kitchens, bathrooms).",
    svc_b_sloopwerk_2: "Low-dust work with protection when needed.",
    svc_b_sloopwerk_3: "Removal of rubble and construction waste.",
    svc_b_sloopwerk_4: "Preparation for the next phase.",
    svc_intro_sloopwerk: "Controlled and safe demolition. We leave the site tidy and remove waste as agreed.",

    svc_title_raam_deur: "Window & door installation",
    svc_excerpt_raam_deur: "Professional installation of windows and doors for better insulation, safety and a clean finish.",
    svc_b_raam_deur_1: "Installation and adjustment of windows and doors.",
    svc_b_raam_deur_2: "Good sealing for comfort and energy savings.",
    svc_b_raam_deur_3: "Neat trim work and finishing.",
    svc_b_raam_deur_4: "Suitable for renovation and new build.",

    svc_title_keuken: "Kitchen installation",
    svc_excerpt_keuken: "Professional kitchen fitting: assembling, leveling and a clean handover.",
    svc_b_keuken_1: "Assemble and level kitchen cabinets.",
    svc_b_keuken_2: "Cut-outs and custom work where needed.",
    svc_b_keuken_3: "Connect appliances (by agreement).",
    svc_b_keuken_4: "Neatly finished and ready to use.",

    svc_title_tuinmuur: "Garden wall & fencing",
    svc_excerpt_tuinmuur: "Strong garden walls and fencing for safety, privacy and a neat look.",
    svc_b_tuinmuur_1: "Build or place a garden wall.",
    svc_b_tuinmuur_2: "Install fencing and gates.",
    svc_b_tuinmuur_3: "Durable materials and solid mounting.",
    svc_b_tuinmuur_4: "Straight lines and clean finishing.",

    svc_title_kasten: "Custom cabinets",
    svc_excerpt_kasten: "Custom cabinets that fit perfectly: clean design, smart layout and durable finishing.",
    svc_b_kasten_1: "Built-in wardrobes, closets and TV units.",
    svc_b_kasten_2: "Smart layout and maximum use of space.",
    svc_b_kasten_3: "Neatly installed and finished.",
    svc_b_kasten_4: "Advice on materials and finishes.",

    svc_title_loodgieterij: "Plumbing",
    svc_excerpt_loodgieterij: "Reliable plumbing: pipes, sanitary and drainage. Tidy work and clear agreements.",
    svc_b_loodgieterij_1: "Water supply and drainage pipework.",
    svc_b_loodgieterij_2: "Install and replace sanitary.",
    svc_b_loodgieterij_3: "Leak repairs and maintenance.",
    svc_b_loodgieterij_4: "Tidy work and clear communication.",

    svc_title_elektriciteit: "Electrical work",
    svc_excerpt_elektriciteit: "Safe and tidy electrical work: sockets, lighting and home adjustments.",
    svc_b_elektriciteit_1: "Install/move sockets and switches.",
    svc_b_elektriciteit_2: "Install lighting (indoor/outdoor).",
    svc_b_elektriciteit_3: "Neatly route cables and conduits.",
    svc_b_elektriciteit_4: "Safe work and clear agreements.",

    svc_title_trap: "Stair renovation",
    svc_excerpt_trap: "Give your stairs a new look with a durable and clean renovation.",
    svc_b_trap_1: "Stair overlays or new covering possible.",
    svc_b_trap_2: "Clean finish and durable materials.",
    svc_b_trap_3: "Fast execution with minimal disruption.",
    svc_b_trap_4: "Modern look that fits your interior.",

    svc_title_metselwerk: "Masonry",
    svc_excerpt_metselwerk: "Professional masonry for inside and outside: new work, repairs or adjustments.",
    svc_b_metselwerk_1: "New brickwork and repair work.",
    svc_b_metselwerk_2: "Clean joints and neat finish.",
    svc_b_metselwerk_3: "Strong and durable structures.",
    svc_b_metselwerk_4: "For renovation, extensions and garden work.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "Go to review",
 
    review_1: "Excellent tiling work in our bathroom. Clear communication and finished on schedule. Highly recommended!",
    review_2: "Underfloor heating and tiles installed. Clean work and a clear quote. Very satisfied.",
    review_3: "Fast and professional. Laminate and skirting boards finished perfectly. Thank you!",
    review_4: "Plastering and painting exceeded expectations. Very neatly delivered.",

    why_klusdam: "Why choose Klusdam",
why_b_1: "Premium materials and professional-grade tools for durable results.",
why_b_2: "Clear quotes and planning. No surprises afterwards.",
why_b_3: "Clean working method: protection, dust reduction, and daily cleanup.",
why_b_4: "Local professionals with years of experience in Schiedam and the Rotterdam region.",

examples_work: "Examples of our work",
open_image: "Open image",
example: "example",

quote_help: "Fill in your details. We will respond quickly.",
back_all_services: "Back to all services",

prev: "Previous",
next: "Next",
reset: "Reset",

contact_company: "Company name",
contact_name: "Name",
contact_email: "Email",
contact_phone_optional: "Phone (optional)",
contact_choose_service: "Choose a service (optional)",
contact_message_placeholder: "Briefly describe your project (room, sizes, wishes)…",
contact_sending: "Sending…",
contact_send: "Send",
contact_prefer_call: "Prefer to call?",
contact_success: "Thank you! We have received your request.",
contact_send_error: "Sending failed. Please try again or call us.",

contact_inline_intro:
  "Fill in your details. You will receive a confirmation email and we will contact you shortly.",
contact_address: "Address",
contact_phone: "Phone",
contact_email_label: "Email",


over_title: "Klusdam in Schiedam",
over_intro:
  "Stress-free home renovation. We plan, coordinate, and deliver with guarantee. One team for demolition, plumbing, tiling, carpentry, plastering, and painting.",
over_bullet_1:
  "Clear agreements. Tight planning and one fixed point of contact.",
over_bullet_2:
  "Clean work: dust control, protection, and daily cleanup.",
over_bullet_3:
  "Durable materials and craftsmanship that lasts for years.",
over_location:
  "Based at Von Leibnizstraat 23 a, 3112 XN Schiedam. Active in Schiedam, Rotterdam, Vlaardingen, Delft and surroundings.",
over_image_alt: "Klusdam team at work",

cat_badkamers: "Bathrooms",
cat_vloeren: "Floors",
cat_laminaat: "Laminate",
cat_stuc_schilder: "Plaster/Paint",
cat_timmerwerk: "Carpentry",
cat_traprenovatie: "Stair renovation",
cat_behangwerk: "Wallpaper",
cat_metselwerk: "Masonry",
cat_loodgieterij: "Plumbing",
cat_overig: "Other",

prj_title_badk_1: "Bathroom renovation – dark marble",
prj_title_badk_2: "Bathroom – walk-in shower & niche",
prj_title_vloer_1: "Large-format tiles",
prj_title_lam_1: "Warm oak laminate",
prj_title_stuk_1: "Plastering and painting",
prj_title_tim_1: "Carpentry – custom cabinet",
prj_title_trap_1: "Stair renovation – overlay treads",
prj_title_behang_1: "Wallpaper – pattern",
prj_title_mets_1: "Masonry & pointing",
prj_title_lood_1: "Plumbing – pipes & drainage",
prj_title_overig_1: "Various renovation projects",

tag_badkamer: "bathroom",
tag_tegelzetter: "tiler",
tag_inloopdouche: "walk-in shower",
tag_plavuizen: "tiles",
tag_laminaat: "laminate",
tag_stukadoor: "plasterer",
tag_schilder: "painter",
tag_timmerwerk: "carpentry",
tag_trap: "stairs",


  },

  de: {
    /* Nav / UI */
    home: "Startseite",
    diensten: "Leistungen",
    over: "Über uns",
    projecten: "Projekte",
    contact: "Kontakt",
    cta_quote: "Unverbindliches Angebot",
    call_now: "Jetzt anrufen",
    hero_h: "Bau und Renovierung in Schiedam",
    hero_p:
      "Laminat, Bäder, Fliesen, Maler- und Putzarbeiten, Fußbodenheizung, WC-Renovierung und Tischlerarbeiten. Ein Ansprechpartner. Handwerk mit Garantie.",
    view_options: "Unsere Leistungen ansehen",
    read_more: "Mehr lesen",
    all_services: "Alle Leistungen",
    recent_projects: "Aktuelle Projekte",
    reviews_h: "Was unsere Kunden sagen",

    /* PreHeader */
    ph_trust: "Fachgerecht & zuverlässig",
    ph_region: "Schiedam und Region Rotterdam",
    ph_services: "Bad • Fliesen • Putz • Tischlerarbeiten",
    ph_floorheat: "Fußbodenheizung & Fliesen",
    ph_paint: "Innen- und Außenanstrich",

    /* Footer */
    footer_intro: "Allround Bau & Renovierung in Schiedam und Region Rotterdam.",
    footer_follow: "Folgen Sie uns",
    footer_company: "Unternehmen",
    footer_contact: "Kontakt",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. Alle Rechte vorbehalten.",

    /* Footer service labels */
    svc_laminaat: "Laminat verlegen",
    svc_badkamer: "Badrenovierung",
    svc_gietvloer: "Fugenloser Boden",
    svc_schilder: "Malerarbeiten",
    svc_stukadoor: "Putzarbeiten",
    svc_tegelzetter: "Fliesenlegen",
    svc_vloerverwarming: "Fußbodenheizung",
    svc_wc: "WC-Renovierung",
    svc_timmerwerk: "Tischlerarbeiten",

    /* Services */
    svc_title_laminaat: "Laminat verlegen",
    svc_excerpt_laminaat: "Sauber verlegtes Laminat mit perfekten Leisten und sauberer Ausführung. Schnell, staubarm und zuverlässig.",
    svc_b_laminaat_1: "Gerade, Fischgrät oder Ungarischer Punkt möglich.",
    svc_b_laminaat_2: "Leisten, Dehnfugen und Abdichten fachgerecht.",
    svc_b_laminaat_3: "Staubarm, schnell und ohne Überraschungen.",
    svc_b_laminaat_4: "Klare Planung und Kommunikation.",
    svc_intro_laminaat: "Beratung zu Trittschalldämmung, Muster und Leisten. Saubere Baustelle mit geschützten Laufwegen und täglichem Aufräumen.",

    svc_title_badkamer: "Badrenovierung",
    svc_excerpt_badkamer: "Komplette Badrenovierung: Fliesen, Sanitär, Leitungen und Finish. Ein Ansprechpartner, klare Planung.",
    svc_b_badkamer_1: "Ebenes und wasserdichtes Fliesenbild (Wand/Boden).",
    svc_b_badkamer_2: "Walk-in-Dusche, Nischen und Verkleidungen nach Maß.",
    svc_b_badkamer_3: "Sanitär & Elektro fachgerecht.",
    svc_b_badkamer_4: "Klare Planung und saubere Übergabe.",
    svc_intro_badkamer: "Wir helfen bei Aufteilung, feuchtigkeitsbeständigen Materialien und Pflegeleichtigkeit. Wir arbeiten so, dass die Wohnung möglichst nutzbar bleibt.",
    svc_faq_badkamer_q1: "Wie lange dauert eine komplette Badrenovierung?",
    svc_faq_badkamer_a1: "Meist 10–15 Arbeitstage, je nach Umfang und Lieferzeiten. Sie erhalten vorher einen klaren Plan.",
    svc_faq_badkamer_q2: "Arbeiten Sie staubarm?",
    svc_faq_badkamer_a2: "Ja. Wir decken ab, nutzen Staubschutzwände wenn nötig und professionelle Absaugung.",

    svc_title_gietvloer: "Fugenloser Boden",
    svc_excerpt_gietvloer: "Fugenloser Boden mit modernem Look. Strapazierfähig, pflegeleicht und für Fußbodenheizung geeignet.",
    svc_b_gietvloer_1: "Fugenlos und sehr sauber.",
    svc_b_gietvloer_2: "PU- und Epoxid-Varianten möglich.",
    svc_b_gietvloer_3: "Für Fußbodenheizung geeignet.",
    svc_b_gietvloer_4: "Langlebig, wasserdicht und pflegeleicht.",
    svc_intro_gietvloer: "Beratung zu Typ, Farbe und Versiegelung. Mehrschichtaufbau für ein dauerhaftes Ergebnis.",

    svc_title_schilder: "Malerarbeiten",
    svc_excerpt_schilder: "Saubere, langlebige Malerarbeiten innen und außen. Vorbereitung, Reparatur und Profi-Finish.",
    svc_b_schilder_1: "Vorarbeit: entfetten, schleifen, spachteln.",
    svc_b_schilder_2: "Qualitätsfarbe und richtiger Schichtaufbau.",
    svc_b_schilder_3: "Saubere Kanten, ordentliche Räume.",
    svc_b_schilder_4: "Klare Absprachen und Nachsorge.",

    svc_title_stukadoor: "Putzarbeiten",
    svc_excerpt_stukadoor: "Glatter Putz bereit für Farbe oder Tapete. Wand- und Deckenfinish mit Blick fürs Detail.",
    svc_b_stukadoor_1: "Glatt oder leichte Struktur.",
    svc_b_stukadoor_2: "Scharfe Ecken und saubere Anschlüsse.",
    svc_b_stukadoor_3: "Richtiges Trocknen durch gute Lüftung.",
    svc_b_stukadoor_4: "Saubere Übergabe, wenig Staub.",

    svc_title_tegelzetter: "Fliesenlegen",
    svc_excerpt_tegelzetter: "Präzises Fliesenbild mit sauberen Fugen in Nassräumen und Wohnbereichen. Muster und Großformat.",
    svc_b_tegelzetter_1: "Laser-Ausrichtung und saubere Schnitte.",
    svc_b_tegelzetter_2: "Wasserdichter Aufbau in Bad/WC.",
    svc_b_tegelzetter_3: "Großformat und Fischgrät möglich.",
    svc_b_tegelzetter_4: "Richtig verfugt und abgedichtet.",

    svc_title_vloerverwarming: "Fußbodenheizung",
    svc_excerpt_vloerverwarming: "Komfortable, effiziente Fußbodenheizung: Fräsen, Verteiler und Drucktest. Fertig für Fliesen/Boden.",
    svc_b_vloerverwarming_1: "Fräsen, verlegen und Kreise anschließen.",
    svc_b_vloerverwarming_2: "Hydraulischer Abgleich und Drucktest.",
    svc_b_vloerverwarming_3: "Mit Fliesen oder Laminat kombinierbar.",
    svc_b_vloerverwarming_4: "Bedienung erklärt, Nachsorge inklusive.",

    svc_title_wc: "WC-Renovierung",
    svc_excerpt_wc: "Kompakte WC-Renovierung: Fliesen, Hänge-WC, Nische und Finish. Schnell und sehr ordentlich.",
    svc_b_wc_1: "Sauberes Fliesenbild und Fugen/Silikon.",
    svc_b_wc_2: "Unterputz-Spülkasten, Hänge-WC und Nische.",
    svc_b_wc_3: "Schnelle Ausführung, staubarm.",
    svc_b_wc_4: "Transparente Kosten und Planung.",

    svc_title_timmerwerk: "Tischlerarbeiten",
    svc_excerpt_timmerwerk: "Innenausbau nach Maß, Decken, Wände und Reparaturen. Sauber und langlebig.",
    svc_b_timmerwerk_1: "Schränke nach Maß, Verkleidungen und Rahmen.",
    svc_b_timmerwerk_2: "Ausgleich, Verkleidung und Finish.",
    svc_b_timmerwerk_3: "Material- und Oberflächenberatung.",
    svc_b_timmerwerk_4: "Abdecken und sauber hinterlassen.",
    svc_intro_timmerwerk: "Maßarbeit passend zur Wohnung. Genaues Aufmaß, saubere Montage und ordentliche Übergabe.",

    svc_title_sloopwerk: "Abbrucharbeiten",
    svc_excerpt_sloopwerk: "Fachgerechter Abbruch mit Fokus auf Sicherheit und sauberer Entsorgung. Ideal für Umbau und Renovierung.",
    svc_b_sloopwerk_1: "Innen- und Außenabbruch (Wände, Böden, Küchen, Bäder).",
    svc_b_sloopwerk_2: "Staubarm mit Schutzmaßnahmen.",
    svc_b_sloopwerk_3: "Abtransport von Bauschutt und Abfall.",
    svc_b_sloopwerk_4: "Vorbereitung für den nächsten Bauabschnitt.",
    svc_intro_sloopwerk: "Kontrolliert und sicher. Wir hinterlassen die Baustelle ordentlich und entsorgen nach Absprache.",

    svc_title_raam_deur: "Fenster- und Türenmontage",
    svc_excerpt_raam_deur: "Fachgerechte Montage von Fenstern und Türen für bessere Dämmung, Sicherheit und sauberes Finish.",
    svc_b_raam_deur_1: "Montage und Einstellung von Fenstern und Türen.",
    svc_b_raam_deur_2: "Gute Abdichtung für Komfort und Energieersparnis.",
    svc_b_raam_deur_3: "Saubere Verkleidung und Abschlussarbeiten.",
    svc_b_raam_deur_4: "Für Renovierung und Neubau geeignet.",

    svc_title_keuken: "Küchenmontage",
    svc_excerpt_keuken: "Professionelle Küchenmontage: Schränke montieren, ausrichten und sauber übergeben.",
    svc_b_keuken_1: "Küchenschränke montieren und ausrichten.",
    svc_b_keuken_2: "Ausschnitte und Maßarbeit bei Bedarf.",
    svc_b_keuken_3: "Geräte anschließen (nach Absprache).",
    svc_b_keuken_4: "Sauber fertiggestellt und einsatzbereit.",

    svc_title_tuinmuur: "Gartenmauer & Zaun",
    svc_excerpt_tuinmuur: "Stabile Gartenmauern und Zäune für Sicherheit, Privatsphäre und ein ordentliches Erscheinungsbild.",
    svc_b_tuinmuur_1: "Gartenmauer mauern oder setzen.",
    svc_b_tuinmuur_2: "Zaun und Tore montieren.",
    svc_b_tuinmuur_3: "Langlebige Materialien und feste Montage.",
    svc_b_tuinmuur_4: "Gerade Linien und sauberes Finish.",

    svc_title_kasten: "Schränke nach Maß",
    svc_excerpt_kasten: "Schränke nach Maß: klares Design, clevere Aufteilung und langlebiges Finish.",
    svc_b_kasten_1: "Einbauschränke, Kleiderschränke und TV-Möbel.",
    svc_b_kasten_2: "Optimale Raumnutzung durch clevere Aufteilung.",
    svc_b_kasten_3: "Sauber montiert und abgeschlossen.",
    svc_b_kasten_4: "Beratung zu Material und Oberfläche.",

    svc_title_loodgieterij: "Sanitär/Installateur",
    svc_excerpt_loodgieterij: "Zuverlässige Sanitärarbeiten: Leitungen, Sanitär und Abfluss. Sauber und termintreu.",
    svc_b_loodgieterij_1: "Wasser- und Abflussleitungen.",
    svc_b_loodgieterij_2: "Sanitär anschließen und ersetzen.",
    svc_b_loodgieterij_3: "Leckreparatur und Wartung.",
    svc_b_loodgieterij_4: "Saubere Arbeit und klare Abstimmung.",

    svc_title_elektriciteit: "Elektroarbeiten",
    svc_excerpt_elektriciteit: "Sichere und saubere Elektroarbeiten: Steckdosen, Beleuchtung und Anpassungen im Haus.",
    svc_b_elektriciteit_1: "Steckdosen/Schalter installieren oder versetzen.",
    svc_b_elektriciteit_2: "Beleuchtung innen/außen installieren.",
    svc_b_elektriciteit_3: "Kabel sauber verlegen.",
    svc_b_elektriciteit_4: "Sicher arbeiten, klare Absprachen.",

    svc_title_trap: "Treppenrenovierung",
    svc_excerpt_trap: "Geben Sie Ihrer Treppe einen neuen Look – langlebig und sauber renoviert.",
    svc_b_trap_1: "Aufsatzstufen oder neue Verkleidung möglich.",
    svc_b_trap_2: "Sauberes Finish und langlebige Materialien.",
    svc_b_trap_3: "Schnell mit wenig Störung.",
    svc_b_trap_4: "Moderner Look passend zum Interior.",

    svc_title_metselwerk: "Mauerwerk",
    svc_excerpt_metselwerk: "Professionelles Mauerwerk innen und außen: neu, Reparatur oder Anpassung.",
    svc_b_metselwerk_1: "Neues Mauerwerk und Reparaturen.",
    svc_b_metselwerk_2: "Saubere Fugen und Abschluss.",
    svc_b_metselwerk_3: "Stark und langlebig.",
    svc_b_metselwerk_4: "Für Renovierung, Anbau und Garten.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "Zur Bewertung",

    review_1: "Sehr saubere Fliesenarbeit im Badezimmer. Klare Kommunikation und pünktlich fertig. Sehr zu empfehlen!",
    review_2: "Fußbodenheizung und Fliesen verlegt. Saubere Arbeit und transparentes Angebot. Sehr zufrieden.",
    review_3: "Schnell und professionell. Laminat und Sockelleisten perfekt verarbeitet. Vielen Dank!",
    review_4: "Putz- und Malerarbeiten übertrafen die Erwartungen. Sehr ordentlich ausgeführt.",

    why_klusdam: "Warum Klusdam wählen",
why_b_1: "Premium-Materialien und Markenwerkzeuge für langlebige Ergebnisse.",
why_b_2: "Klare Angebote und Planung. Keine Überraschungen im Nachhinein.",
why_b_3: "Sauberes Arbeiten: Abdecken, Staubreduzierung und tägliche Reinigung.",
why_b_4: "Lokale Fachkräfte mit jahrelanger Erfahrung in Schiedam und Umgebung.",

examples_work: "Beispiele unserer Arbeit",
open_image: "Bild öffnen",
example: "Beispiel",

quote_help: "Geben Sie Ihre Daten ein. Wir melden uns schnell.",
back_all_services: "Zurück zu allen Leistungen",

prev: "Zurück",
next: "Weiter",
reset: "Zurücksetzen",

contact_company: "Firmenname",
contact_name: "Name",
contact_email: "E-Mail",
contact_phone_optional: "Telefon (optional)",
contact_choose_service: "Leistung wählen (optional)",
contact_message_placeholder: "Beschreiben Sie kurz Ihr Projekt (Raum, Maße, Wünsche)…",
contact_sending: "Wird gesendet…",
contact_send: "Senden",
contact_prefer_call: "Lieber anrufen?",
contact_success: "Danke! Wir haben Ihre Anfrage erhalten.",
contact_send_error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",

contact_inline_intro:
  "Geben Sie Ihre Daten ein. Sie erhalten eine Bestätigung per E-Mail und wir melden uns zeitnah.",
contact_address: "Adresse",
contact_phone: "Telefon",
contact_email_label: "E-Mail",


over_title: "Klusdam in Schiedam",
over_intro:
  "Stressfreie Hausrenovierung. Wir planen, koordinieren und liefern mit Garantie. Ein Team für Abbruch, Sanitär, Fliesen, Tischler-, Putz- und Malerarbeiten.",
over_bullet_1:
  "Absprachen werden eingehalten. Klare Planung und ein fester Ansprechpartner.",
over_bullet_2:
  "Sauberes Arbeiten: Staubreduzierung, Abdeckung und tägliche Reinigung.",
over_bullet_3:
  "Langlebige Materialien und Handwerksqualität.",
over_location:
  "Standort: Von Leibnizstraat 23 a, 3112 XN Schiedam. Einsatzgebiet: Schiedam, Rotterdam, Vlaardingen, Delft und Umgebung.",
over_image_alt: "Klusdam Team bei der Arbeit",


cat_badkamers: "Badezimmer",
cat_vloeren: "Böden",
cat_laminaat: "Laminat",
cat_stuc_schilder: "Putz/Malerarbeiten",
cat_timmerwerk: "Tischlerarbeiten",
cat_traprenovatie: "Treppenrenovierung",
cat_behangwerk: "Tapezierarbeiten",
cat_metselwerk: "Mauerwerk",
cat_loodgieterij: "Sanitär",
cat_overig: "Sonstiges",

prj_title_badk_1: "Badezimmersanierung – dunkler Marmor",
prj_title_badk_2: "Badezimmer – begehbare Dusche & Nische",
prj_title_vloer_1: "Großformatige Fliesen",
prj_title_lam_1: "Laminat in warmer Eiche",
prj_title_stuk_1: "Putz- und Malerarbeiten",
prj_title_tim_1: "Tischlerarbeit – Maßanfertigung",
prj_title_trap_1: "Treppenrenovierung – Aufsatzstufen",
prj_title_behang_1: "Tapezierarbeit – Muster",
prj_title_mets_1: "Mauerwerk & Verfugung",
prj_title_lood_1: "Sanitär – Leitungen & Abfluss",
prj_title_overig_1: "Verschiedene Renovierungsprojekte",

tag_badkamer: "Badezimmer",
tag_tegelzetter: "Fliesenleger",
tag_inloopdouche: "begehbare Dusche",
tag_plavuizen: "Fliesen",
tag_laminaat: "Laminat",
tag_stukadoor: "Stuckateur",
tag_schilder: "Maler",
tag_timmerwerk: "Tischler",
tag_trap: "Treppe",


  },

  fr: {
    /* Nav / UI */
    home: "Accueil",
    diensten: "Services",
    over: "À propos",
    projecten: "Projets",
    contact: "Contact",
    cta_quote: "Devis gratuit",
    call_now: "Appeler",
    hero_h: "Construction et rénovation à Schiedam",
    hero_p:
      "Sols stratifiés, salles de bain, carrelage, peinture, plâtrerie, chauffage au sol, rénovation WC et menuiserie. Un seul interlocuteur. Travail garanti.",
    view_options: "Découvrez nos services",
    read_more: "Lire plus",
    all_services: "Tous les services",
    recent_projects: "Projets récents",
    reviews_h: "Ce que disent nos clients",

    /* PreHeader */
    ph_trust: "Professionnel et fiable",
    ph_region: "Schiedam et région de Rotterdam",
    ph_services: "Salle de bain • Carrelage • Plâtrerie • Menuiserie",
    ph_floorheat: "Chauffage au sol & carrelage",
    ph_paint: "Peinture intérieure et extérieure",

    /* Footer */
    footer_intro: "Construction & rénovation à Schiedam et dans la région de Rotterdam.",
    footer_follow: "Suivez-nous",
    footer_company: "Entreprise",
    footer_contact: "Contact",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. Tous droits réservés.",

    /* Footer service labels */
    svc_laminaat: "Pose de stratifié",
    svc_badkamer: "Rénovation de salle de bain",
    svc_gietvloer: "Sol coulé",
    svc_schilder: "Peinture",
    svc_stukadoor: "Plâtrerie",
    svc_tegelzetter: "Carrelage",
    svc_vloerverwarming: "Chauffage au sol",
    svc_wc: "Rénovation WC",
    svc_timmerwerk: "Menuiserie",

    /* Services */
    svc_title_laminaat: "Pose de stratifié",
    svc_excerpt_laminaat: "Stratifié posé proprement avec plinthes parfaites et finitions nettes. Rapide, peu de poussière et conforme au planning.",
    svc_b_laminaat_1: "Pose droite, chevrons ou pointe de Hongrie.",
    svc_b_laminaat_2: "Plinthes, joints de dilatation et finitions soignées.",
    svc_b_laminaat_3: "Travail rapide, peu de poussière, sans surprises.",
    svc_b_laminaat_4: "Planning clair et bonne communication.",
    svc_intro_laminaat: "Conseils sur sous-couche, motifs et plinthes. Chantier propre avec zones protégées et rangement quotidien.",

    svc_title_badkamer: "Rénovation de salle de bain",
    svc_excerpt_badkamer: "Rénovation complète : carrelage, sanitaires, plomberie et finitions. Un interlocuteur, planning clair.",
    svc_b_badkamer_1: "Carrelage plat et étanche (murs et sols).",
    svc_b_badkamer_2: "Douche à l’italienne, niches et habillage sur mesure.",
    svc_b_badkamer_3: "Plomberie & électricité réalisées proprement.",
    svc_b_badkamer_4: "Planning clair et réception soignée.",
    svc_intro_badkamer: "Nous aidons sur l’agencement, les matériaux adaptés à l’humidité et l’entretien. Nous travaillons proprement pour limiter la gêne.",
    svc_faq_badkamer_q1: "Combien de temps dure une rénovation complète de salle de bain ?",
    svc_faq_badkamer_a1: "En moyenne 10 à 15 jours ouvrés selon le projet et les délais de livraison. Vous recevez un planning clair avant le début.",
    svc_faq_badkamer_q2: "Travaillez-vous avec peu de poussière ?",
    svc_faq_badkamer_a2: "Oui. Protection, cloisons anti-poussière si nécessaire et aspiration professionnelle.",

    svc_title_gietvloer: "Sol coulé (gietvloer)",
    svc_excerpt_gietvloer: "Sol sans joints au style moderne. Résistant, facile à entretenir et compatible chauffage au sol.",
    svc_b_gietvloer_1: "Résultat lisse et sans joints.",
    svc_b_gietvloer_2: "Options PU et époxy possibles.",
    svc_b_gietvloer_3: "Compatible chauffage au sol.",
    svc_b_gietvloer_4: "Durable, étanche et facile à nettoyer.",
    svc_intro_gietvloer: "Conseils sur le type, la couleur et la finition. Application en plusieurs couches pour un résultat durable.",

    svc_title_schilder: "Peinture",
    svc_excerpt_schilder: "Peinture nette et durable intérieur/extérieur. Préparation, réparations et finitions professionnelles.",
    svc_b_schilder_1: "Préparation : dégraisser, poncer, reboucher.",
    svc_b_schilder_2: "Peintures de qualité et bonne méthode.",
    svc_b_schilder_3: "Bords nets et pièces propres.",
    svc_b_schilder_4: "Accords clairs et suivi.",

    svc_title_stukadoor: "Plâtrerie",
    svc_excerpt_stukadoor: "Enduit lisse prêt pour peinture ou papier peint. Finition murs et plafonds soignée.",
    svc_b_stukadoor_1: "Lisse ou légère structure.",
    svc_b_stukadoor_2: "Angles droits et raccords nets.",
    svc_b_stukadoor_3: "Séchage correct avec bonne ventilation.",
    svc_b_stukadoor_4: "Chantier propre, poussière limitée.",

    svc_title_tegelzetter: "Carrelage",
    svc_excerpt_tegelzetter: "Carrelage précis avec joints réguliers, pièces humides et sols. Motifs et grands formats.",
    svc_b_tegelzetter_1: "Alignement laser et découpes nettes.",
    svc_b_tegelzetter_2: "Système étanche pour salle de bain/WC.",
    svc_b_tegelzetter_3: "Grands formats et chevrons possibles.",
    svc_b_tegelzetter_4: "Joints et silicone réalisés proprement.",

    svc_title_vloerverwarming: "Chauffage au sol",
    svc_excerpt_vloerverwarming: "Chauffage au sol confortable et économe : rainurage, collecteurs et test de pression. Prêt pour la finition.",
    svc_b_vloerverwarming_1: "Rainurage, pose et raccordement des circuits.",
    svc_b_vloerverwarming_2: "Réglage hydraulique et test de pression.",
    svc_b_vloerverwarming_3: "Compatible carrelage ou stratifié.",
    svc_b_vloerverwarming_4: "Explications d’utilisation et suivi.",

    svc_title_wc: "Rénovation WC",
    svc_excerpt_wc: "Rénovation compacte : carrelage, WC suspendu, niche et finitions. Rapide et très propre.",
    svc_b_wc_1: "Carrelage et finitions joints/silicone.",
    svc_b_wc_2: "Bâti-support, WC suspendu et niche.",
    svc_b_wc_3: "Rapide, avec peu de poussière.",
    svc_b_wc_4: "Coûts et planning transparents.",

    svc_title_timmerwerk: "Menuiserie",
    svc_excerpt_timmerwerk: "Aménagement intérieur sur mesure, plafonds, cloisons et réparations. Travail net et durable.",
    svc_b_timmerwerk_1: "Meubles sur mesure, coffrages et habillages.",
    svc_b_timmerwerk_2: "Mise à niveau et finitions.",
    svc_b_timmerwerk_3: "Conseils matériaux et finitions.",
    svc_b_timmerwerk_4: "Protection et rangement.",
    svc_intro_timmerwerk: "Fabrication et pose sur mesure. Mesures précises, chantier propre et finition soignée.",

    svc_title_sloopwerk: "Démolition",
    svc_excerpt_sloopwerk: "Démolition professionnelle, sécurité et évacuation propre des déchets. Idéal pour rénovation.",
    svc_b_sloopwerk_1: "Démolition intérieure/extérieure (murs, sols, cuisines, salles de bain).",
    svc_b_sloopwerk_2: "Réduction de poussière avec protections.",
    svc_b_sloopwerk_3: "Évacuation gravats et déchets.",
    svc_b_sloopwerk_4: "Préparation de l’étape suivante.",
    svc_intro_sloopwerk: "Démolition contrôlée et sûre. Chantier propre et déchets évacués selon accord.",

    svc_title_raam_deur: "Pose de fenêtres et portes",
    svc_excerpt_raam_deur: "Pose professionnelle pour meilleure isolation, sécurité et finitions nettes.",
    svc_b_raam_deur_1: "Pose et réglage fenêtres/portes.",
    svc_b_raam_deur_2: "Bonne étanchéité pour confort et économies.",
    svc_b_raam_deur_3: "Habillage et finitions propres.",
    svc_b_raam_deur_4: "Rénovation ou neuf.",

    svc_title_keuken: "Pose de cuisine",
    svc_excerpt_keuken: "Pose de cuisine : montage, réglage et livraison propre.",
    svc_b_keuken_1: "Montage et mise à niveau des caissons.",
    svc_b_keuken_2: "Découpes et ajustements sur mesure.",
    svc_b_keuken_3: "Raccordement appareils (selon accord).",
    svc_b_keuken_4: "Finitions nettes, prêt à l’usage.",

    svc_title_tuinmuur: "Muret de jardin & clôture",
    svc_excerpt_tuinmuur: "Murets et clôtures solides pour sécurité, intimité et belle finition.",
    svc_b_tuinmuur_1: "Maçonner ou poser un muret.",
    svc_b_tuinmuur_2: "Pose de clôtures et portails.",
    svc_b_tuinmuur_3: "Matériaux durables et fixation solide.",
    svc_b_tuinmuur_4: "Lignes droites et finition nette.",

    svc_title_kasten: "Placards sur mesure",
    svc_excerpt_kasten: "Placards sur mesure : design net, rangement intelligent et finition durable.",
    svc_b_kasten_1: "Placards intégrés, dressing, meuble TV.",
    svc_b_kasten_2: "Optimisation de l’espace.",
    svc_b_kasten_3: "Pose et finition soignées.",
    svc_b_kasten_4: "Conseils matériaux et finitions.",

    svc_title_loodgieterij: "Plomberie",
    svc_excerpt_loodgieterij: "Plomberie fiable : tuyauterie, sanitaires et évacuation. Travail propre.",
    svc_b_loodgieterij_1: "Réseau d’eau et évacuation.",
    svc_b_loodgieterij_2: "Pose/remplacement sanitaires.",
    svc_b_loodgieterij_3: "Réparation de fuites et entretien.",
    svc_b_loodgieterij_4: "Travail propre, communication claire.",

    svc_title_elektriciteit: "Électricité",
    svc_excerpt_elektriciteit: "Travaux électriques sûrs : prises, éclairage et adaptations de la maison.",
    svc_b_elektriciteit_1: "Installer/déplacer prises et interrupteurs.",
    svc_b_elektriciteit_2: "Installer l’éclairage (int./ext.).",
    svc_b_elektriciteit_3: "Câbles et gaines posés proprement.",
    svc_b_elektriciteit_4: "Sécurité et accords clairs.",

    svc_title_trap: "Rénovation d’escalier",
    svc_excerpt_trap: "Donnez un nouveau look à votre escalier avec une rénovation durable et nette.",
    svc_b_trap_1: "Marches rapportées ou nouveau revêtement.",
    svc_b_trap_2: "Finition propre, matériaux durables.",
    svc_b_trap_3: "Rapide, gêne minimale.",
    svc_b_trap_4: "Style moderne adapté à l’intérieur.",

    svc_title_metselwerk: "Maçonnerie",
    svc_excerpt_metselwerk: "Maçonnerie pro intérieur/extérieur : neuf, réparation ou modification.",
    svc_b_metselwerk_1: "Maçonnerie neuve et réparation.",
    svc_b_metselwerk_2: "Joints propres, finition nette.",
    svc_b_metselwerk_3: "Structures solides et durables.",
    svc_b_metselwerk_4: "Pour rénovation, extension et jardin.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "Voir l’avis",

    review_1: "Carrelage de salle de bain très soigné. Communication claire et travail terminé dans les délais. Recommandé !",
    review_2: "Chauffage au sol et carrelage installés. Travail propre et devis clair. Très satisfait.",
    review_3: "Rapide et professionnel. Stratifié et plinthes parfaitement finis. Merci !",
    review_4: "Travaux de plâtrerie et de peinture au-delà de nos attentes. Résultat très propre.",


    why_klusdam: "Pourquoi choisir Klusdam",
why_b_1: "Matériaux premium et outils professionnels pour un résultat durable.",
why_b_2: "Devis et planning clairs. Aucune surprise après coup.",
why_b_3: "Travail soigné : protection, réduction de la poussière et nettoyage quotidien.",
why_b_4: "Artisans locaux avec des années d’expérience à Schiedam et dans la région de Rotterdam.",

examples_work: "Exemples de nos réalisations",
open_image: "Ouvrir l’image",
example: "exemple",

quote_help: "Remplissez vos coordonnées. Nous répondons rapidement.",
back_all_services: "Retour à tous les services",

prev: "Précédent",
next: "Suivant",
reset: "Réinitialiser",


contact_company: "Nom de l’entreprise",
contact_name: "Nom",
contact_email: "E-mail",
contact_phone_optional: "Téléphone (optionnel)",
contact_choose_service: "Choisir un service (optionnel)",
contact_message_placeholder: "Décrivez brièvement votre projet (pièce, dimensions, souhaits)…",
contact_sending: "Envoi…",
contact_send: "Envoyer",
contact_prefer_call: "Vous préférez appeler ?",
contact_success: "Merci ! Nous avons bien reçu votre demande.",
contact_send_error: "Échec de l’envoi. Réessayez ou appelez-nous.",

contact_inline_intro:
  "Remplissez vos coordonnées. Vous recevrez une confirmation par e-mail et nous vous contacterons rapidement.",
contact_address: "Adresse",
contact_phone: "Téléphone",
contact_email_label: "E-mail",


over_title: "Klusdam à Schiedam",
over_intro:
  "Rénovation de maison sans stress. Nous planifions, coordonnons et livrons avec garantie. Une seule équipe pour démolition, plomberie, carrelage, menuiserie, plâtrerie et peinture.",
over_bullet_1:
  "Engagements clairs et un seul interlocuteur.",
over_bullet_2:
  "Travail propre : limitation de la poussière et nettoyage quotidien.",
over_bullet_3:
  "Matériaux durables et savoir-faire de qualité.",
over_location:
  "Basé à Von Leibnizstraat 23 a, 3112 XN Schiedam. Zone d’intervention : Schiedam, Rotterdam, Vlaardingen, Delft et environs.",
over_image_alt: "Équipe Klusdam au travail",


cat_badkamers: "Salles de bain",
cat_vloeren: "Sols",
cat_laminaat: "Stratifié",
cat_stuc_schilder: "Plâtre/Peinture",
cat_timmerwerk: "Menuiserie",
cat_traprenovatie: "Rénovation d’escalier",
cat_behangwerk: "Papier peint",
cat_metselwerk: "Maçonnerie",
cat_loodgieterij: "Plomberie",
cat_overig: "Autres",

prj_title_badk_1: "Rénovation de salle de bain – marbre foncé",
prj_title_badk_2: "Salle de bain – douche à l’italienne & niche",
prj_title_vloer_1: "Carrelage grand format",
prj_title_lam_1: "Stratifié chêne chaleureux",
prj_title_stuk_1: "Plâtrage et peinture",
prj_title_tim_1: "Menuiserie – armoire sur mesure",
prj_title_trap_1: "Rénovation d’escalier – marches rapportées",
prj_title_behang_1: "Papier peint – motif",
prj_title_mets_1: "Maçonnerie & jointoiement",
prj_title_lood_1: "Plomberie – conduites & évacuation",
prj_title_overig_1: "Divers projets de rénovation",

tag_badkamer: "salle de bain",
tag_tegelzetter: "carreleur",
tag_inloopdouche: "douche à l’italienne",
tag_plavuizen: "carrelage",
tag_laminaat: "stratifié",
tag_stukadoor: "plâtrier",
tag_schilder: "peintre",
tag_timmerwerk: "menuiserie",
tag_trap: "escalier",


  },

  tr: {
    /* Nav / UI */
    home: "Ana sayfa",
    diensten: "Hizmetler",
    over: "Hakkımızda",
    projecten: "Projeler",
    contact: "İletişim",
    cta_quote: "Ücretsiz teklif",
    call_now: "Hemen ara",
    hero_h: "Schiedam’da inşaat ve renovasyon",
    hero_p:
      "Laminat, banyo, fayans, boya, alçı, yerden ısıtma, WC yenileme ve marangozluk. Tek muhatap. Garantili işçilik.",
    view_options: "Hizmetlerimize göz atın",
    read_more: "Devamını oku",
    all_services: "Tüm hizmetler",
    recent_projects: "Son projeler",
    reviews_h: "Müşterilerimiz ne diyor",

    /* PreHeader */
    ph_trust: "Uzman ve güvenilir",
    ph_region: "Schiedam ve Rotterdam bölgesi",
    ph_services: "Banyo • Fayans • Alçı • Marangozluk",
    ph_floorheat: "Yerden ısıtma ve fayans",
    ph_paint: "İç ve dış boya",

    /* Footer */
    footer_intro: "Schiedam ve Rotterdam bölgesinde inşaat ve renovasyon.",
    footer_follow: "Bizi takip edin",
    footer_company: "Şirket",
    footer_contact: "İletişim",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. Tüm hakları saklıdır.",

    /* Footer service labels */
    svc_laminaat: "Laminat döşeme",
    svc_badkamer: "Banyo renovasyonu",
    svc_gietvloer: "Derzsiz zemin",
    svc_schilder: "Boya",
    svc_stukadoor: "Alçı",
    svc_tegelzetter: "Fayans",
    svc_vloerverwarming: "Yerden ısıtma",
    svc_wc: "WC yenileme",
    svc_timmerwerk: "Marangozluk",

    /* Services */
    svc_title_laminaat: "Laminat döşeme",
    svc_excerpt_laminaat: "Düzgün döşenen laminat, mükemmel süpürgelik ve temiz bitiş. Hızlı, az toz ve planlı.",
    svc_b_laminaat_1: "Düz, balıksırtı ve benzeri desenler.",
    svc_b_laminaat_2: "Süpürgelik, genleşme payı ve silikon/kaplama bitişi.",
    svc_b_laminaat_3: "Az toz, hızlı ve sürpriz yok.",
    svc_b_laminaat_4: "Net plan ve iletişim.",
    svc_intro_laminaat: "Alt şilte, desen ve süpürgelik konusunda öneri sunarız. Çalışma alanını korur, her gün düzenli teslim ederiz.",

    svc_title_badkamer: "Banyo renovasyonu",
    svc_excerpt_badkamer: "Komple banyo yenileme: fayans, vitrifiye, tesisat ve bitiş. Tek muhatap, net plan.",
    svc_b_badkamer_1: "Düz ve suya dayanıklı fayans (duvar/zemin).",
    svc_b_badkamer_2: "Duş, nişler ve ölçüye göre kaplama.",
    svc_b_badkamer_3: "Tesisat ve elektrik işleri düzenli şekilde.",
    svc_b_badkamer_4: "Net plan ve düzgün teslim.",
    svc_intro_badkamer: "Planlama, neme dayanıklı malzeme ve kolay bakım konusunda destek oluruz. Evinizi mümkün olduğunca yaşanabilir tutarız.",
    svc_faq_badkamer_q1: "Tam banyo renovasyonu ne kadar sürer?",
    svc_faq_badkamer_a1: "Genelde 10–15 iş günü (işin kapsamı ve malzeme tedarikine bağlı). Önceden net bir plan verilir.",
    svc_faq_badkamer_q2: "Az tozlu çalışıyor musunuz?",
    svc_faq_badkamer_a2: "Evet. Alanı koruruz, gerekirse toz bariyeri kurar ve profesyonel emiş kullanırız.",

    svc_title_gietvloer: "Derzsiz zemin (gietvloer)",
    svc_excerpt_gietvloer: "Modern görünümlü derzsiz zemin. Dayanıklı, kolay temizlenir ve yerden ısıtmaya uygundur.",
    svc_b_gietvloer_1: "Derzsiz ve temiz sonuç.",
    svc_b_gietvloer_2: "PU ve epoksi seçenekleri.",
    svc_b_gietvloer_3: "Yerden ısıtmaya uygun.",
    svc_b_gietvloer_4: "Uzun ömürlü, su geçirmez, bakımı kolay.",
    svc_intro_gietvloer: "Zemin tipi, renk ve kaplama konusunda danışmanlık. Dayanıklı sonuç için çok katmanlı uygulama.",

    svc_title_schilder: "Boya",
    svc_excerpt_schilder: "İç ve dış mekan için temiz ve dayanıklı boya işleri. Hazırlık, onarım ve profesyonel bitiş.",
    svc_b_schilder_1: "Hazırlık: temizleme, zımpara, dolgu.",
    svc_b_schilder_2: "Kaliteli boya ve doğru kat sistemi.",
    svc_b_schilder_3: "Düz çizgiler, temiz alan.",
    svc_b_schilder_4: "Net anlaşma ve sonrası destek.",

    svc_title_stukadoor: "Alçı (sıva)",
    svc_excerpt_stukadoor: "Boya veya duvar kağıdı için hazır düzgün sıva. Duvar ve tavan bitişi özenli.",
    svc_b_stukadoor_1: "Düz sıva veya hafif doku.",
    svc_b_stukadoor_2: "Köşeler ve birleşimler düzgün.",
    svc_b_stukadoor_3: "Doğru havalandırma ile kuruma.",
    svc_b_stukadoor_4: "Temiz teslim, az toz.",

    svc_title_tegelzetter: "Fayans döşeme",
    svc_excerpt_tegelzetter: "Islak hacim ve zeminlerde düzgün derzli fayans. Desen ve büyük ebat mümkün.",
    svc_b_tegelzetter_1: "Lazer hizalama ve düzgün kesim.",
    svc_b_tegelzetter_2: "Banyo/WC’de su yalıtımlı sistem.",
    svc_b_tegelzetter_3: "Büyük ebat ve balıksırtı mümkün.",
    svc_b_tegelzetter_4: "Derz ve silikon bitişi doğru.",

    svc_title_vloerverwarming: "Yerden ısıtma",
    svc_excerpt_vloerverwarming: "Konforlu ve verimli: kanallama, kollektör ve basınç testi. Kaplama için hazır.",
    svc_b_vloerverwarming_1: "Kanallama, döşeme ve bağlantı.",
    svc_b_vloerverwarming_2: "Dengeleme ve basınç testi.",
    svc_b_vloerverwarming_3: "Fayans veya laminat ile uyumlu.",
    svc_b_vloerverwarming_4: "Kullanım anlatımı ve destek.",

    svc_title_wc: "WC yenileme",
    svc_excerpt_wc: "Kompakt WC yenileme: fayans, asma klozet, niş ve bitiş. Hızlı ve çok temiz.",
    svc_b_wc_1: "Fayans ve derz/silikon bitişi.",
    svc_b_wc_2: "Gömme rezervuar, asma klozet ve niş.",
    svc_b_wc_3: "Hızlı, az toz.",
    svc_b_wc_4: "Şeffaf maliyet ve plan.",

    svc_title_timmerwerk: "Marangozluk",
    svc_excerpt_timmerwerk: "Ölçüye göre iç mekan işleri, tavan/duvar ve onarımlar. Düzgün ve dayanıklı.",
    svc_b_timmerwerk_1: "Özel dolap, kaplama ve kutulama.",
    svc_b_timmerwerk_2: "Düzeltme ve bitiş işleri.",
    svc_b_timmerwerk_3: "Malzeme ve bitiş önerisi.",
    svc_b_timmerwerk_4: "Koruma ve temizlik.",
    svc_intro_timmerwerk: "Evinize uygun ölçüye göre üretim ve montaj. Hassas ölçüm, temiz iş ve düzgün teslim.",

    svc_title_sloopwerk: "Yıkım (söküm) işleri",
    svc_excerpt_sloopwerk: "Güvenli ve kontrollü söküm/yıkım, temiz atık tahliyesi. Renovasyon için ideal.",
    svc_b_sloopwerk_1: "İç/dış söküm (duvar, zemin, mutfak, banyo).",
    svc_b_sloopwerk_2: "Gerekirse toz önleme ve koruma.",
    svc_b_sloopwerk_3: "Moloz ve inşaat atığı tahliyesi.",
    svc_b_sloopwerk_4: "Bir sonraki aşama için hazırlık.",
    svc_intro_sloopwerk: "Kontrollü ve güvenli çalışırız. Alanı temiz bırakır, atıkları anlaşmaya göre çıkarırız.",

    svc_title_raam_deur: "Pencere ve kapı montajı",
    svc_excerpt_raam_deur: "Daha iyi izolasyon, güvenlik ve temiz bitiş için profesyonel montaj.",
    svc_b_raam_deur_1: "Montaj ve ayar işlemleri.",
    svc_b_raam_deur_2: "Sızdırmazlık ile konfor ve enerji tasarrufu.",
    svc_b_raam_deur_3: "Kaplama ve bitiş işleri temiz.",
    svc_b_raam_deur_4: "Renovasyon ve yeni yapıya uygun.",

    svc_title_keuken: "Mutfak montajı",
    svc_excerpt_keuken: "Profesyonel montaj: dolap kurulumu, ayar ve temiz teslim.",
    svc_b_keuken_1: "Dolapları kurma ve ayarlama.",
    svc_b_keuken_2: "Gerekirse kesim ve ölçü işi.",
    svc_b_keuken_3: "Cihaz bağlantıları (anlaşmaya bağlı).",
    svc_b_keuken_4: "Temiz bitiş, kullanıma hazır.",

    svc_title_tuinmuur: "Bahçe duvarı ve çit",
    svc_excerpt_tuinmuur: "Güvenlik ve gizlilik için sağlam bahçe duvarı ve çit işleri.",
    svc_b_tuinmuur_1: "Bahçe duvarı örme/kurma.",
    svc_b_tuinmuur_2: "Çit ve kapı montajı.",
    svc_b_tuinmuur_3: "Dayanıklı malzeme, sağlam montaj.",
    svc_b_tuinmuur_4: "Düz çizgiler, temiz bitiş.",

    svc_title_kasten: "Ölçüye göre dolap",
    svc_excerpt_kasten: "Evinize uygun özel dolap: temiz tasarım, akıllı düzen ve dayanıklı bitiş.",
    svc_b_kasten_1: "Gömme dolap, gardırop, TV ünitesi.",
    svc_b_kasten_2: "Alanı maksimum kullanma.",
    svc_b_kasten_3: "Temiz montaj ve bitiş.",
    svc_b_kasten_4: "Malzeme ve kaplama danışmanlığı.",

    svc_title_loodgieterij: "Tesisat",
    svc_excerpt_loodgieterij: "Güvenilir tesisat: boru, vitrifiye ve gider. Temiz ve planlı.",
    svc_b_loodgieterij_1: "Su ve gider tesisatı.",
    svc_b_loodgieterij_2: "Vitrifiye montaj/değişim.",
    svc_b_loodgieterij_3: "Kaçak onarımı ve bakım.",
    svc_b_loodgieterij_4: "Temiz iş, net iletişim.",

    svc_title_elektriciteit: "Elektrik",
    svc_excerpt_elektriciteit: "Güvenli ve düzenli elektrik işleri: priz, aydınlatma ve düzenlemeler.",
    svc_b_elektriciteit_1: "Priz ve anahtar ekleme/taşıma.",
    svc_b_elektriciteit_2: "Aydınlatma montajı (iç/dış).",
    svc_b_elektriciteit_3: "Kablo ve kanalları düzgün gizleme.",
    svc_b_elektriciteit_4: "Güvenli çalışma, net anlaşma.",

    svc_title_trap: "Merdiven renovasyonu",
    svc_excerpt_trap: "Merdiveninize dayanıklı ve şık bir yenileme ile yeni görünüm kazandırın.",
    svc_b_trap_1: "Kaplama basamak veya yeni kaplama seçenekleri.",
    svc_b_trap_2: "Düzgün bitiş, dayanıklı malzeme.",
    svc_b_trap_3: "Hızlı, az rahatsızlık.",
    svc_b_trap_4: "İç mekâna uygun modern görünüm.",

    svc_title_metselwerk: "Duvar/örgü (tuğla) işi",
    svc_excerpt_metselwerk: "İç ve dış mekân için profesyonel duvar örme: yeni, onarım veya değişiklik.",
    svc_b_metselwerk_1: "Yeni ve onarım duvar işleri.",
    svc_b_metselwerk_2: "Düz derz ve temiz bitiş.",
    svc_b_metselwerk_3: "Sağlam ve uzun ömürlü.",
    svc_b_metselwerk_4: "Renovasyon, ek yapı ve bahçe işleri.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "Yoruma git",

    review_1: "Banyomuzda çok düzgün fayans işi yapıldı. İletişim netti ve zamanında teslim edildi. Kesinlikle tavsiye ederim.",
    review_2: "Yerden ısıtma ve fayans döşendi. Temiz çalışıldı ve teklif çok açıktı. Çok memnunuz.",
    review_3: "Hızlı ve profesyonel. Laminat ve süpürgelikler kusursuz yapıldı. Teşekkürler!",
    review_4: "Alçı ve boya işleri beklentimizin üzerindeydi. Çok temiz teslim edildi.",


    why_klusdam: "Neden Klusdam’ı seçmelisiniz",
why_b_1: "Uzun ömürlü sonuçlar için kaliteli malzemeler ve profesyonel ekipman.",
why_b_2: "Net teklifler ve planlama. Sonradan sürpriz yok.",
why_b_3: "Temiz çalışma: koruma, toz azaltma ve günlük temizlik.",
why_b_4: "Schiedam ve Rotterdam bölgesinde yılların deneyimine sahip yerel ustalar.",

examples_work: "Yaptığımız işlerden örnekler",
open_image: "Görseli aç",
example: "örnek",

quote_help: "Bilgilerinizi girin. En kısa sürede dönüş yaparız.",
back_all_services: "Tüm hizmetlere geri dön",

prev: "Önceki",
next: "Sonraki",
reset: "Sıfırla",


contact_company: "Şirket adı",
contact_name: "Ad",
contact_email: "E-posta",
contact_phone_optional: "Telefon (isteğe bağlı)",
contact_choose_service: "Hizmet seçin (isteğe bağlı)",
contact_message_placeholder: "Projenizi kısaca anlatın (oda, ölçüler, istekler)…",
contact_sending: "Gönderiliyor…",
contact_send: "Gönder",
contact_prefer_call: "Aramayı mı tercih edersiniz?",
contact_success: "Teşekkürler! Talebinizi aldık.",
contact_send_error: "Gönderme başarısız oldu. Tekrar deneyin veya bizi arayın.",


contact_inline_intro:
  "Bilgilerinizi girin. E-posta ile onay alacaksınız ve kısa sürede sizinle iletişime geçeceğiz.",
contact_address: "Adres",
contact_phone: "Telefon",
contact_email_label: "E-posta",


over_title: "Schiedam’da Klusdam",
over_intro:
  "Stres olmadan ev yenileme. Planlar, koordine eder ve garantiyle teslim ederiz. Yıkım, tesisat, fayans, marangozluk, sıva ve boya için tek ekip.",
over_bullet_1:
  "Söz verdik mi yaparız. Net planlama ve tek muhatap.",
over_bullet_2:
  "Temiz çalışma: toz kontrolü ve günlük temizlik.",
over_bullet_3:
  "Uzun ömürlü malzemeler ve kaliteli işçilik.",
over_location:
  "Merkez: Von Leibnizstraat 23 a, 3112 XN Schiedam. Hizmet alanı: Schiedam, Rotterdam, Vlaardingen, Delft ve çevresi.",
over_image_alt: "Klusdam ekibi çalışırken",


cat_badkamers: "Banyolar",
cat_vloeren: "Zeminler",
cat_laminaat: "Laminat",
cat_stuc_schilder: "Sıva/Boya",
cat_timmerwerk: "Marangozluk",
cat_traprenovatie: "Merdiven yenileme",
cat_behangwerk: "Duvar kağıdı",
cat_metselwerk: "Duvar örme",
cat_loodgieterij: "Tesisat",
cat_overig: "Diğer",

prj_title_badk_1: "Banyo yenileme – koyu mermer",
prj_title_badk_2: "Banyo – duşakabin & niş",
prj_title_vloer_1: "Büyük ebat seramik",
prj_title_lam_1: "Sıcak meşe laminat",
prj_title_stuk_1: "Sıva ve boya",
prj_title_tim_1: "Marangozluk – özel dolap",
prj_title_trap_1: "Merdiven yenileme – kaplama basamak",
prj_title_behang_1: "Duvar kağıdı – desen",
prj_title_mets_1: "Duvar örme & derz",
prj_title_lood_1: "Tesisat – borular & gider",
prj_title_overig_1: "Çeşitli tadilat projeleri",

tag_badkamer: "banyo",
tag_tegelzetter: "fayans ustası",
tag_inloopdouche: "duş",
tag_plavuizen: "seramik",
tag_laminaat: "laminat",
tag_stukadoor: "sıva ustası",
tag_schilder: "boyacı",
tag_timmerwerk: "marangozluk",
tag_trap: "merdiven",


  },

  ar: {
    /* Nav / UI */
    home: "الرئيسية",
    diensten: "الخدمات",
    over: "من نحن",
    projecten: "المشاريع",
    contact: "اتصل بنا",
    cta_quote: "عرض مجاني",
    call_now: "اتصل الآن",
    hero_h: "أعمال البناء والتجديد في سخيدام",
    hero_p:
      "أرضيات، حمامات، تبليط، دهان، لياسة، تدفئة أرضية، تجديد مرحاض وأعمال نجارة. جهة واحدة للتواصل. جودة مضمونة.",
    view_options: "اطّلع على خدماتنا",
    read_more: "اقرأ المزيد",
    all_services: "كل الخدمات",
    recent_projects: "أحدث المشاريع",
    reviews_h: "ماذا يقول عملاؤنا",

    /* PreHeader */
    ph_trust: "احترافية وموثوقية",
    ph_region: "سخيدام ومنطقة روتردام",
    ph_services: "حمامات • تبليط • لياسة • نجارة",
    ph_floorheat: "تدفئة أرضية وبلاط",
    ph_paint: "دهان داخلي وخارجي",

    /* Footer */
    footer_intro: "أعمال بناء وتجديد في سخيدام ومنطقة روتردام.",
    footer_follow: "تابعنا",
    footer_company: "الشركة",
    footer_contact: "التواصل",
    footer_address_line1: "Von Leibnizstraat 23 a",
    footer_address_line2: "3112 XN Schiedam",
    footer_rights: "Klusdam. جميع الحقوق محفوظة.",

    /* Footer service labels */
    svc_laminaat: "تركيب أرضيات لامينيت",
    svc_badkamer: "تجديد الحمام",
    svc_gietvloer: "أرضية سائلة",
    svc_schilder: "دهان",
    svc_stukadoor: "لياسة",
    svc_tegelzetter: "تبليط",
    svc_vloerverwarming: "تدفئة أرضية",
    svc_wc: "تجديد المرحاض",
    svc_timmerwerk: "أعمال نجارة",

    /* Services */
    svc_title_laminaat: "تركيب أرضيات لامينيت",
    svc_excerpt_laminaat: "تركيب لامينيت بشكل مرتب مع سكرتنغ (بلاينت) وتشطيب نظيف. سريع وبأقل غبار وضمن الموعد.",
    svc_b_laminaat_1: "أنماط تركيب: مستقيم، عظم سمكة، وغيرها.",
    svc_b_laminaat_2: "تشطيب السكرتنغ وفواصل التمدد والعزل بشكل صحيح.",
    svc_b_laminaat_3: "عمل سريع وبأقل غبار وبدون مفاجآت.",
    svc_b_laminaat_4: "خطة واضحة وتواصل مباشر.",
    svc_intro_laminaat: "نساعدك في اختيار العازل السفلي والنمط والسكرتنغ. نعمل بشكل نظيف مع حماية الممرات وتنظيف يومي.",

    svc_title_badkamer: "تجديد الحمام",
    svc_excerpt_badkamer: "تجديد كامل: تبليط، صحيات، تمديدات مياه وصرف وتشطيب. جهة واحدة للتواصل وخطة واضحة.",
    svc_b_badkamer_1: "تبليط مستوٍ ومقاوم للماء (جدران وأرضيات).",
    svc_b_badkamer_2: "دش، نيش (تجويفات)، وتغليفات حسب المقاس.",
    svc_b_badkamer_3: "سباكة وكهرباء بشكل آمن ومنظم.",
    svc_b_badkamer_4: "خطة عمل واضحة وتسليم مرتب.",
    svc_intro_badkamer: "نساعد في التصميم والمواد المقاومة للرطوبة وسهولة التنظيف. نحافظ على نظافة البيت وتقليل الإزعاج قدر الإمكان.",
    svc_faq_badkamer_q1: "كم يستغرق تجديد حمام كامل؟",
    svc_faq_badkamer_a1: "عادةً 10–15 يوم عمل حسب حجم المشروع وتوفر المواد. تحصل على خطة واضحة مسبقاً.",
    svc_faq_badkamer_q2: "هل تعملون بأقل غبار؟",
    svc_faq_badkamer_a2: "نعم. نقوم بالتغطية ووضع حواجز الغبار عند الحاجة واستخدام شفط احترافي.",

    svc_title_gietvloer: "أرضية سائلة (Gietvloer)",
    svc_excerpt_gietvloer: "أرضية بدون فواصل بمظهر عصري. قوية وسهلة التنظيف ومناسبة للتدفئة الأرضية.",
    svc_b_gietvloer_1: "نتيجة ناعمة وبدون فواصل.",
    svc_b_gietvloer_2: "إمكانية PU أو إيبوكسي.",
    svc_b_gietvloer_3: "مناسبة للتدفئة الأرضية.",
    svc_b_gietvloer_4: "متينة، مقاومة للماء وسهلة الصيانة.",
    svc_intro_gietvloer: "نساعدك في اختيار النوع واللون والطبقة النهائية. التنفيذ يكون على عدة طبقات لنتيجة قوية وجميلة.",

    svc_title_schilder: "دهان",
    svc_excerpt_schilder: "دهان داخلي وخارجي بشكل مرتب ودائم. تجهيز السطح، إصلاحات وتشطيب احترافي.",
    svc_b_schilder_1: "تحضير: تنظيف، صنفرة، معجون وإصلاح.",
    svc_b_schilder_2: "مواد دهان جيدة ونظام طبقات صحيح.",
    svc_b_schilder_3: "حواف نظيفة وغرف مرتبة.",
    svc_b_schilder_4: "اتفاق واضح وخدمة بعد التنفيذ.",

    svc_title_stukadoor: "لياسة (قصارة)",
    svc_excerpt_stukadoor: "لياسة ناعمة جاهزة للدهان أو ورق الجدران. تشطيب جدران وسقوف بدقة.",
    svc_b_stukadoor_1: "لياسة ناعمة أو ملمس خفيف.",
    svc_b_stukadoor_2: "زوايا مستقيمة ووصلات مرتبة.",
    svc_b_stukadoor_3: "جفاف صحيح مع تهوية مناسبة.",
    svc_b_stukadoor_4: "تسليم نظيف وبأقل غبار.",

    svc_title_tegelzetter: "تبليط",
    svc_excerpt_tegelzetter: "تبليط دقيق مع فواصل مرتبة للحمامات والأرضيات. أنماط وبلاط كبير الحجم.",
    svc_b_tegelzetter_1: "تسوية بالليزر وقص نظيف.",
    svc_b_tegelzetter_2: "عزل مائي للحمام/المرحاض.",
    svc_b_tegelzetter_3: "بلاط كبير الحجم وأنماط ممكنة.",
    svc_b_tegelzetter_4: "حشو الفواصل والسيلكون بشكل صحيح.",

    svc_title_vloerverwarming: "تدفئة أرضية",
    svc_excerpt_vloerverwarming: "تدفئة أرضية مريحة وموفرة: تفريز، مانيفولد واختبار ضغط. جاهزة للبلاط/التشطيب.",
    svc_b_vloerverwarming_1: "تفريز، تركيب وربط الدوائر.",
    svc_b_vloerverwarming_2: "موازنة الدوائر واختبار ضغط.",
    svc_b_vloerverwarming_3: "تعمل مع البلاط أو اللامينيت.",
    svc_b_vloerverwarming_4: "شرح التشغيل وخدمة بعد التنفيذ.",

    svc_title_wc: "تجديد المرحاض",
    svc_excerpt_wc: "تجديد سريع: تبليط، كرسي معلّق، نيش وتشطيب. سريع ونظيف جداً.",
    svc_b_wc_1: "تبليط وتشطيب الفواصل والسيلكون.",
    svc_b_wc_2: "خزان مخفي، كرسي معلّق ونيش.",
    svc_b_wc_3: "تنفيذ سريع وبأقل غبار.",
    svc_b_wc_4: "تكلفة وخطة واضحة.",

    svc_title_timmerwerk: "أعمال نجارة",
    svc_excerpt_timmerwerk: "نجارة داخلية حسب الطلب، أسقف وجدران وإصلاحات. عمل مرتب ودائم.",
    svc_b_timmerwerk_1: "خزائن حسب الطلب وتغليفات وكونسترَكشن.",
    svc_b_timmerwerk_2: "تسوية وتشطيب نظيف.",
    svc_b_timmerwerk_3: "نصيحة مواد وتشطيب.",
    svc_b_timmerwerk_4: "تغطية وتنظيف بعد العمل.",
    svc_intro_timmerwerk: "نصنع ونركّب حسب المقاس. قياسات دقيقة، عمل نظيف وتسليم مرتب.",

    svc_title_sloopwerk: "أعمال هدم وإزالة",
    svc_excerpt_sloopwerk: "هدم احترافي مع مراعاة السلامة وإزالة المخلفات بشكل مرتب. مناسب للتجديد.",
    svc_b_sloopwerk_1: "هدم داخلي وخارجي (جدران، أرضيات، مطابخ، حمامات).",
    svc_b_sloopwerk_2: "تقليل الغبار مع حماية عند الحاجة.",
    svc_b_sloopwerk_3: "إزالة الأنقاض ومخلفات البناء.",
    svc_b_sloopwerk_4: "تحضير للمرحلة التالية.",
    svc_intro_sloopwerk: "هدم مضبوط وآمن. نترك المكان نظيفاً ونتخلص من المخلفات حسب الاتفاق.",

    svc_title_raam_deur: "تركيب نوافذ وأبواب",
    svc_excerpt_raam_deur: "تركيب احترافي لتحسين العزل والأمان وتشطيب مرتب.",
    svc_b_raam_deur_1: "تركيب وضبط النوافذ والأبواب.",
    svc_b_raam_deur_2: "إحكام جيد لتوفير الطاقة والراحة.",
    svc_b_raam_deur_3: "تشطيب نجارة/تغليف نظيف.",
    svc_b_raam_deur_4: "مناسب للتجديد والبناء الجديد.",

    svc_title_keuken: "تركيب مطبخ",
    svc_excerpt_keuken: "تركيب مطبخ بشكل احترافي: تركيب الخزائن وضبطها وتسليم نظيف.",
    svc_b_keuken_1: "تركيب وضبط خزائن المطبخ.",
    svc_b_keuken_2: "قص وتعديلات حسب الحاجة.",
    svc_b_keuken_3: "توصيل الأجهزة (حسب الاتفاق).",
    svc_b_keuken_4: "تشطيب مرتب وجاهز للاستخدام.",

    svc_title_tuinmuur: "جدار حديقة وسياج",
    svc_excerpt_tuinmuur: "جدران وسياج قوي للحديقة للخصوصية والأمان ومظهر مرتب.",
    svc_b_tuinmuur_1: "بناء جدار حديقة أو تركيبه.",
    svc_b_tuinmuur_2: "تركيب سياج وبوابات.",
    svc_b_tuinmuur_3: "مواد متينة وتثبيت قوي.",
    svc_b_tuinmuur_4: "خطوط مستقيمة وتشطيب نظيف.",

    svc_title_kasten: "خزائن حسب الطلب",
    svc_excerpt_kasten: "خزائن مخصصة تناسب المكان: تصميم مرتب وتقسيم ذكي وتشطيب متين.",
    svc_b_kasten_1: "خزائن مدمجة، دولاب، وحدة تلفاز.",
    svc_b_kasten_2: "استغلال أفضل للمساحة.",
    svc_b_kasten_3: "تركيب وتشطيب نظيف.",
    svc_b_kasten_4: "نصيحة مواد وتشطيب.",

    svc_title_loodgieterij: "سباكة",
    svc_excerpt_loodgieterij: "سباكة موثوقة: تمديدات مياه وصرف وصحيات. عمل مرتب وبالاتفاق.",
    svc_b_loodgieterij_1: "تمديدات الماء والصرف.",
    svc_b_loodgieterij_2: "تركيب أو تغيير الصحيات.",
    svc_b_loodgieterij_3: "إصلاح تسربات وصيانة.",
    svc_b_loodgieterij_4: "عمل نظيف وتواصل واضح.",

    svc_title_elektriciteit: "كهرباء",
    svc_excerpt_elektriciteit: "أعمال كهرباء آمنة ومرتبة: مقابس، إنارة وتعديلات منزلية.",
    svc_b_elektriciteit_1: "إضافة/نقل مقابس ومفاتيح.",
    svc_b_elektriciteit_2: "تركيب إنارة داخلية/خارجية.",
    svc_b_elektriciteit_3: "تمديدات مرتبة وإخفاء الكوابل.",
    svc_b_elektriciteit_4: "سلامة واتفاق واضح.",

    svc_title_trap: "تجديد الدرج",
    svc_excerpt_trap: "امنح درجك شكلاً جديداً مع تجديد متين وتشطيب مرتب.",
    svc_b_trap_1: "إمكانية تغطية الدرج أو تغيير الكسوة.",
    svc_b_trap_2: "تشطيب مرتب ومواد متينة.",
    svc_b_trap_3: "تنفيذ سريع وبأقل إزعاج.",
    svc_b_trap_4: "مظهر عصري يناسب البيت.",

    svc_title_metselwerk: "أعمال بناء بالطوب (مِعمار)",
    svc_excerpt_metselwerk: "بناء بالطوب للداخل والخارج: جديد، إصلاح أو تعديل.",
    svc_b_metselwerk_1: "بناء جديد وإصلاحات.",
    svc_b_metselwerk_2: "فواصل مرتبة وتشطيب نظيف.",
    svc_b_metselwerk_3: "بناء قوي ومتين.",
    svc_b_metselwerk_4: "للتجديد، الإضافات وأعمال الحديقة.",

    source_google: "Google",
    source_werkspot: "Werkspot",
    go_to_review: "الانتقال إلى التقييم",

    review_1: "عمل تبليط ممتاز في الحمام. تواصل واضح والالتزام بالوقت. أنصح به بشدة.",
    review_2: "تم تركيب التدفئة الأرضية والبلاط بشكل مرتب مع عرض سعر واضح. راضٍ جداً.",
    review_3: "عمل سريع واحترافي. تركيب الأرضية والحواف كان مثالياً. شكراً لكم.",
    review_4: "أعمال الجبس والدهان كانت أفضل من المتوقع. تسليم نظيف جداً.",

    why_klusdam: "لماذا تختار كلوسدام",
why_b_1: "مواد عالية الجودة وأدوات احترافية لنتائج تدوم طويلاً.",
why_b_2: "عروض أسعار وجدولة واضحة بدون مفاجآت لاحقًا.",
why_b_3: "عمل نظيف: تغطية، تقليل الغبار، وتنظيف يومي.",
why_b_4: "فنيون محليون بخبرة سنوات في سخيدام ومنطقة روتردام.",

examples_work: "أمثلة من أعمالنا",
open_image: "فتح الصورة",
example: "مثال",

quote_help: "املأ بياناتك وسنرد عليك بسرعة.",
back_all_services: "العودة إلى جميع الخدمات",

prev: "السابق",
next: "التالي",
reset: "إعادة ضبط",

contact_company: "اسم الشركة",
contact_name: "الاسم",
contact_email: "البريد الإلكتروني",
contact_phone_optional: "الهاتف (اختياري)",
contact_choose_service: "اختر خدمة (اختياري)",
contact_message_placeholder: "اشرح مشروعك باختصار (المكان، المقاسات، المتطلبات)…",
contact_sending: "جارٍ الإرسال…",
contact_send: "إرسال",
contact_prefer_call: "تفضل الاتصال؟",
contact_success: "شكرًا! لقد استلمنا طلبك.",
contact_send_error: "فشل الإرسال. حاول مرة أخرى أو اتصل بنا.",


contact_inline_intro:
  "أدخل بياناتك. ستتلقى رسالة تأكيد عبر البريد الإلكتروني وسنتواصل معك قريبًا.",
contact_address: "العنوان",
contact_phone: "الهاتف",
contact_email_label: "البريد الإلكتروني",

over_title: "كلوسدام في سخيدام",
over_intro:
  "تجديد المنازل بدون توتر. نخطط، ننسق، ونسلّم مع ضمان. فريق واحد للهدم، السباكة، التبليط، النجارة، اللياسة والدهان.",
over_bullet_1:
  "التزام كامل بالمواعيد ونقطة تواصل واحدة.",
over_bullet_2:
  "عمل نظيف: تقليل الغبار وتنظيف يومي.",
over_bullet_3:
  "مواد متينة وحرفية تدوم لسنوات.",
over_location:
  "الموقع: Von Leibnizstraat 23 a، 3112 XN سخيدام. منطقة العمل: سخيدام، روتردام، فلااردينغن، دلفت والمناطق المحيطة.",
over_image_alt: "فريق كلوسدام أثناء العمل",

cat_badkamers: "الحمّامات",
cat_vloeren: "الأرضيات",
cat_laminaat: "اللامينيت",
cat_stuc_schilder: "اللياسة / الدهان",
cat_timmerwerk: "النجارة",
cat_traprenovatie: "تجديد السلالم",
cat_behangwerk: "ورق الجدران",
cat_metselwerk: "البناء",
cat_loodgieterij: "السباكة",
cat_overig: "أخرى",

prj_title_badk_1: "تجديد حمّام – رخام داكن",
prj_title_badk_2: "حمّام – دش مفتوح مع تجويف",
prj_title_vloer_1: "بلاط كبير الحجم",
prj_title_lam_1: "أرضية لامينيت بلون البلوط",
prj_title_stuk_1: "لياسة ودهان",
prj_title_tim_1: "نجارة – خزانة حسب الطلب",
prj_title_trap_1: "تجديد درج – تغطية الدرج",
prj_title_behang_1: "ورق جدران – نقش",
prj_title_mets_1: "أعمال بناء وفواصل",
prj_title_lood_1: "سباكة – أنابيب وتصريف",
prj_title_overig_1: "مشاريع تجديد متنوعة",

tag_badkamer: "حمّام",
tag_tegelzetter: "مبلّط",
tag_inloopdouche: "دش مفتوح",
tag_plavuizen: "بلاط",
tag_laminaat: "لامينيت",
tag_stukadoor: "مُليس",
tag_schilder: "دهّان",
tag_timmerwerk: "نجارة",
tag_trap: "درج",



  },
};

/* ---------- Cookie helpers ---------- */
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return m ? decodeURIComponent(m.pop() as string) : null;
}
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

/* ---------- Context ---------- */
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

/* ---------- Provider ---------- */
export function LanguageProvider({
  children,
  initialLang = "nl",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Init from cookie / localStorage
  useEffect(() => {
    const fromCookie = getCookie("lang");
    const fromLS = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;

    const candidate = fromCookie || fromLS;
    if (isLang(candidate)) setLangState(candidate);

    // Keep tabs in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === "lang" && isLang(e.newValue)) {
        setLangState(e.newValue);
        setCookie("lang", e.newValue);
        router.refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router]);

  // Sync <html> attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    setCookie("lang", l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    router.refresh();
  };

  const t = useMemo(() => {
    const d = dict[lang] || dict.nl;
    return (k: string) => d[k] ?? dict.nl[k] ?? k;
  }, [lang]);

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

/* ---------- Hook ---------- */
export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

/* ---------- Flags ---------- */
export const flags: Record<Lang, { label: string; src: string }> = {
  nl: { label: "Nederlands", src: "https://flagcdn.com/nl.svg" },
  en: { label: "English", src: "https://flagcdn.com/gb.svg" },
  de: { label: "Deutsch", src: "https://flagcdn.com/de.svg" },
  fr: { label: "Français", src: "https://flagcdn.com/fr.svg" },
  tr: { label: "Türkçe", src: "https://flagcdn.com/tr.svg" },
  ar: { label: "العربية", src: "https://flagcdn.com/sa.svg" },
};

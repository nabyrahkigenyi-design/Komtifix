"use client";

import { useI18n } from "@/lib/i18n";

export default function OverTeaser() {
  const { t } = useI18n();

  return (
    <section id="over" className="py-16 md:py-20 pattern-tools" data-reveal>
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="fade-light rounded-xl p-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            {t("over_title")}
          </h2>

          <p className="mt-4 text-lg">
            {t("over_intro")}
          </p>

          <ul className="mt-5 space-y-2 text-base">
            <li>• {t("over_bullet_1")}</li>
            <li>• {t("over_bullet_2")}</li>
            <li>• {t("over_bullet_3")}</li>
          </ul>

          <p className="mt-5">
            {t("over_location")}
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow" data-reveal>
          <img
            src="https://i.ibb.co/wrwwGcYS/Bathroom-Tile-Designs.jpg"
            alt={t("over_image_alt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

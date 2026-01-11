"use client";

import Image, { ImageProps } from "next/image";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAscB3q2C3N8AAAAASUVORK5CYII=";

export default function BlurImage(props: ImageProps) {
  return <Image placeholder="blur" blurDataURL={BLUR} {...props} />;
}

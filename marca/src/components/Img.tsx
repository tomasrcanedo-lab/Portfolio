import Image, { type ImageProps } from "next/image";

/** next/image con lazy loading. Los SVG (placeholders) no pasan por el optimizador. */
export function Img(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  return <Image {...props} unoptimized={src.endsWith(".svg") || props.unoptimized} />;
}

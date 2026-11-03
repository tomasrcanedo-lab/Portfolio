"use client";

import { useEffect, useRef, useState } from "react";
import { Img } from "./Img";

type Props = {
  poster: string;
  alt: string;
  video: { mp4: string | null; webm: string | null } | null;
};

/**
 * Fondo del hero. Si hay video, lo reproduce en loop, sin sonido.
 * Con prefers-reduced-motion queda la imagen fija.
 */
export function HeroMedia({ poster, alt, video }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) ref.current?.pause();
      else ref.current?.play().catch(() => undefined);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <Img src={poster} alt={alt} fill priority sizes="100vw" className="object-cover grayscale" />
      {video && !reduced && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover grayscale"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      )}
    </>
  );
}

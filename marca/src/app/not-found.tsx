import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <p className="label">404</p>
      <h1 className="title text-4xl md:text-6xl">No está acá.</h1>
      <Link href="/" className="btn">
        Volver al inicio
      </Link>
    </div>
  );
}

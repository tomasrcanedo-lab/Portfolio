export function SectionHead({ index, title, aside, id }: { index: string; title: string; aside?: React.ReactNode; id?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
      <h2 id={id} className="title text-2xl md:text-4xl">
        <span className="label mb-2 block">{index}</span>
        {title}
      </h2>
      {aside ? <div className="label text-right">{aside}</div> : null}
    </div>
  );
}

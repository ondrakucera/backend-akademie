import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import type { Dinosaur } from '../types';
import { DinosaurIllustration } from './DinosaurIllustration';

type DinosaurCardProps = {
  dinosaur: Dinosaur;
};

export function DinosaurCard({ dinosaur }: DinosaurCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-4 border-white bg-white/80 p-5 shadow-storybook transition hover:-translate-y-1 hover:bg-white">
      <div className="absolute right-5 top-5 rounded-full bg-butter px-3 py-1 text-xs font-black uppercase tracking-wide text-clay">
        {dinosaur.period}
      </div>
      <DinosaurIllustration name={dinosaur.name} className="mb-4 mt-4 self-center" />
      <div className="flex flex-1 flex-col gap-3">
        <h2 className="font-display text-2xl font-black text-meadow-900">{dinosaur.name}</h2>
        <p className="line-clamp-4 text-sm leading-6 text-bedtime-900/80">
          {dinosaur.description}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row">
          <Link
            to={`/dinosaurs/${dinosaur.id}`}
            className="inline-flex flex-1 justify-center rounded-full bg-meadow-700 px-4 py-2 font-bold text-white transition hover:bg-meadow-800"
          >
            Detail
          </Link>
          <a
            href={dinosaur.wikipediaAddress}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-meadow-200 bg-meadow-50 px-4 py-2 font-bold text-meadow-900 transition hover:border-meadow-400"
          >
            Wiki
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

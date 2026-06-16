import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { deleteDinosaur, getDinosaur, isNotFoundError } from '../api/dinosaurs';
import { DinosaurIllustration } from '../components/DinosaurIllustration';
import { Message } from '../components/Message';
import type { Dinosaur } from '../types';

export function DinosaurDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dinosaurId = Number(id);
  const [dinosaur, setDinosaur] = useState<Dinosaur | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(dinosaurId) || dinosaurId < 1) {
      setError('Neplatné ID dinosaura.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    getDinosaur(dinosaurId)
      .then((data) => {
        if (isMounted) {
          setDinosaur(data);
          setError(null);
        }
      })
      .catch((caughtError) => {
        if (isMounted) {
          setError(isNotFoundError(caughtError) ? 'Dinosaurus nebyl nalezen.' : 'Detail se nepodařilo načíst.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [dinosaurId]);

  async function handleDelete() {
    if (!dinosaur || !window.confirm(`Opravdu smazat dinosaura ${dinosaur.name}?`)) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteDinosaur(dinosaur.id);
      navigate('/');
    } catch {
      setError('Smazání se nepodařilo. API musí podporovat DELETE /dinosaurs/{id}.');
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <Message title="Hledám stopu v trávě..." />;
  }

  if (error && !dinosaur) {
    return <Message title="Dinosaurus se schoval" tone="error">{error}</Message>;
  }

  if (!dinosaur) {
    return <Message title="Dinosaurus se schoval" tone="error">Detail není dostupný.</Message>;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2.5rem] border-4 border-white bg-white/75 p-6 shadow-storybook">
        <DinosaurIllustration name={dinosaur.name} className="mx-auto h-56 w-full max-w-md" />
      </div>

      <article className="rounded-[2.5rem] border-4 border-white bg-white/85 p-6 shadow-storybook">
        <p className="inline-flex rounded-full bg-butter px-4 py-1 text-sm font-black text-clay">
          {dinosaur.period}
        </p>
        <h1 className="mt-4 font-display text-5xl font-black text-meadow-900">{dinosaur.name}</h1>
        <p className="mt-5 whitespace-pre-line text-lg leading-8 text-bedtime-900/80">
          {dinosaur.description}
        </p>

        {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 font-semibold text-red-900">{error}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={dinosaur.wikipediaAddress}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-meadow-700 px-5 py-3 font-bold text-white transition hover:bg-meadow-800"
          >
            Otevřít Wikipedii
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <Link
            to={`/dinosaurs/${dinosaur.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-bedtime-900 px-5 py-3 font-bold text-white transition hover:bg-bedtime-950"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Upravit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-70"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            {isDeleting ? 'Mažu...' : 'Smazat'}
          </button>
        </div>
      </article>
    </section>
  );
}

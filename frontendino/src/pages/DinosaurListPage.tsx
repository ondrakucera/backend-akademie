import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { listDinosaurs } from '../api/dinosaurs';
import { DinosaurCard } from '../components/DinosaurCard';
import { Message } from '../components/Message';
import type { Dinosaur } from '../types';

export function DinosaurListPage() {
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    listDinosaurs()
      .then((data) => {
        if (isMounted) {
          setDinosaurs(data);
          setError(null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Dinosaury se nepodařilo načíst. Zkontroluj, že API běží.');
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
  }, []);

  if (isLoading) {
    return <Message title="Dinosauři se probouzejí..." />;
  }

  if (error) {
    return <Message title="Něco zašustilo v kapradí" tone="error">{error}</Message>;
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-white/70 p-6 shadow-storybook">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-clay">Databáze</p>
        <h1 className="mt-2 font-display text-4xl font-black text-meadow-900 sm:text-5xl">
          Všichni dinosauři
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-bedtime-900/75">
          Malované karty jako z večerní pohádky, jen místo Krtečka tu v trávě vykukují dinosauři.
        </p>
      </div>

      {dinosaurs.length === 0 ? (
        <Message title="V údolí zatím nikdo není">
          <Link to="/dinosaurs/new" className="font-bold text-meadow-800 underline">
            Přidej prvního dinosaura.
          </Link>
        </Message>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dinosaurs.map((dinosaur) => (
            <DinosaurCard key={dinosaur.id} dinosaur={dinosaur} />
          ))}
        </div>
      )}
    </section>
  );
}

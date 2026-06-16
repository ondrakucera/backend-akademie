import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createDinosaur, getDinosaur, isNotFoundError, updateDinosaur } from '../api/dinosaurs';
import { DinosaurForm, type DinosaurFormValues } from '../components/DinosaurForm';
import { Message } from '../components/Message';

const emptyDinosaur: DinosaurFormValues = {
  name: '',
  description: '',
  period: '',
  wikipediaAddress: '',
};

type DinosaurFormPageProps = {
  mode: 'create' | 'edit';
};

export function DinosaurFormPage({ mode }: DinosaurFormPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dinosaurId = Number(id);
  const [initialValues, setInitialValues] = useState<DinosaurFormValues>(emptyDinosaur);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'create') {
      return;
    }

    if (!Number.isInteger(dinosaurId) || dinosaurId < 1) {
      setError('Neplatné ID dinosaura.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    getDinosaur(dinosaurId)
      .then((dinosaur) => {
        if (isMounted) {
          setInitialValues({
            name: dinosaur.name,
            description: dinosaur.description,
            period: dinosaur.period,
            wikipediaAddress: dinosaur.wikipediaAddress,
          });
          setError(null);
        }
      })
      .catch((caughtError) => {
        if (isMounted) {
          setError(isNotFoundError(caughtError) ? 'Dinosaurus nebyl nalezen.' : 'Data se nepodařilo načíst.');
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
  }, [dinosaurId, mode]);

  async function handleSubmit(values: DinosaurFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (mode === 'create') {
        const createdId = await createDinosaur(values);
        navigate(`/dinosaurs/${createdId}`);
      } else {
        await updateDinosaur(dinosaurId, values);
        navigate(`/dinosaurs/${dinosaurId}`);
      }
    } catch {
      setError('Uložení se nepodařilo. Zkontroluj údaje a dostupnost API.');
      setIsSubmitting(false);
    }
  }

  const title = mode === 'create' ? 'Nový dinosaurus' : 'Úprava dinosaura';

  if (isLoading) {
    return <Message title="Míchám barvy na obrázek..." />;
  }

  if (error && mode === 'edit' && initialValues === emptyDinosaur) {
    return <Message title="Formulář zůstal prázdný" tone="error">{error}</Message>;
  }

  return (
    <section className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[2rem] bg-white/70 p-6 shadow-storybook">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-clay">
          {mode === 'create' ? 'Přidání' : 'Editace'}
        </p>
        <h1 className="mt-2 font-display text-4xl font-black text-meadow-900">{title}</h1>
        <p className="mt-4 leading-7 text-bedtime-900/75">
          Vyplň jméno, období, popis a odkaz na Wikipedii. API přijímá přesně tato pole podle
          OpenAPI schématu.
        </p>
        {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 font-semibold text-red-900">{error}</p> : null}
      </div>

      <DinosaurForm
        initialValues={initialValues}
        submitLabel={mode === 'create' ? 'Vylíhnout dinosaura' : 'Uložit změny'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

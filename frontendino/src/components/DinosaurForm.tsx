import type { FormEvent } from 'react';
import type { DinosaurInput } from '../types';

export type DinosaurFormValues = DinosaurInput;

type DinosaurFormProps = {
  initialValues: DinosaurFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: DinosaurFormValues) => Promise<void>;
};

export function DinosaurForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
}: DinosaurFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    await onSubmit({
      name: String(form.get('name') ?? '').trim(),
      description: String(form.get('description') ?? '').trim(),
      period: String(form.get('period') ?? '').trim(),
      wikipediaAddress: String(form.get('wikipediaAddress') ?? '').trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] bg-white/85 p-6 shadow-storybook">
      <Field label="Jméno" name="name" maxLength={256} defaultValue={initialValues.name} />
      <Field label="Období" name="period" maxLength={32} defaultValue={initialValues.period} />
      <Field
        label="Wikipedie"
        name="wikipediaAddress"
        type="url"
        maxLength={4096}
        defaultValue={initialValues.wikipediaAddress}
      />
      <label className="block">
        <span className="mb-2 block font-bold text-meadow-900">Popis</span>
        <textarea
          name="description"
          required
          maxLength={4096}
          defaultValue={initialValues.description}
          rows={6}
          className="w-full rounded-3xl border-4 border-meadow-100 bg-meadow-50/60 px-4 py-3 outline-none transition focus:border-butter focus:bg-white"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-clay px-6 py-3 font-black text-white shadow-lg shadow-clay/20 transition hover:-translate-y-0.5 hover:bg-[#965831] disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? 'Ukládám...' : submitLabel}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof DinosaurFormValues;
  defaultValue: string;
  maxLength: number;
  type?: string;
};

function Field({ label, name, defaultValue, maxLength, type = 'text' }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-meadow-900">{label}</span>
      <input
        name={name}
        type={type}
        required
        maxLength={maxLength}
        defaultValue={defaultValue}
        className="w-full rounded-full border-4 border-meadow-100 bg-meadow-50/60 px-4 py-3 outline-none transition focus:border-butter focus:bg-white"
      />
    </label>
  );
}

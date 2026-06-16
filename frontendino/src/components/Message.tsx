type MessageProps = {
  title: string;
  children?: React.ReactNode;
  tone?: 'info' | 'error';
};

export function Message({ title, children, tone = 'info' }: MessageProps) {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-950'
      : 'border-white bg-white/80 text-bedtime-950';

  return (
    <div className={`rounded-[2rem] border-4 p-6 text-center shadow-storybook ${toneClass}`}>
      <p className="font-display text-2xl font-black">{title}</p>
      {children ? <div className="mt-2 text-sm leading-6 opacity-80">{children}</div> : null}
    </div>
  );
}

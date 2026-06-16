type DinosaurIllustrationProps = {
  name: string;
  className?: string;
};

export function DinosaurIllustration({ name, className = '' }: DinosaurIllustrationProps) {
  const hue = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 70;
  const body = `hsl(${95 + hue} 58% 42%)`;
  const belly = `hsl(${55 + hue / 3} 88% 74%)`;

  return (
    <svg
      viewBox="0 0 220 150"
      role="img"
      aria-label={`Ilustrace dinosaura ${name}`}
      className={`h-36 w-52 drop-shadow-xl ${className}`}
    >
      <path d="M23 122c36-19 128-20 174 0" fill="none" stroke="#5f8410" strokeWidth="9" strokeLinecap="round" />
      <path d="M74 95c-17-10-37-17-58-16 17 17 36 26 61 24z" fill={body} />
      <path d="M72 92c0-35 29-61 70-55 25 4 41 21 41 42 0 27-25 47-62 47-30 0-49-12-49-34z" fill={body} />
      <path d="M138 38c6-22 24-32 43-24 14 6 22 19 19 34-4 20-26 28-50 20z" fill={body} />
      <path d="M151 43c7-8 18-11 29-6 8 4 12 10 11 18-2 11-15 16-30 11z" fill={belly} opacity="0.95" />
      <path d="M93 88c8 14 24 22 45 22 17 0 30-6 38-15-8 20-29 31-56 31-30 0-49-12-49-34 0-8 2-16 6-23 3 7 8 14 16 19z" fill={belly} opacity="0.9" />
      <circle cx="177" cy="39" r="5" fill="#171b32" />
      <circle cx="179" cy="37" r="1.5" fill="white" />
      <path d="M191 57c-8 5-19 5-28 0" fill="none" stroke="#171b32" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 123l-5 16M141 123l7 16" stroke={body} strokeWidth="13" strokeLinecap="round" />
      <path d="M68 92c-10 5-16 12-19 21" stroke={body} strokeWidth="10" strokeLinecap="round" />
      <path d="M113 38l-10-16M133 37l-3-19M153 42l8-17" stroke={body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="54" cy="62" r="9" fill="#ffe07b" opacity="0.9" />
      <circle cx="33" cy="52" r="5" fill="#fff8bf" opacity="0.9" />
    </svg>
  );
}

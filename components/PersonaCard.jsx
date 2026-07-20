export default function PersonaCard({
  title,
  prompt,
  onSelect,
}) {
  const marks = {
    "Modi ji": "✦",
    "Samay Raina": "◉",
    "Toxic Ex": "♡",
    "Indian Mom": "◌",
    "Baburao Ganpatrao Apte": "⌁",
    "Ashneer Grover": "◆",
  };

  return (
      <button
        onClick={() => onSelect(prompt)}
        className="hud-panel group min-h-24 min-w-0 overflow-hidden rounded-md p-3 text-left transition hover:-translate-y-0.5 hover:border-[var(--accent-bright)] md:min-h-28 md:p-4"
      >
        <span className="mb-3 flex size-8 items-center justify-center rounded-full border border-violet-200/30 bg-violet-400/10 text-lg text-[var(--accent-bright)] shadow-[0_0_14px_rgba(139,92,246,.35)]">
          {marks[title]}
        </span>
        <h3 className="font-semibold leading-tight text-violet-50">{title}</h3>
      </button>
  );
}

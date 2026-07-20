export default function PersonaCard({
  title,
  prompt,
  onSelect,
  selected = false,
}) {
  const marks = {
    "Modi ji": "🇮🇳",
    "Samay Raina": "🎙️",
    "Toxic Ex": "💔",
    "Indian Mom": "👩",
    "Baburao Ganpatrao Apte": "👓",
    "Ashneer Grover": "💼",
  };

  return (
      <button
        onClick={() => onSelect(prompt)}
        className={`hud-panel group min-h-24 min-w-0 overflow-hidden rounded-md p-3 text-left hover:-translate-y-0.5 md:min-h-0 md:p-3 ${selected ? "persona-card--selected" : ""}`}
      >
        <span className="mb-3 flex size-8 items-center justify-center text-lg">
          {marks[title]}
        </span>
        <h3 className="font-semibold leading-tight text-zinc-100">{title}</h3>
      </button>
  );
}

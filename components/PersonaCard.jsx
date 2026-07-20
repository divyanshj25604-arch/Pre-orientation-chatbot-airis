export default function PersonaCard({
  title,
  prompt,
  onSelect,
  selected = false,
}) {

  return (
      <button
        onClick={() => onSelect(prompt)}
        className={`hud-panel group min-h-24 min-w-0 overflow-hidden rounded-md p-3 text-left hover:-translate-y-0.5 md:min-h-0 md:p-3 ${selected ? "persona-card--selected" : ""}`}
      >
        <h3 className="font-semibold leading-tight text-zinc-100">{title}</h3>
      </button>
  );
}

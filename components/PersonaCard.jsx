export default function PersonaCard({
  title,
  prompt,
  onSelect,
}) {
  return (
      <button
        onClick={() => onSelect(prompt)}
        className="min-w-0 border rounded-lg p-4 text-left hover:bg-neutral-900 transition bg-glass card-glow"
      >
        <h3 className="font-semibold">{title}</h3>
      </button>
  );
}

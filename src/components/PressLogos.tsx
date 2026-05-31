const phrase = ["Nature.", "Science.", "Truth."];
const repeated = Array(12).fill(phrase).flat();

export default function PressLogos() {
  return (
    <section className="bg-[#590515] py-4 overflow-hidden">
      <div className="animate-marquee" style={{ display: "flex", width: "max-content", gap: "0" }}>
        {repeated.map((word, i) => (
          <span
            key={i}
            className="shrink-0 text-white/80 text-sm font-medium tracking-[0.22em] select-none px-5"
            style={{ fontFamily: "Georgia, serif", fontStyle: word !== "Truth." ? "normal" : "italic" }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

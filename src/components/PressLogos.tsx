const pressItems = [
  "Bazaar", "Vogue", "Tatler", "marie claire", "ELLE", "Glamour", "Evening Standard", "Independent",
];

export default function PressLogos() {
  return (
    <section className="bg-[#590515] py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-2">
          {pressItems.map((name) => (
            <span
              key={name}
              className="text-white/80 text-sm font-medium tracking-wider select-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

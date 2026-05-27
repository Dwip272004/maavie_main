const pressItems = [
  "Vogue",
  "Harper's Bazaar",
  "Elle",
  "Refinery29",
  "Byrdie",
  "Allure",
  "WWD",
];

export default function PressLogos() {
  return (
    <section className="bg-[#FDFAF5] border-y border-[#E8D5A3]/50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-[#7A6A57] mb-6">
          As Seen In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {pressItems.map((name) => (
            <span
              key={name}
              className="text-lg font-light tracking-widest text-[#2C1A0E]/40 hover:text-[#C9963A] transition-colors duration-300 cursor-default select-none"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.12em" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

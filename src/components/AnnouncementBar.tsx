"use client";

const messages = [
  "Nature.",
  "✦",
  "Science.",
  "✦",
  "Truth.",
  "✦",
  "Nature.",
  "✦",
  "Science.",
  "✦",
  "Truth.",
  "✦",
  "Nature.",
  "✦",
  "Science.",
  "✦",
  "Truth.",
  "✦",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-[#1A1209] text-[#E8D5A3] text-xs tracking-widest uppercase overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {messages.map((msg, i) => (
          <span key={i} className="mx-10">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

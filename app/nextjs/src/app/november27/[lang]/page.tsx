// Простая и безопасная сигнатура под Next 16: не тянем PageProps, не конфликтуем с Promise-параметрами
export default async function November27Page({ params }: any) {
  // В Next 16 params может быть промисом — нормализуем
  const p = await Promise.resolve(params);
  const lang: string = p?.lang ?? "en";

  const dict: Record<string, { title: string; subtitle: string }> = {
    en: { title: "November 27", subtitle: "A simple one-page site" },
    ru: { title: "November 27", subtitle: "Простой одностраничный сайт" },
  };
  const t = dict[lang] ?? dict.en;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0b0b",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 48, lineHeight: 1.1, marginBottom: 12 }}>{t.title}</h1>
        <p style={{ fontSize: 18, opacity: 0.85 }}>{t.subtitle}</p>
      </div>
    </main>
  );
}

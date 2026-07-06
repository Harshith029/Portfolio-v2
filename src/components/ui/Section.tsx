export function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 border-t border-line py-28 md:py-36 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

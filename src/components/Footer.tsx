export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bg-linear-to-r from-orange-100 to-orange-50 w-full bottom-0 mt-20 border-t border-[var(--line)] px-4 pb-7 pt-7 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} DevJokes.  Debug hard, laugh harder.
        </p>
      </div>
    </footer>
  );
}

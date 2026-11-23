
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Campus Events.
          All rights reserved.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Discover what's happening on campus.
        </p>
      </div>
    </footer>
  );
}

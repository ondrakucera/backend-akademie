import { Egg, Plus, Sparkles } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f0c6] text-bedtime-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,224,123,0.9),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(190,224,75,0.65),transparent_18%),linear-gradient(180deg,#bfe9ff_0%,#f8f0c6_58%,#89b64f_100%)]" />
      <div className="fixed bottom-0 left-0 right-0 -z-10 h-44 rounded-t-[55%] bg-meadow-500/70" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border-4 border-white/80 bg-white/70 p-4 shadow-storybook backdrop-blur">
          <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <NavLink to="/" className="group flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-meadow-700 text-butter shadow-lg shadow-meadow-900/20 transition group-hover:rotate-6">
                <Egg aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-3xl font-black tracking-tight text-meadow-900">
                  Frontendino
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-clay">
                  <Sparkles className="size-4" aria-hidden="true" />
                  Večerníčková databáze dinosaurů
                </span>
              </span>
            </NavLink>
            <NavLink
              to="/dinosaurs/new"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-bedtime-900 px-5 py-3 font-bold text-white shadow-lg shadow-bedtime-900/20 transition hover:-translate-y-0.5 hover:bg-bedtime-950"
            >
              <Plus className="size-5" aria-hidden="true" />
              Přidat dinosaura
            </NavLink>
          </nav>
        </header>

        <Outlet />
      </div>
    </main>
  );
}

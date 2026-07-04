import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-slate-900 bg-clip-text text-transparent tracking-tight">
            ApexDigital{" "}
            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200/60 ml-1">
              Portal
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-semibold text-slate-800">Alex Mercer</span>
            <span className="text-xs text-slate-400">Premium Client</span>
          </div>
          <div className="h-9 w-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700">
            AM
          </div>
          <button
            type="button"
            className="text-sm font-medium text-slate-600 hover:text-rose-600 px-3 py-2 rounded-xl hover:bg-rose-50/50 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

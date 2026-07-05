import React, { useRef, useEffect } from "react";
import useToggle from "@/hooks/useToggle";
import { type CustomSelectProps } from "@/types/prop";

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, defaultValue, onChange }) => {
  const [isOpen, toggleDropdown] = useToggle(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || options[0]?.value);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        toggleDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleDropdown]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    toggleDropdown();
    onChange?.(value);
  };

  return (
    <div className="space-y-1 relative select-none" ref={containerRef}>
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
        {label}
      </label>

      <div
        onClick={toggleDropdown}
        className={`w-full bg-white border rounded-xl p-2.5 text-sm flex items-center justify-between cursor-pointer transition-all gap-3 ${
          isOpen
            ? "border-indigo-500 ring-2 ring-indigo-100 shadow-xs"
            : "border-slate-200 hover:border-slate-300 shadow-2xs"
        }`}
      >
        <span className="text-slate-900 truncate font-medium flex-1 text-left">
          {selectedOption ? selectedOption.label : "Chọn tài khoản..."}
        </span>

        <div
          className={`text-slate-400 transition-transform duration-200 shrink-0 flex items-center justify-center ${isOpen ? "rotate-180 text-indigo-500" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-60 overflow-y-auto p-1.5 transition-all duration-150 origin-top ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-1"
        }`}
      >
        {options.map((opt) => {
          const isSelected = opt.value === selectedValue;
          return (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 py-2.5 my-0.5 rounded-lg text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? "bg-indigo-50 text-indigo-900 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <span className="truncate flex-1 text-left">{opt.label}</span>

              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 text-indigo-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSelect;

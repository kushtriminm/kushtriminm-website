"use client";

import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type DropdownOption = { value: string; label: string };
export type DropdownGroup = { label?: string; options: DropdownOption[] };

// A dropdown that stays inside the pop-up (the browser's own one can float outside).
export default function Dropdown({
  value,
  onChange,
  groups,
  placeholder,
  searchable = false,
  searchPlaceholder = "Kërko...",
  emptyText = "Asnjë rezultat",
}: {
  value: string;
  onChange: (value: string) => void;
  groups: DropdownGroup[];
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = groups
    .flatMap((group) => group.options)
    .find((option) => option.value === value);

  const q = query.trim().toLowerCase();
  const visible = groups
    .map((group) => ({
      ...group,
      options: q
        ? group.options.filter((option) =>
            option.label.toLowerCase().includes(q)
          )
        : group.options,
    }))
    .filter((group) => group.options.length > 0);

  function choose(next: string) {
    onChange(next);
    setOpen(false);
    setQuery("");
  }

  return (
    <div>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black px-4 py-3 text-left text-sm font-medium text-white outline-none transition focus:border-red-500"
      >
        <span className={selected ? "" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-neutral-950 p-2">
          {searchable && (
            <div className="relative mb-2">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-xl bg-black py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-gray-600 focus:ring-1 focus:ring-red-500"
              />
            </div>
          )}

          <div
            role="listbox"
            className="max-h-60 overflow-y-auto overscroll-contain"
          >
            {visible.length === 0 && (
              <p className="px-3 py-3 text-sm text-gray-500">{emptyText}</p>
            )}

            {visible.map((group, index) => (
              <div key={group.label ?? index}>
                {group.label && (
                  <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-red-500">
                    {group.label}
                  </p>
                )}

                {group.options.map((option) => {
                  const chosen = option.value === value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={chosen}
                      onClick={() => choose(option.value)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        chosen
                          ? "bg-red-600 font-bold text-white"
                          : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      <span>{option.label}</span>
                      {chosen && <Check size={14} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
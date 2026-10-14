"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

/**
 * Reusable searchable dropdown (combobox) — the single UX pattern for Category
 * and Location selection across the app (add/edit post, home filters, filter
 * bottom sheet, profile, book-request).
 *
 * - Type to filter; Bangla + English labels are both searchable.
 * - Keyboard: Up/Down move, Enter select, Esc close.
 * - Click outside closes; selected value is always reflected in the trigger.
 * - a11y: combobox role, aria-expanded, labelled listbox options.
 */
export interface SearchableOption {
  value: string;
  label: string;
  hint?: string;
}

interface SearchableDropdownProps {
  options: readonly SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  clearText?: string;
  allowClear?: boolean;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  className?: string;
}

/**
 * Reusable searchable single-select dropdown.
 *
 * Shared primitive for category + district selection across add/edit post,
 * desktop + mobile home filters, and the filter bottom sheet — so the
 * behaviour (type-to-filter, keyboard nav, Bangla-label display with English
 * value storage) is identical everywhere.
 *
 * The stored `value` is always the stable English identifier; `label` (usually
 * Bangla) is what the user sees. `hint` optionally shows the English value.
 */
export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "নির্বাচন করুন",
  emptyText = "কিছু পাওয়া যায়নি",
  clearText = "মুছুন",
  allowClear = false,
  disabled = false,
  error = false,
  id,
  className = "",
}: SearchableDropdownProps) {
  const reactId = useId();
  const listboxId = `${id ?? reactId}-listbox`;
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        (o.hint?.toLowerCase().includes(q) ?? false),
    );
  }, [options, query]);

  const currentActiveIndex =
    filtered.length === 0 ? 0 : Math.min(activeIndex, filtered.length - 1);

  useEffect(() => {
    if (!isOpen) return;
    const node = listRef.current?.children[currentActiveIndex] as
      | HTMLElement
      | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [currentActiveIndex, isOpen]);

  const openList = () => {
    if (disabled) return;
    setIsOpen(true);
    setQuery("");
    setActiveIndex(
      selected
        ? Math.max(0, options.findIndex((o) => o.value === selected.value))
        : 0,
    );
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeList = () => {
    setIsOpen(false);
    setQuery("");
  };

  const selectOption = (opt: SearchableOption) => {
    onChange(opt.value);
    closeList();
  };

  const handleClear = () => {
    onChange("");
    closeList();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openList();
          return;
        }
        setActiveIndex((prev) =>
          filtered.length === 0
            ? 0
            : (Math.min(prev, filtered.length - 1) + 1) % filtered.length,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openList();
          return;
        }
        setActiveIndex((prev) =>
          filtered.length === 0
            ? 0
            : (Math.min(prev, filtered.length - 1) - 1 + filtered.length) %
              filtered.length,
        );
        break;
      case "Enter":
        if (isOpen && filtered[currentActiveIndex]) {
          event.preventDefault();
          selectOption(filtered[currentActiveIndex]);
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          closeList();
        }
        break;
      case "Tab":
        if (isOpen) closeList();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => (isOpen ? closeList() : openList())}
        className={`w-full flex items-center justify-between gap-2 rounded-input border px-3.5 py-2.5 text-sm text-left outline-none transition-base ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        } ${
          error
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-border focus:border-border-focus focus:ring-2 focus:ring-primary/20"
        } bg-surface text-text-primary`}
      >
        <span className={`truncate ${selected ? "" : "text-text-placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {allowClear && selected && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              aria-label={clearText}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-text-muted transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-input border border-border bg-surface shadow-lg">
          <div className="relative border-b border-border bg-background p-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={
                filtered[currentActiveIndex]
                  ? optionId(currentActiveIndex)
                  : undefined
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="খুঁজুন…"
              className="w-full rounded-md border border-border bg-surface py-1.5 pl-8 pr-2 text-xs text-text-primary outline-none focus:border-primary placeholder:text-text-placeholder"
            />
          </div>

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="max-h-52 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-center text-xs text-text-muted">
                {emptyText}
              </li>
            ) : (
              filtered.map((opt, index) => {
                const isSelected = opt.value === value;
                const isActive = index === currentActiveIndex;
                return (
                  <li
                    key={opt.value}
                    id={optionId(index)}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectOption(opt);
                    }}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? "bg-primary-light text-primary font-medium"
                        : "text-text-primary"
                    } ${isActive && !isSelected ? "bg-surface-hover" : ""}`}
                  >
                    <span className="truncate">
                      {opt.label}
                      {opt.hint && opt.hint !== opt.label && (
                        <span className="ml-1.5 text-[10px] text-text-muted">
                          ({opt.hint})
                        </span>
                      )}
                    </span>
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

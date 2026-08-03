"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FaqItem } from "@/content/types";
import { faqCopy } from "@/content/faq";
import { filterFaqItems } from "@/lib/faq-search";
import {
  FAQ_ASSISTANT_COPY,
  FAQ_QUICK_TOPICS,
  type FaqQuickTopicId,
  resolveFaqItemForTopic,
} from "@/lib/faq-topics";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-bronze sm:left-5 sm:size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function FaqItemIcon({ id }: { id: string }) {
  const className = "size-5 shrink-0 text-current";
  const common = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "prendre-rendez-vous":
      return (
        <svg {...common}>
          <path d="M8 3v3M16 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <path d="M8 13h4M8 17h8" />
        </svg>
      );
    case "prestations-domicile":
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "duree-prestation":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "preparation-cheveux":
      return (
        <svg {...common}>
          <path d="M12 3c-3.5 2-6 5.5-6 9.5C6 17 9 21 12 21s6-4 6-8.5C18 8.5 15.5 5 12 3z" />
          <path d="M12 7v10" />
        </svg>
      );
    case "prestations-hommes":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5.5 20c1.5-3.5 4-5 6.5-5s5 1.5 6.5 5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.7 2.2c-.8.4-1.2 1-1.2 1.8V14" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type FaqSearchExperienceProps = {
  items: readonly FaqItem[];
};

/**
 * Recherche + Assistant express + liste FAQ — unique Client Component.
 * Accordion : details/summary natifs ; un seul état partagé (query / sujet / ouverture).
 */
export function FaqSearchExperience({ items }: FaqSearchExperienceProps) {
  const [query, setQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<FaqQuickTopicId | null>(null);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const searchId = useId();
  const liveId = useId();
  const assistantTitleId = useId();
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<string | null>(null);

  const filtered = filterFaqItems(items, query);
  const resultCount = filtered.length;

  const liveLabel = (() => {
    if (selectedTopicId) {
      const item = resolveFaqItemForTopic(items, selectedTopicId);
      if (item) {
        return `1 ${faqCopy.resultsLiveLabel} : ${item.question}`;
      }
    }
    return resultCount <= 1
      ? `${resultCount} ${faqCopy.resultsLiveLabel}`
      : `${resultCount} ${faqCopy.resultsLiveLabelPlural}`;
  })();

  useEffect(() => {
    const targetId = pendingFocusRef.current;
    if (!targetId) {
      return;
    }
    pendingFocusRef.current = null;
    const summary = document.getElementById(`faq-summary-${targetId}`);
    if (!(summary instanceof HTMLElement)) {
      return;
    }
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    summary.scrollIntoView({ behavior, block: "nearest" });
    summary.focus({ preventScroll: true });
  }, [openItemId, query, selectedTopicId]);

  function resetAssistant(options?: { focusReset?: boolean; focusSearch?: boolean }) {
    setQuery("");
    setSelectedTopicId(null);
    setOpenItemId(null);
    pendingFocusRef.current = null;

    if (options?.focusSearch) {
      requestAnimationFrame(() => {
        document.getElementById(searchId)?.focus();
      });
      return;
    }

    if (options?.focusReset) {
      requestAnimationFrame(() => {
        resetButtonRef.current?.focus();
      });
    }
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    if (value.trim().length === 0) {
      setSelectedTopicId(null);
      setOpenItemId(null);
      pendingFocusRef.current = null;
      return;
    }
    if (selectedTopicId) {
      const topic = FAQ_QUICK_TOPICS.find((entry) => entry.id === selectedTopicId);
      if (!topic || value !== topic.searchTerm) {
        setSelectedTopicId(null);
        setOpenItemId(null);
      }
    }
  }

  function handleTopicSelect(topicId: FaqQuickTopicId) {
    const topic = FAQ_QUICK_TOPICS.find((entry) => entry.id === topicId);
    const item = resolveFaqItemForTopic(items, topicId);
    if (!topic || !item) {
      return;
    }
    setQuery(topic.searchTerm);
    setSelectedTopicId(topicId);
    setOpenItemId(item.id);
    pendingFocusRef.current = item.id;
  }

  function handleDetailsToggle(itemId: string, open: boolean) {
    if (open) {
      setOpenItemId(itemId);
      return;
    }
    if (openItemId === itemId) {
      setOpenItemId(null);
    }
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 lg:gap-6">
      <div data-faq-search className="relative mx-auto w-full max-w-2xl lg:max-w-3xl">
        <label htmlFor={searchId} className="sr-only">
          {faqCopy.searchPlaceholder}
        </label>
        <SearchIcon />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={faqCopy.searchPlaceholder}
          autoComplete="off"
          aria-controls={liveId}
          className="min-h-12 w-full rounded-full border border-soft-gold/70 bg-background py-3 pr-5 pl-12 font-sans text-base text-foreground shadow-soft placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:min-h-14 sm:pl-14"
        />
        <p id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
          {liveLabel}
        </p>
      </div>

      <div
        data-faq-body
        className="grid gap-6 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,2fr)] lg:items-start lg:gap-8"
      >
        <aside
          data-faq-assistant
          className="order-1 rounded-2xl border border-soft-gold/50 bg-background/95 p-4 shadow-soft sm:p-5 lg:order-none lg:p-6"
          aria-labelledby={assistantTitleId}
        >
          <h3
            id={assistantTitleId}
            className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            {FAQ_ASSISTANT_COPY.title}
          </h3>
          <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            {FAQ_ASSISTANT_COPY.description}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 lg:grid-cols-1">
            {FAQ_QUICK_TOPICS.map((topic) => {
              const pressed = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={[
                    "flex min-h-11 w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left font-sans text-sm font-medium transition-[border-color,background-color,box-shadow] duration-short ease-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus motion-reduce:transition-none sm:min-h-12 sm:text-[0.9375rem]",
                    pressed
                      ? "border-gold bg-cta-gold text-primary-foreground shadow-soft ring-2 ring-bronze/35 ring-offset-2 ring-offset-background"
                      : "border-soft-gold/55 bg-champagne/25 text-foreground hover:border-gold/60 hover:bg-champagne/45",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
                      pressed
                        ? "bg-background/55 text-primary-foreground"
                        : "bg-champagne/70 text-bronze",
                    ].join(" ")}
                  >
                    <FaqItemIcon id={topic.id} />
                  </span>
                  <span className="min-w-0 flex-1 text-balance leading-snug">{topic.label}</span>
                  {pressed ? (
                    <span aria-hidden="true" className="font-display text-base leading-none">
                      ✓
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {selectedTopicId ? (
            <button
              ref={resetButtonRef}
              type="button"
              onClick={() => resetAssistant({ focusSearch: true })}
              className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full border border-bronze/40 bg-surface px-4 py-2.5 font-sans text-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:min-h-12"
            >
              {FAQ_ASSISTANT_COPY.resetLabel}
            </button>
          ) : null}
        </aside>

        <div className="order-2 flex flex-col gap-3 lg:order-none sm:gap-3.5">
          {resultCount === 0 ? (
            <p
              role="status"
              className="rounded-2xl border border-bronze/25 bg-background/80 px-5 py-8 text-center font-sans text-sm text-muted-foreground sm:text-base"
            >
              {faqCopy.emptyResults}
            </p>
          ) : (
            filtered.map((item) => (
              <details
                key={item.id}
                className="group scroll-mt-24 rounded-2xl border border-soft-gold/50 bg-background shadow-soft open:border-gold/55 open:shadow-card"
                open={openItemId === item.id}
                onToggle={(event) => {
                  handleDetailsToggle(item.id, event.currentTarget.open);
                }}
              >
                <summary
                  id={`faq-summary-${item.id}`}
                  className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-3.5 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:min-h-12 sm:gap-4 sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-champagne/55 text-bronze">
                    <FaqItemIcon id={item.id} />
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[0.95rem] leading-snug font-semibold text-balance text-foreground sm:text-base md:text-[1.05rem]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-8 shrink-0 items-center justify-center font-display text-xl leading-none text-bronze transition-opacity duration-short ease-soft group-open:hidden motion-reduce:transition-none"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden size-8 shrink-0 items-center justify-center font-display text-xl leading-none text-bronze group-open:inline-flex"
                  >
                    −
                  </span>
                </summary>
                <div className="border-t border-bronze/20 px-4 pt-1 pb-4 sm:px-5 sm:pb-5">
                  <p className="pl-14 font-sans text-sm leading-relaxed text-muted-foreground sm:pl-[3.75rem] sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/** Alias rétrocompatible — unique Client Component FAQ. */
export const FaqSearchList = FaqSearchExperience;

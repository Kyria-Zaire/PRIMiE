"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { NavigationItem } from "@/content/types";
import { Button, LinkButton } from "@/components/ui/button";

export type MobileNavigationProps = {
  readonly items: readonly NavigationItem[];
  readonly whatsappUrl: string;
  readonly whatsappLabel: string;
};

export function MobileNavigation({ items, whatsappUrl, whatsappLabel }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef<string | null>(null);
  const reactId = useId();
  const panelId = `mobile-nav-panel-${reactId.replace(/:/g, "")}`;

  const unlockScroll = () => {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  };

  const lockScroll = () => {
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  };

  const closeMenu = (options?: { restoreFocus?: boolean }) => {
    setOpen(false);
    unlockScroll();
    if (options?.restoreFocus) {
      buttonRef.current?.focus();
    }
  };

  const openMenu = () => {
    lockScroll();
    setOpen(true);
  };

  const toggleMenu = () => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      setOpen(false);
      unlockScroll();
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  return (
    <div className="lg:hidden">
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="md"
        className="text-on-dark hover:text-gold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggleMenu}
      >
        {open ? "Fermer" : "Menu"}
      </Button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-bronze bg-rich-black px-4 py-4"
        style={{ zIndex: "var(--z-mobile-nav)" }}
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="inline-flex min-h-11 items-center font-sans text-base font-medium text-on-dark hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
              onClick={() => {
                closeMenu();
              }}
            >
              {item.label}
            </a>
          ))}
          <LinkButton href={whatsappUrl} size="md" className="mt-2 w-full justify-center">
            {whatsappLabel}
          </LinkButton>
        </nav>
      </div>
    </div>
  );
}

import type { ComponentPropsWithoutRef } from "react";

const sizeClass = {
  page: "max-w-page",
  content: "max-w-content",
  narrow: "max-w-narrow",
} as const;

export type ContainerSize = keyof typeof sizeClass;

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

export function Container({ size = "page", className, children, ...props }: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClass[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

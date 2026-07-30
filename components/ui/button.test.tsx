import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, LinkButton } from "./button";

describe("Button", () => {
  it("rend un bouton type button par défaut", () => {
    const html = renderToStaticMarkup(<Button>Action</Button>);

    expect(html.startsWith("<button")).toBe(true);
    expect(html).toContain('type="button"');
    expect(html).toContain("Action");
  });

  it("préserve type submit et disabled", () => {
    const html = renderToStaticMarkup(
      <Button type="submit" disabled>
        Envoyer
      </Button>,
    );

    expect(html).toContain('type="submit"');
    expect(html).toContain("disabled");
  });

  it("applique variantes et tailles", () => {
    expect(renderToStaticMarkup(<Button variant="primary" />)).toContain("bg-primary");
    expect(renderToStaticMarkup(<Button variant="secondary" />)).toContain("bg-ink");
    expect(renderToStaticMarkup(<Button variant="ghost" />)).toContain("bg-transparent");
    expect(renderToStaticMarkup(<Button size="sm" />)).toContain("min-h-10");
    expect(renderToStaticMarkup(<Button size="md" />)).toContain("min-h-11");
    expect(renderToStaticMarkup(<Button size="lg" />)).toContain("min-h-12");
  });
});

describe("LinkButton", () => {
  it("rend une ancre avec href", () => {
    const html = renderToStaticMarkup(<LinkButton href="#contact">Contact</LinkButton>);

    expect(html.startsWith("<a")).toBe(true);
    expect(html).toContain('href="#contact"');
    expect(html).toContain("Contact");
    expect(html).not.toContain("<button");
  });

  it("applique variantes, tailles et protège target blank", () => {
    expect(renderToStaticMarkup(<LinkButton href="/" variant="primary" />)).toContain("bg-primary");
    expect(renderToStaticMarkup(<LinkButton href="/" size="lg" />)).toContain("min-h-12");

    const blank = renderToStaticMarkup(
      <LinkButton href="https://example.com" target="_blank">
        Ext
      </LinkButton>,
    );
    expect(blank).toContain('rel="noopener noreferrer"');

    const customRel = renderToStaticMarkup(
      <LinkButton href="https://example.com" target="_blank" rel="noreferrer me">
        Ext
      </LinkButton>,
    );
    expect(customRel).toContain("noopener");
    expect(customRel).toContain("noreferrer");
    expect(customRel).toContain("me");
  });
});

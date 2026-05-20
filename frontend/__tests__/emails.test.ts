import { describe, it, expect } from "vitest";
import {
  contactoEmailHtml,
  adminContactoEmailHtml,
  sugerenciaEmailHtml,
  adminSugerenciaEmailHtml,
  confirmacionHtml,
  chispaHtml,
  yaSubscritoHtml,
  newsletterEmailHtml,
  bajaConfirmadaEmailHtml,
  adminNewsletterEmailHtml,
} from "../functions/_lib/emails";

const XSS = '<script>alert("xss")</script>';
const XSS_ESCAPED = "&lt;script&gt;";

describe("contactoEmailHtml", () => {
  it("returns HTML containing the user name", () => {
    const html = contactoEmailHtml("María", "Empresa SL", "Retail", "Hola, necesito info");
    expect(html).toContain("DIAMADMIN");
    expect(html).toContain("María");
    expect(html).toContain("Empresa SL");
    expect(html).toContain("Hola, necesito info");
  });

  it("escapes XSS in user input", () => {
    const html = contactoEmailHtml(XSS, "", "", "mensaje");
    expect(html).toContain(XSS_ESCAPED);
    expect(html).not.toContain("<script>");
  });
});

describe("adminContactoEmailHtml", () => {
  it("contains sender details", () => {
    const html = adminContactoEmailHtml("Juan", "juan@test.com", "Acme", "Logística", "Un mensaje");
    expect(html).toContain("juan@test.com");
    expect(html).toContain("Juan");
    expect(html).toContain("Acme");
  });

  it("escapes XSS in all fields", () => {
    const html = adminContactoEmailHtml(XSS, XSS, XSS, XSS, XSS);
    expect(html).not.toContain("<script>");
  });
});

describe("sugerenciaEmailHtml", () => {
  it("includes the tipo and idea", () => {
    const html = sugerenciaEmailHtml("Nuevo módulo", "Quiero un módulo de inventario");
    expect(html).toContain("Nuevo módulo");
    expect(html).toContain("Quiero un módulo de inventario");
    expect(html).toContain("DIAMADMIN");
  });
});

describe("adminSugerenciaEmailHtml", () => {
  it("includes email and tipo", () => {
    const html = adminSugerenciaEmailHtml("user@test.com", "Integración", "Conectar con Holded");
    expect(html).toContain("user@test.com");
    expect(html).toContain("Integración");
    expect(html).toContain("Conectar con Holded");
  });
});

describe("confirmacionHtml", () => {
  it("contains the confirmation URL", () => {
    const url = "https://www.diamadmin.com/api/confirm?e=a&ts=1&t=abc";
    const html = confirmacionHtml("Ana", url);
    expect(html).toContain(url);
    expect(html).toContain("Ana");
    expect(html).toContain("48 horas");
  });
});

describe("chispaHtml", () => {
  it("includes the unsubscribe URL", () => {
    const url = "https://www.diamadmin.com/api/unsubscribe?e=a&t=abc";
    const html = chispaHtml(url);
    expect(html).toContain(url);
    expect(html).toContain("DIAMADMIN");
    expect(html).toContain("Darse de baja");
  });
});

describe("yaSubscritoHtml", () => {
  it("addresses the subscriber by name", () => {
    const html = yaSubscritoHtml("Carlos", "https://diamadmin.com/unsubscribe?e=x");
    expect(html).toContain("Carlos");
    expect(html).toContain("Darse de baja");
  });
});

describe("newsletterEmailHtml", () => {
  it("personalises with the subscriber name", () => {
    const html = newsletterEmailHtml("Laura");
    expect(html).toContain("Laura");
    expect(html).toContain("DIAMADMIN");
  });
});

describe("bajaConfirmadaEmailHtml", () => {
  it("confirms the unsubscribe without a delete-data URL", () => {
    const html = bajaConfirmadaEmailHtml();
    expect(html).toContain("Baja procesada");
    expect(html).toContain("info@diamadmin.com");
  });

  it("includes the delete-data link when provided", () => {
    const url = "https://www.diamadmin.com/api/delete-data?e=a&t=abc";
    const html = bajaConfirmadaEmailHtml(url);
    expect(html).toContain(url);
    expect(html).toContain("Eliminar mis datos");
  });
});

describe("adminNewsletterEmailHtml", () => {
  it("shows the subscriber name and email", () => {
    const html = adminNewsletterEmailHtml("Pepe", "pepe@test.com");
    expect(html).toContain("Pepe");
    expect(html).toContain("pepe@test.com");
  });
});

describe("HTML structure", () => {
  it("all user emails start with DOCTYPE", () => {
    const fns = [
      contactoEmailHtml("n", "", "", "m"),
      sugerenciaEmailHtml("t", "i"),
      confirmacionHtml("n", "https://test.com"),
      newsletterEmailHtml("n"),
      chispaHtml("https://test.com"),
      yaSubscritoHtml("n", "https://test.com"),
      bajaConfirmadaEmailHtml(),
    ];
    for (const html of fns) {
      expect(html.trimStart()).toMatch(/^<!DOCTYPE html>/i);
    }
  });
});

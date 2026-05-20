function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SITE  = "https://www.diamadmin.com";
const BLUE  = "linear-gradient(135deg,#1B75BB 0%,#3DB5E6 100%)";
const DARK  = "linear-gradient(135deg,#0A2540 0%,#1B75BB 55%,#3DB5E6 100%)";
const GRAY  = "linear-gradient(135deg,#607D8B 0%,#455A64 100%)";
const STRIP = "linear-gradient(90deg,#0A2540,#1B75BB,#3DB5E6,#1B75BB,#0A2540)";

interface UserOpts {
  gradient?: string;
  outerBg?: string;
  emoji: string;
  title: string;
  subtitle?: string;
  body: string;
  cta?: { url: string; label: string };
  unsubscribe?: string;
  footerNote?: string;
}

function userEmail(o: UserOpts): string {
  const gradient   = o.gradient ?? BLUE;
  const bg         = o.outerBg  ?? "#EAF4FB";
  const subtitle   = o.subtitle
    ? `<p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);letter-spacing:0.5px;">${o.subtitle}</p>`
    : "";
  const ctaBlock   = o.cta
    ? `<tr>
        <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
          <a href="${o.cta.url}" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">${o.cta.label} &rarr;</a>
        </td>
      </tr>`
    : "";
  const unsub      = o.unsubscribe
    ? ` &middot; <a href="${o.unsubscribe}" style="color:#546E7A;">Darse de baja</a>`
    : "";
  const footerNote = o.footerNote !== undefined
    ? o.footerNote
    : `Recibiste este email desde <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`;
  const footerTop  = footerNote
    ? `<p style="margin:0 0 8px;font-size:13px;color:#9BA6AD;line-height:1.6;">${footerNote}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:${bg};font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:${gradient};border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <br>
            <div style="font-size:40px;margin:0 auto 16px;line-height:1;">${o.emoji}</div>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${o.title}</h1>
            ${subtitle}
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
            ${o.body}
          </td>
        </tr>

        ${ctaBlock}

        <tr>
          <td style="height:4px;background:${STRIP};font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            ${footerTop}
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados${unsub}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

interface AdminOpts {
  bannerColor?: string;
  bannerEmoji: string;
  bannerText: string;
  body: string;
  replyEmail?: string;
  replyName?: string;
}

function adminEmail(o: AdminOpts): string {
  const banner   = o.bannerColor ?? "#3DB5E6";
  const replyBtn = o.replyEmail
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td align="center">
            <a href="mailto:${o.replyEmail}?subject=Re: tu consulta a Diamadmin" style="display:inline-block;background:#0A2540;color:#3DB5E6;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:50px;letter-spacing:0.3px;">
              Responder a ${o.replyName ?? o.replyEmail} &rarr;
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:#0A2540;border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;">
            <div style="display:inline-block;background:rgba(61,181,230,0.15);border-radius:8px;padding:6px 18px;margin-bottom:8px;">
              <span style="font-size:16px;font-weight:900;color:#3DB5E6;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;letter-spacing:0.5px;">Panel de administración</p>
          </td>
        </tr>

        <tr>
          <td style="background:${banner};padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">${o.bannerEmoji} ${o.bannerText}</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            ${o.body}
            ${replyBtn}
          </td>
        </tr>

        <tr>
          <td style="background:#eee;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Diamadmin &middot; Notificación interna &middot; No responder a este email</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Shared helpers ── */

function infoBox(rows: [string, string][]): string {
  const rowsHtml = rows.map(([label, value]) =>
    `<tr><td style="padding:3px 0;font-size:14px;color:#607D8B;width:75px;">${label}:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${value}</td></tr>`
  ).join("\n");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#EAF4FB;border-radius:10px;border:1px solid #C5DFF2;">
    <tr><td style="padding:18px 22px;">
      <table role="presentation" cellpadding="0" cellspacing="0">${rowsHtml}</table>
    </td></tr>
  </table>`;
}

function quoteBlock(label: string, text: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="background:#EAF4FB;border-left:4px solid #3DB5E6;border-radius:0 10px 10px 0;padding:18px 22px;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">${label}</p>
        <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;font-style:italic;">"${text}"</p>
      </td>
    </tr>
  </table>`;
}

function messageBlock(text: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="background:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #0A2540;border-radius:0 8px 8px 0;padding:18px 22px;">
        <p style="margin:0;font-size:14px;color:#263238;line-height:1.7;">${text}</p>
      </td>
    </tr>
  </table>`;
}

function divider(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>`;
}

const BENEFICIOS = [
  "Nuevos módulos y funcionalidades antes que nadie",
  "Casos de uso reales por sector",
  "Guías para optimizar la gestión de tu pyme",
  "Ofertas y ventajas exclusivas para suscriptores",
];

function beneficiosList(): string {
  const items = BENEFICIOS.map((b, i) =>
    `<tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:${i < 3 ? "#3DB5E6" : "#1B75BB"};font-weight:700;margin-right:10px;">◆</span>${b}</td></tr>`
  ).join("\n");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#EAF4FB;border-radius:12px;">
    <tr><td style="padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Recibirás en tu email</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
    </td></tr>
  </table>`;
}

/* ── Transactional: Contacto ── */

export function contactoEmailHtml(nombre: string, empresa: string, sector: string, mensaje: string): string {
  const n  = esc(nombre);
  const em = empresa ? esc(empresa) : null;
  const s  = sector  ? esc(sector)  : null;
  const m  = esc(mensaje).replace(/\n/g, "<br>");
  return userEmail({
    emoji: "✉️",
    title: "¡Mensaje recibido!",
    subtitle: "Te responderemos lo antes posible",
    body: `
      <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#0A2540;">Hola, ${n} 👋</p>
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
        Gracias por contactar con Diamadmin. Hemos recibido tu mensaje y te responderemos en las próximas
        <strong style="color:#0A2540;">24&ndash;48 horas</strong>.
        ${em ? `<br>Hemos registrado que perteneces a <strong style="color:#0A2540;">${em}</strong>${s ? ` (sector ${s})` : ""}.` : ""}
      </p>
      ${quoteBlock("Tu mensaje", m)}
      ${divider()}
      <p style="margin:0;font-size:14px;color:#607D8B;line-height:1.7;">
        Mientras tanto, puedes explorar todo lo que Diamadmin puede hacer por tu negocio:
        la plataforma de <strong style="color:#0A2540;">administración empresarial modular</strong> diseñada para pymes.
      </p>`,
    cta: { url: SITE, label: "Explorar Diamadmin" },
    footerNote: `Recibiste este email porque enviaste un mensaje desde <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

export function adminContactoEmailHtml(nombre: string, email: string, empresa: string, sector: string, mensaje: string): string {
  const n  = esc(nombre);
  const e  = esc(email);
  const em = empresa ? esc(empresa) : "—";
  const s  = sector  ? esc(sector)  : "—";
  const m  = esc(mensaje).replace(/\n/g, "<br>");
  return adminEmail({
    bannerEmoji: "📬",
    bannerText: "Nuevo mensaje de contacto",
    body: `
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Remitente</p>
      ${infoBox([
        ["Nombre",  n],
        ["Email",   `<a href="mailto:${e}" style="color:#3DB5E6;text-decoration:none;">${e}</a>`],
        ["Empresa", em],
        ["Sector",  s],
      ])}
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Mensaje</p>
      ${messageBlock(m)}`,
    replyEmail: e,
    replyName:  n,
  });
}

/* ── Transactional: Sugerencia ── */

export function sugerenciaEmailHtml(tipo: string, idea: string): string {
  const t = esc(tipo);
  const i = esc(idea).replace(/\n/g, "<br>");
  return userEmail({
    emoji: "💡",
    title: "¡Sugerencia recibida!",
    subtitle: "Gracias por ayudarnos a mejorar",
    body: `
      <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
        Hemos recibido tu sugerencia sobre <strong style="color:#0A2540;">"${t}"</strong>.
        Nuestro equipo de producto la revisará y la tendrá en cuenta para próximas versiones de la plataforma.
      </p>
      ${quoteBlock("Tu idea", i)}`,
    cta: { url: SITE, label: "Ver Diamadmin" },
    footerNote: `Recibiste este email porque enviaste una sugerencia desde <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

export function adminSugerenciaEmailHtml(email: string, tipo: string, idea: string): string {
  const e = esc(email);
  const t = esc(tipo);
  const i = esc(idea).replace(/\n/g, "<br>");
  return adminEmail({
    bannerColor: "#1B75BB",
    bannerEmoji: "💡",
    bannerText: "Nueva sugerencia de usuario",
    body: `
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Datos</p>
      ${infoBox([
        ["Email", `<a href="mailto:${e}" style="color:#3DB5E6;text-decoration:none;">${e}</a>`],
        ["Tipo",  t],
      ])}
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Idea</p>
      ${messageBlock(i)}`,
    replyEmail: e,
    replyName:  e,
  });
}

/* ── Newsletter: double opt-in ── */

export function confirmacionHtml(nombre: string, confirmUrl: string): string {
  const n = esc(nombre);
  return userEmail({
    emoji: "📬",
    title: `Un paso más, ${n}`,
    subtitle: "Confirma tu suscripción para empezar",
    body: `
      <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
        Hola ${n} 👋 Solo queda un paso para recibir las novedades de Diamadmin.
        Haz clic en el botón para confirmar tu dirección de email.
      </p>
      <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">◆ Lo que recibirás</h2>
      ${beneficiosList()}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td align="center">
            <a href="${confirmUrl}" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 40px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Confirmar mi suscripción &rarr;
            </a>
          </td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#fffbf0;border-left:4px solid #f5a623;border-radius:0 8px 8px 0;padding:14px 18px;">
            <p style="margin:0;font-size:13px;color:#607D8B;line-height:1.6;">
              Este enlace expira en <strong style="color:#0A2540;">48 horas</strong>.
              Si no solicitaste esta suscripción, ignora este email con total seguridad.
            </p>
          </td>
        </tr>
      </table>`,
    footerNote: `Recibiste este email porque alguien se registró con esta dirección en <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

/* ── Cápsula: bienvenida tras confirmación ── */

export function chispaHtml(unsubscribeUrl: string): string {
  return userEmail({
    gradient: DARK,
    emoji: "◆",
    title: "Tu primera cápsula Diamadmin",
    subtitle: "Bienvenido a bordo",
    body: `
      <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
        Hola 👋 Somos el equipo de Diamadmin y este es tu primer mensaje como suscriptor.
      </p>
      <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">🚀 Qué estamos construyendo</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#455A64;line-height:1.7;">
        Diamadmin es la plataforma de administración empresarial modular para pymes.
        Estamos en desarrollo activo: el módulo de stock, la gestión de equipo y el panel de operaciones
        avanzan cada semana. Nuestro objetivo es que cualquier pyme pueda digitalizar su gestión
        desde un único panel, sin complicaciones.
      </p>
      <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">📅 Lo que viene</h2>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#455A64;line-height:1.9;">
        <li>Módulo de facturación y control financiero</li>
        <li>Integraciones con herramientas externas (TPV, contabilidad)</li>
        <li>Primeros accesos a la beta con pymes reales</li>
      </ul>
      ${divider()}
      <p style="margin:0;font-size:13px;color:#9BA6AD;line-height:1.6;">
        Gracias por estar aquí desde el principio. Tu confianza nos impulsa a construir mejor cada día.
      </p>`,
    cta: { url: SITE, label: "Explorar la plataforma" },
    unsubscribe: unsubscribeUrl,
    footerNote: `Te suscribiste en <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

/* ── Cápsula: ya suscrito ── */

export function yaSubscritoHtml(nombre: string, unsubscribeUrl: string): string {
  const n = esc(nombre);
  return userEmail({
    gradient: DARK,
    emoji: "◆",
    title: `¡${n}, sigues siendo de los nuestros!`,
    subtitle: "Tu plaza en Diamadmin ya está reservada",
    body: `
      <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
        Intentaste suscribirte de nuevo, así que aprovechamos para contarte cómo van las cosas 👇
      </p>
      <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">🚀 Dónde estamos ahora</h2>
      <p style="margin:0 0 24px;font-size:14px;color:#455A64;line-height:1.7;">
        Seguimos construyendo la plataforma modular. El módulo de stock y el panel de operaciones
        están avanzados. Ahora trabajamos en facturación e integraciones.
        Tú serás el primero en saberlo cuando lancemos la beta.
      </p>
      <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">📬 Lo que recibirás</h2>
      ${beneficiosList()}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="background:#fffbf0;border-left:4px solid #f5a623;border-radius:0 8px 8px 0;padding:16px 20px;">
            <p style="margin:0;font-size:14px;color:#0A2540;line-height:1.6;">
              <strong>¿Sabías que...</strong> las pymes que digitalizan sus procesos de gestión
              reducen el tiempo administrativo hasta un 40%? Diamadmin existe para hacer eso posible.
            </p>
          </td>
        </tr>
      </table>
      ${divider()}
      <p style="margin:0;font-size:13px;color:#9BA6AD;line-height:1.6;">
        Gracias por seguir aquí, ${n}. Tu confianza desde el principio nos impulsa a construir mejor.
      </p>`,
    cta: { url: SITE, label: "Explorar la plataforma" },
    unsubscribe: unsubscribeUrl,
    footerNote: `Te suscribiste en <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

/* ── Cápsula: bienvenida simple (llamada tras confirmar) ── */

export function newsletterEmailHtml(nombre: string): string {
  const n = esc(nombre);
  return userEmail({
    gradient: DARK,
    emoji: "🎉",
    title: "¡Ya formas parte de Diamadmin!",
    subtitle: `Gracias por unirte, ${n}`,
    body: `
      <p style="margin:0 0 8px;font-size:19px;font-weight:800;color:#0A2540;">Hola, ${n} 🌟</p>
      <p style="margin:0 0 28px;font-size:15px;color:#607D8B;line-height:1.7;">
        Eres de los primeros en suscribirte al newsletter de Diamadmin.
        <strong style="color:#0A2540;">Tú serás el primero en saber de cada novedad</strong>: nuevos módulos, mejoras y casos de uso reales.
      </p>
      ${beneficiosList()}
      ${divider()}
      <p style="margin:0;font-size:14px;color:#607D8B;line-height:1.7;">
        Diamadmin es la plataforma de <strong style="color:#0A2540;">administración empresarial modular</strong> para pymes:
        controla el stock, gestiona tu equipo y digitaliza operaciones desde un único panel.
      </p>`,
    cta: { url: SITE, label: "Explorar la plataforma" },
    footerNote: `Te suscribiste desde <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>`,
  });
}

/* ── Baja del newsletter ── */

export function bajaConfirmadaEmailHtml(deleteDataUrl?: string): string {
  const deleteLink = deleteDataUrl
    ? `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? <a href="${deleteDataUrl}" style="color:#3DB5E6;text-decoration:none;">Eliminar mis datos</a></p>`
    : `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? Escríbenos a <a href="mailto:info@diamadmin.com?subject=Eliminar%20mis%20datos" style="color:#3DB5E6;text-decoration:none;">info@diamadmin.com</a></p>`;
  return userEmail({
    gradient: GRAY,
    outerBg: "#f0f4f5",
    emoji: "👋",
    title: "Baja procesada",
    subtitle: "Te echamos de menos, pero lo entendemos",
    body: `
      <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
        Has sido dado de baja correctamente del newsletter de Diamadmin.
        No recibirás más emails de nuestra parte.
      </p>
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
        Si en algún momento cambias de opinión, siempre puedes volver a suscribirte desde
        <a href="${SITE}" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#f8f9fa;border-left:4px solid #90A4AE;border-radius:0 8px 8px 0;padding:14px 18px;">
            <p style="margin:0;font-size:13px;color:#607D8B;line-height:1.6;">
              Si además deseas que eliminemos todos tus datos escríbenos a
              <a href="mailto:info@diamadmin.com?subject=Eliminar%20mis%20datos" style="color:#3DB5E6;text-decoration:none;">info@diamadmin.com</a>
              con el asunto <em>"Eliminar mis datos"</em> y lo haremos en menos de 72 horas.
            </p>
            ${deleteLink}
          </td>
        </tr>
      </table>`,
    footerNote: "",
  });
}

/* ── Admin: newsletter ── */

export function adminNewsletterEmailHtml(nombre: string, email: string): string {
  const n = esc(nombre);
  const e = esc(email);
  return adminEmail({
    bannerColor: "linear-gradient(135deg,#1B75BB,#3DB5E6)",
    bannerEmoji: "🎉",
    bannerText: "Nueva suscripción al newsletter",
    body: `
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Nuevo suscriptor</p>
      ${infoBox([
        ["Nombre", n],
        ["Email",  `<a href="mailto:${e}" style="color:#3DB5E6;text-decoration:none;">${e}</a>`],
      ])}`,
  });
}

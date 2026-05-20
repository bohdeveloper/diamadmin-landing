function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ─────────────────────────────────────────
   CONTACTO — auto-reply al usuario
───────────────────────────────────────── */
export function contactoEmailHtml(nombre: string, empresa: string, sector: string, mensaje: string): string {
  const n = esc(nombre);
  const e = empresa ? esc(empresa) : null;
  const s = sector  ? esc(sector)  : null;
  const m = esc(mensaje).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Hemos recibido tu mensaje · Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#1B75BB 0%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <br>
            <div style="width:64px;height:64px;background:rgba(255,255,255,0.18);border-radius:50%;margin:0 auto 16px;line-height:64px;text-align:center;">
              <span style="font-size:30px;">✉️</span>
            </div>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">¡Mensaje recibido!</h1>
            <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);letter-spacing:0.5px;">Te responderemos lo antes posible</p>
          </td>
        </tr>

        <!-- WHITE CARD -->
        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#0A2540;">Hola, ${n} 👋</p>
            <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
              Gracias por contactar con Diamadmin. Hemos recibido tu mensaje y te responderemos en las próximas <strong style="color:#0A2540;">24&ndash;48 horas</strong>.
              ${e ? `<br>Hemos registrado que perteneces a <strong style="color:#0A2540;">${e}</strong>${s ? ` (sector ${s})` : ""}.` : ""}
            </p>

            <!-- Message preview -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#EAF4FB;border-left:4px solid #3DB5E6;border-radius:0 10px 10px 0;padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Tu mensaje</p>
                  <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;font-style:italic;">"${m}"</p>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:14px;color:#607D8B;line-height:1.7;">
              Mientras tanto, puedes explorar todo lo que Diamadmin puede hacer por tu negocio:
              la plataforma de <strong style="color:#0A2540;">administración empresarial modular</strong> diseñada para pymes.
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
            <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Explorar Diamadmin &rarr;
            </a>
          </td>
        </tr>

        <!-- ACCENT STRIP -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#1B75BB,#3DB5E6,#1B75BB);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Recibiste este email porque enviaste un mensaje desde
              <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>
            </p>
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   CONTACTO — notificación interna al admin
───────────────────────────────────────── */
export function adminContactoEmailHtml(nombre: string, email: string, empresa: string, sector: string, mensaje: string): string {
  const n = esc(nombre);
  const e = esc(email);
  const em = empresa ? esc(empresa) : "—";
  const s  = sector  ? esc(sector)  : "—";
  const m  = esc(mensaje).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nuevo contacto · Diamadmin</title>
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
          <td style="background:#3DB5E6;padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">
              📬 Nuevo mensaje de contacto
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#EAF4FB;border-radius:10px;border:1px solid #C5DFF2;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Remitente</p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;width:75px;">Nombre:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${n}</td></tr>
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;">Email:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;"><a href="mailto:${e}" style="color:#3DB5E6;text-decoration:none;">${e}</a></td></tr>
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;">Empresa:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${em}</td></tr>
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;">Sector:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${s}</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #0A2540;border-radius:0 8px 8px 0;padding:18px 22px;">
                  <p style="margin:0;font-size:14px;color:#263238;line-height:1.7;">${m}</p>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="mailto:${e}?subject=Re: Tu consulta a Diamadmin" style="display:inline-block;background:#0A2540;color:#3DB5E6;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:50px;letter-spacing:0.3px;">
                    Responder a ${n} &rarr;
                  </a>
                </td>
              </tr>
            </table>
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

/* ─────────────────────────────────────────
   SUGERENCIA — confirmación al usuario (si dejó email)
───────────────────────────────────────── */
export function sugerenciaEmailHtml(tipo: string, idea: string): string {
  const t = esc(tipo);
  const i = esc(idea).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Sugerencia recibida · Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#1B75BB 0%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <br>
            <div style="font-size:40px;margin:0 auto 16px;line-height:1;">💡</div>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">¡Sugerencia recibida!</h1>
            <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">Gracias por ayudarnos a mejorar</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
              Hemos recibido tu sugerencia sobre <strong style="color:#0A2540;">"${t}"</strong>.
              Nuestro equipo de producto la revisará y la tendrá en cuenta para próximas versiones de la plataforma.
            </p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#EAF4FB;border-left:4px solid #3DB5E6;border-radius:0 10px 10px 0;padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Tu idea</p>
                  <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;font-style:italic;">"${i}"</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:16px 44px 40px;text-align:center;">
            <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Ver Diamadmin &rarr;
            </a>
          </td>
        </tr>

        <tr><td style="height:4px;background:linear-gradient(90deg,#1B75BB,#3DB5E6,#1B75BB);font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   SUGERENCIA — notificación interna al admin
───────────────────────────────────────── */
export function adminSugerenciaEmailHtml(email: string, tipo: string, idea: string): string {
  const e = email ? esc(email) : "anónimo";
  const t = esc(tipo);
  const i = esc(idea).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nueva sugerencia · Diamadmin</title>
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
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;">Panel de administración</p>
          </td>
        </tr>

        <tr>
          <td style="background:#1B75BB;padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">💡 Nueva sugerencia de usuario</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#EAF4FB;border-radius:10px;border:1px solid #C5DFF2;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Datos</p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;width:75px;">Email:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${e}</td></tr>
                    <tr><td style="padding:3px 0;font-size:14px;color:#607D8B;">Tipo:</td><td style="padding:3px 0;font-size:14px;font-weight:700;color:#0A2540;">${t}</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Idea</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #1B75BB;border-radius:0 8px 8px 0;padding:18px 22px;">
                  <p style="margin:0;font-size:14px;color:#263238;line-height:1.7;">${i}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#eee;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Diamadmin &middot; Notificación interna</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — bienvenida al suscriptor
───────────────────────────────────────── */
export function newsletterEmailHtml(nombre: string): string {
  const n = esc(nombre);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>¡Bienvenido a Diamadmin!</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#0A2540 0%,#1B75BB 55%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:48px 44px 44px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <br>
            <div style="font-size:44px;margin:0 auto 16px;line-height:1;">🎉</div>
            <h1 style="margin:0 0 8px;font-size:27px;font-weight:900;color:#ffffff;">¡Ya formas parte de Diamadmin!</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);">Gracias por unirte, ${n}</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 8px;font-size:19px;font-weight:800;color:#0A2540;">Hola, ${n} 🌟</p>
            <p style="margin:0 0 28px;font-size:15px;color:#607D8B;line-height:1.7;">
              Eres de los primeros en suscribirte al newsletter de Diamadmin.
              <strong style="color:#0A2540;">Tú serás el primero en saber de cada novedad</strong>: nuevos módulos, mejoras y casos de uso reales.
            </p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#EAF4FB;border-radius:12px;">
              <tr>
                <td style="padding:22px 26px;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Recibirás en tu email</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Novedades y nuevos módulos antes que nadie</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Casos de uso reales por sector</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Guías para optimizar la gestión de tu negocio</td></tr>
                    <tr><td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#1B75BB;font-weight:700;margin-right:10px;">◆</span>Ofertas y ventajas exclusivas para suscriptores</td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:14px;color:#607D8B;line-height:1.7;">
              Diamadmin es la plataforma de <strong style="color:#0A2540;">administración empresarial modular</strong> para pymes:
              controla el stock, gestiona tu equipo y digitaliza operaciones desde un único panel.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
            <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Explorar la plataforma &rarr;
            </a>
          </td>
        </tr>

        <tr><td style="height:4px;background:linear-gradient(90deg,#0A2540,#1B75BB,#3DB5E6,#1B75BB,#0A2540);font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Te suscribiste desde <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>
            </p>
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — double opt-in: email de confirmación
───────────────────────────────────────── */
export function confirmacionHtml(nombre: string, confirmUrl: string): string {
  const n = esc(nombre);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Confirma tu suscripción · Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#1B75BB 0%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 22px;margin-bottom:20px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <div style="font-size:42px;margin-bottom:12px;">📬</div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Un paso más, ${n}</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Confirma tu suscripción para empezar</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
            <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
              Hola ${n} 👋 Solo queda un paso para recibir las novedades de Diamadmin.
              Haz clic en el botón para confirmar tu dirección de email.
            </p>
            <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#0A2540;">◆ Lo que recibirás</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#EAF4FB;border-radius:12px;">
              <tr>
                <td style="padding:20px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Nuevos módulos y funcionalidades antes que nadie</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Casos de uso reales por sector</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Guías para optimizar la gestión de tu pyme</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#1B75BB;font-weight:700;margin-right:10px;">◆</span>Ofertas y ventajas exclusivas para suscriptores</td></tr>
                  </table>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td align="center">
                  <a href="${confirmUrl}" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 40px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
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
            </table>
          </td>
        </tr>

        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#0A2540,#1B75BB,#3DB5E6,#1B75BB,#0A2540);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:24px 44px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#9BA6AD;line-height:1.6;">
              Recibiste este email porque alguien se registró con esta dirección en
              <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>
            </p>
            <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — bienvenida tras confirmación (chispa)
───────────────────────────────────────── */
export function chispaHtml(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Tu primera cápsula Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#0A2540 0%,#1B75BB 55%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:10px;padding:8px 22px;margin-bottom:16px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Tu primera cápsula Diamadmin ◆</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Bienvenido a bordo</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
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
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Gracias por estar aquí desde el principio. Tu confianza nos impulsa a construir mejor cada día.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:0 44px 40px;text-align:center;">
            <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Explorar la plataforma &rarr;
            </a>
          </td>
        </tr>

        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#0A2540,#1B75BB,#3DB5E6,#1B75BB,#0A2540);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:24px 44px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#9BA6AD;line-height:1.6;">
              Te suscribiste en
              <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>
            </p>
            <p style="margin:0;font-size:11px;color:#546E7A;">
              &copy; ${new Date().getFullYear()} Diamadmin &middot;
              <a href="${unsubscribeUrl}" style="color:#546E7A;">Darse de baja</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — ya estaba suscrito
───────────────────────────────────────── */
export function yaSubscritoHtml(nombre: string, unsubscribeUrl: string): string {
  const n = esc(nombre);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Ya formas parte de Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#EAF4FB;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EAF4FB;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#0A2540 0%,#1B75BB 55%,#3DB5E6 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.12);border-radius:10px;padding:8px 22px;margin-bottom:20px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <div style="font-size:42px;margin-bottom:12px;">◆</div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">¡${n}, sigues siendo de los nuestros!</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Tu plaza en Diamadmin ya está reservada</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
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
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#EAF4FB;border-radius:12px;">
              <tr>
                <td style="padding:20px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Nuevos módulos y funcionalidades antes que nadie</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Casos de uso reales por sector</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#3DB5E6;font-weight:700;margin-right:10px;">◆</span>Guías para optimizar la gestión de tu pyme</td></tr>
                    <tr><td style="padding:5px 0;font-size:14px;color:#263238;line-height:1.5;"><span style="color:#1B75BB;font-weight:700;margin-right:10px;">◆</span>Ofertas y ventajas exclusivas para suscriptores</td></tr>
                  </table>
                </td>
              </tr>
            </table>

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

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Gracias por seguir aquí, ${n}. Tu confianza desde el principio nos impulsa a construir mejor.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:0 44px 40px;text-align:center;">
            <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;box-shadow:0 6px 20px rgba(27,117,187,0.35);">
              Explorar la plataforma &rarr;
            </a>
          </td>
        </tr>

        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#0A2540,#1B75BB,#3DB5E6,#1B75BB,#0A2540);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:24px 44px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#9BA6AD;line-height:1.6;">
              Te suscribiste en
              <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>
            </p>
            <p style="margin:0;font-size:11px;color:#546E7A;">
              &copy; ${new Date().getFullYear()} Diamadmin &middot;
              <a href="${unsubscribeUrl}" style="color:#546E7A;">Darse de baja</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — baja confirmada
───────────────────────────────────────── */
export function bajaConfirmadaEmailHtml(deleteDataUrl?: string): string {
  const deleteLink = deleteDataUrl
    ? `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? <a href="${deleteDataUrl}" style="color:#3DB5E6;text-decoration:none;">Eliminar mis datos</a></p>`
    : `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? Escríbenos a <a href="mailto:info@diamadmin.com?subject=Eliminar%20mis%20datos" style="color:#3DB5E6;text-decoration:none;">info@diamadmin.com</a></p>`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Baja procesada · Diamadmin</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f5;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#607D8B 0%,#455A64 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 22px;margin-bottom:20px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">DIAMADMIN</span>
            </div>
            <div style="font-size:42px;margin-bottom:12px;">👋</div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Baja procesada</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Te echamos de menos, pero lo entendemos</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
            <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
              Has sido dado de baja correctamente del newsletter de Diamadmin.
              No recibirás más emails de nuestra parte.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
              Si en algún momento cambias de opinión, siempre puedes volver a suscribirte desde
              <a href="https://www.diamadmin.com" style="color:#3DB5E6;text-decoration:none;">diamadmin.com</a>.
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
            </table>
          </td>
        </tr>

        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#90A4AE,#607D8B,#90A4AE);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="background:#0A2540;border-radius:0 0 20px 20px;padding:24px 44px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${new Date().getFullYear()} Diamadmin &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────
   NEWSLETTER — notificación interna al admin
───────────────────────────────────────── */
export function adminNewsletterEmailHtml(nombre: string, email: string): string {
  const n = esc(nombre);
  const e = esc(email);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nueva suscripción · Diamadmin</title>
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
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;">Panel de administración</p>
          </td>
        </tr>

        <tr>
          <td style="background:linear-gradient(135deg,#1B75BB,#3DB5E6);padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">🎉 Nueva suscripción al newsletter</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAF4FB;border-radius:10px;border:1px solid #C5DFF2;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#1B75BB;letter-spacing:2px;text-transform:uppercase;">Nuevo suscriptor</p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:4px 0;font-size:14px;color:#607D8B;width:75px;">Nombre:</td><td style="padding:4px 0;font-size:14px;font-weight:700;color:#0A2540;">${n}</td></tr>
                    <tr><td style="padding:4px 0;font-size:14px;color:#607D8B;">Email:</td><td style="padding:4px 0;font-size:14px;font-weight:700;color:#0A2540;"><a href="mailto:${e}" style="color:#3DB5E6;text-decoration:none;">${e}</a></td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#eee;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Diamadmin &middot; Notificación interna</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

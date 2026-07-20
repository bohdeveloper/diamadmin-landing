# CLAUDE.md — Reglas de trabajo

Este archivo se carga en cada sesión. Contiene **solo reglas de trabajo**.
El conocimiento del proyecto (qué es, arquitectura, decisiones, convenciones) vive en
[spec.md](spec.md); el trabajo pendiente, en [plan.md](plan.md). No dupliques contenido aquí.

---

## Spec-Driven Development (OBLIGATORIO)

1. **Al empezar:** lee [spec.md](spec.md) §3 (invariantes) y §6 (metodología), y [plan.md](plan.md).
2. **Nada se implementa sin su punto en `plan.md`.** Si la petición no está, añádela primero.
3. **Contrasta con los invariantes de spec.md §3** y avisa si la petición choca con alguno
   (ej.: Resend está vetado, los precios están ocultos deliberadamente, el export es estático).
4. **Al terminar:** marca el punto en `plan.md` con fecha · decisiones nuevas → `spec.md` ·
   cambios de alcance o stack → `README.md`.
5. Desglosa las tareas grandes en fases dentro de `plan.md` antes de empezar.

---

## Exploración del código

Este proyecto tiene un grafo de conocimiento servido por **codebase-memory-mcp**
(config en `.mcp.json`, snapshot committeado en `.codebase-memory/graph.db.zst`).

- Para cualquier pregunta sobre el código, usa PRIMERO las tools MCP antes de grep o lectura masiva:
  `search_graph` · `trace_path` · `query_graph` · `get_architecture` · `search_code` · `get_code_snippet`.
- Read/Grep/Glob libremente para textos, configs y ficheros no-código. Lee siempre un fichero antes de editarlo.
- Antes de crear un helper nuevo, busca el existente en spec.md §2 (`sendEmail`, `isValidEmail`,
  `hmacHex`, `esc`, `rateLimit`…). **No dupliques abstracciones core.**
- El watcher mantiene el grafo al día. Reindexa manualmente solo tras un `git pull` grande:
  `codebase-memory-mcp cli index_repository --repo-path . --persistence true`
- Regenera `.codebase-memory/graph.html` al cerrar cada fase o tras cambios grandes.

---

## Agentes

Dos agentes especializados (definidos en `~/.claude/agents/`, configuración global del usuario:
no viajan con el repo). Delega en ellos en lugar de improvisar:

- **`ux-ui-designer`** — **obligatorio antes de maquetar UI nueva.** Diseño y rediseño de páginas y
  componentes, sistema de diseño, responsive, SEO on-page, animaciones y accesibilidad. Pásale
  siempre la paleta del contexto correcto (spec.md §4: la web es cian, los emails azul Diamadmin)
  y la prohibición de `next/image`. No lo uses para lógica de los endpoints.
- **`git-master`** — operaciones de git no triviales: conflictos de merge/rebase/cherry-pick,
  sincronización con remoto, estrategia de ramas, rescates del historial (reflog), limpieza de
  historia, stash y bisect. **No** para un `git status` o un commit rutinario, que haces tú directamente.

Ojo con `git-master`: la política de commits de abajo sigue aplicando: no commitea ni sube nada
sin que el usuario lo pida.

---

## Ciclo de cierre de una feature

1. `npm run test` + `npm run build` (desde `frontend/`).
2. **`/code-review` sobre el diff — obligatorio.**
3. `/security-review` si tocas auth, tokens, privacidad o añades un endpoint.
4. Verificación end-to-end con `/run`, cerrando después los procesos que hayas arrancado.
5. Registrar en `plan.md` / `spec.md` / `README.md` según corresponda.

Tabla completa de skills y cuándo usarlas: **spec.md §6**.

---

## Entorno

- El proyecto vive en `frontend/`; los comandos npm se ejecutan ahí, no en la raíz.
- Dev server en `http://localhost:3000`. Comprueba si el usuario ya lo tiene levantado antes de arrancar otro.
- **Commit solo cuando el usuario lo pida.** Estilo del historial: `área: descripción en español`, en imperativo.
- `.claude/` está en `.gitignore`: su configuración es local y no viaja con el repo.

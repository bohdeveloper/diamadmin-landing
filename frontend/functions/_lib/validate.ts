export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export const LIMITS = {
  nombre:  100,
  email:   320,
  empresa: 200,
  sector:  100,
  mensaje: 2000,
  tipo:    100,
  idea:    2000,
} as const;

export function checkLength(value: string, max: number): boolean {
  return value.length <= max;
}

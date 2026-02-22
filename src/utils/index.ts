/**
 * Utility helpers. Add pure functions and shared logic here.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

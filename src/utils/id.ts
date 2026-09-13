/**
 * Generate a unique ID using timestamp + random string.
 * Works without crypto dependencies, safe for React Native.
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Returns the first argument that is not `undefined`.
 */
export function getFirstDefined() {
  for (const arg of arguments) {
    if (arg !== undefined) return arg;
  }
}

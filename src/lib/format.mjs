/**
 * Available value formats.
 *
 * @readonly
 * @enum {string}
 */
export const FORMATS = {
  DATE:         'date',
  DATETIME:     'datetime',
  MACHINE_TIME: 'machine-time',
  TIME:         'time',
}


/**
 * Format a date/time for display.
 *
 * @param {FORMATS} format The format to use.
 * @param {*} value The value to format.
 * @returns The value formatted as requested.
 */
export function formatAs(format, value) {
  try {
    switch (format) {
      case FORMATS.DATE:         return formatDate(value);
      case FORMATS.DATETIME:     return formatDateTime(value);
      case FORMATS.MACHINE_TIME: return formatMachineTime(value);
      case FORMATS.TIME:         return formatTime(value);
      // TODO: NUMBER
      // TODO: INTEGER
      // TODO: FLOAT
      // TODO: MONEY
    }
  } catch (e) {
    return null;
  }

  throw new Error(
    `ERROR: Unknown format "${format}". ` +
    `Available: ${Object.values(FORMATS).join(', ')}.`
  );
}


/**
 * Format a Date object as a date.
 *
 * @param {Date} date
 * @returns The value formatted as a date.
 */
export function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const y = date.getFullYear();
  const m = months[date.getMonth()];
  const d = ('0' + date.getDate()).slice(-2);
  return `${d} ${m} ${y}`;
}


/**
 * Format a Date object as a date/time.
 *
 * @param {Date} date
 * @returns The value formatted as a date/time.
 */
export function formatDateTime(date) {
  const result = `${formatDate(date)} ${formatTime(date)}`.trim();
  return result ? result : null;
}


/**
 * Format a Date object as a machine-encoded date/time.
 *
 * @param {Date} date
 * @returns The value formatted as a machine date/time.
 */
export function formatMachineTime(date) {
  try {
    return date.toISOString();
  } catch (e) {
    return null;
  }
}


/**
 * Format a Date object as a time.
 *
 * @param {Date} date
 * @returns The value formatted as a time.
 */
export function formatTime(date) {
  const h = ('0' + date.getHours()).slice(-2);
  const m = ('0' + date.getMinutes()).slice(-2);
  return `${h}:${m}`;
}

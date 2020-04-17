// Type definitions for msisdn-formatter library.

export enum PrettyFormats {
    CLEANER = 'cleaner',
    CLEAN = 'clean',
    SHORT = 'short',
    USUAL = 'usual',
    FULL = 'full',
}

/**
 * Makes msisdn pretty
 *
 * @param {number|string} msisdn
 * @param {string} [format=usual]
 * @returns {string}
 */
export function pretty(msisdn: number | string, format?: PrettyFormats): string;

/**
 * Cleans msisdn (cleaner or clean)
 *
 * @param {string} msisdn
 * @param {boolean} [cleaner=false] Remove leading 7
 * @returns {string | null}
 */
export function clean(msisdn: string, cleaner?: boolean): string | null;

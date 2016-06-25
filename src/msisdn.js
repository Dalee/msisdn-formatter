/**
 * Regular expression
 * @typedef {object} RegExp
 */

/**
 * @constant
 * @default
 * @type {{
 *  validMsisdn: RegExp,
 *  notDigitsNorPlus: RegExp,
 *  cleanMsisdnParts: RegExp
 * }}
 */
const patterns = {
    validMsisdn      : /^7?[69]\d{9}$/,
    notDigitsNorPlus : /[^\d\+]+/g,
    cleanMsisdnParts : /^(?:\+?7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/
};

/**
 * @constant
 * @type {object}
 * @default
 */
const prettyFormats = {
    cleaner : '$1$2$3$4',
    clean   : '7$1$2$3$4',
    short   : '$1 $2-$3$4',
    usual   : '($1) $2-$3$4',
    full    : '+7 ($1) $2-$3$4'
};

/**
 * Makes msisdn pretty
 *
 * @param {string} msisdn
 * @param {string} [format=usual]
 * @returns {string}
 */
export function pretty(msisdn, format='usual') {
    const cleaned = clean(msisdn);
    if (!cleaned) {
        return msisdn;
    }
    format = (format in prettyFormats)? format: 'usual';
    return cleaned.replace(patterns.cleanMsisdnParts, prettyFormats[format]);
}

/**
 * Cleans msisdn (cleaner or clean)
 *
 * @param {string} msisdn
 * @param {boolean} [cleaner=false] Remove leading 7
 * @returns {?string}
 */
export function clean(msisdn, cleaner=false) {
    if (typeof msisdn !== 'string') {
        return null;
    }
    const cleaned = msisdn.replace(patterns.notDigitsNorPlus, '');
    msisdn = cleaned.replace(patterns.cleanMsisdnParts, cleaner? prettyFormats.cleaner: prettyFormats.clean);
    return patterns.validMsisdn.test(msisdn)? msisdn: null;
}

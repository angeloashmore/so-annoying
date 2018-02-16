import { get, set } from 'es-cookie'
import invariant from 'invariant'

const DEFAULT_OPTIONS = {
  // Never annoy if the cookie is present.
  shouldAnnoyIfCookiePresent: () => false,

  // Cookie will persist for at most 14 days.
  expires: 14,
}

/**
 * Conditionally runs an arbitrary function based on the function's previous
 * execution's return value - if any. Utilizes a cookie to track the return
 * value.
 * @param {string} key - unique key used to identify the cookie.
 * @param {function(existingCookie: Object): any} annoyance - conditionally run
 *   function.
 * @param {Object} [options]
 * @param {function(existingCookie: Object): boolean} [options.shouldAnnoyIfCookiePresent]
 *   - function to determine if the annoyance should run even if the cookie
 *   exists.
 * @param {number} [options.maxAge] - when the cookie will be removed in
 *   seconds.
 * @param {number|Date} [options.expires=14] - when the cookie will be removed
 *   in days or explicit date.
 * @param {string} [options.path=/] - the path where the cookie is visible
 * @param {string} [options.domain] - the domain where the cookie is visible
 * @param {boolean} [options.secure] - indicator if the cookie transmission
 *   requires a secure protocol (HTTPS)
 */
export const annoy = async (key, annoyance = () => {}, options = {}) => {
  const { shouldAnnoyIfCookiePresent, ...cookieOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  // Arguments validation.
  invariant(typeof key === 'string', 'key must be a string')
  invariant(typeof annoyance === 'function', 'annoyance must be a function')
  invariant(typeof options === 'object', 'options must be an object')
  invariant(
    typeof shouldAnnoyIfCookiePresent === 'function',
    'options.shouldAnnoyIfCookiePresent must be a function',
  )
  invariant(
    ['undefined', 'number'].includes(typeof cookieOptions.maxAge),
    'options.maxAge must be a number',
  )

  // Set cookieOptions.expires using maxAge.
  if (cookieOptions.maxAge) {
    const date = new Date()
    date.setTime(date.getTime() + cookieOptions.maxAge * 1000)
    cookieOptions.expires = date
  }

  // Fetch the cookie.
  const existingCookie = get(key)

  // If the cookie does not exist OR the cookie does exists and
  // options.shouldAnnoyIfCookiePresent returns true, run the annoyance and set
  // a cookie with the provided options to mark the annoyance as ran.
  if (!existingCookie || (await shouldAnnoyIfCookiePresent(existingCookie))) {
    // Run the annoyance and save the return value.
    const value = await annoyance(existingCookie)

    // Set the cookie to mark that the annoyance was ran.
    set(key, value, cookieOptions)
  }
}

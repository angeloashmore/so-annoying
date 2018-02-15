import { set, get } from 'es-cookie'
import invariant from 'invariant'

const DEFAULT_OPTIONS = {
  // Never annoy if the cookie is present.
  shouldAnnoyIfCookiePresent: () => false,

  // Cookie will persist for at most 14 days.
  maxAge: 60 * 60 * 24 * 14,
}

export const annoy = async (key, annoyance = () => {}, passedOptions = {}) => {
  invariant(typeof key === 'string', 'key must be a string')

  const { shouldAnnoyIfCookiePresent, ...cookieOptions } = {
    ...DEFAULT_OPTIONS,
    ...passedOptions,
  }

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
  if (!existingCookie || shouldAnnoyIfCookiePresent(existingCookie)) {
    // Run the annoyance and save the return value.
    const value = await annoyance(existingCookie)

    // Set the cookie to mark that the annoyance was ran.
    set(key, value, cookieOptions)
  }
}

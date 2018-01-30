import Cookies from 'universal-cookies'

const COOKIE_DEFAULT_KEY = '___so-annoying-global'
const DEFAULT_OPTIONS = {
  // Cookie will persist for at most 14 days.
  maxAge: 60 * 60 * 24 * 14,

  // Never annoy if the cookie is present.
  shouldAnnoyIfCookiePresent: () => false,
}

const cookies = new Cookies()

export const annoy = (
  key = COOKIE_DEFAULT_KEY,
  annoyance = () => {},
  passedOptions = {},
) => {
  const { shouldAnnoyIfCookiePresent, ...cookieOptions } = {
    ...DEFAULT_OPTIONS,
    ...passedOptions,
  }

  // Fetch the cookie.
  const existingCookie = cookies.get(key)

  // If the cookie does not exist OR the cookie does exists and
  // options.shouldAnnoyIfCookiePresent returns true, run the annoyance. Set a
  // cookie with the provided options to mark the annoyance as ran.
  if (!existingCookie || shouldAnnoyIfCookiePresent(existingCookie)) {
    // Run the annoyance and save the return value.
    const value = annoyance(existingCookie)

    // Set the cookie to mark that the annoyance was ran.
    cookies.set(key, value, cookieOptions)
  }
}

# So Annoying

Create annoying behaviors for sweet conversions. This library makes it easy to
implement conditionally activated pop-ups, call-outs, etc.

## Status

[![npm version](https://badge.fury.io/js/so-annoying.svg)](http://badge.fury.io/js/so-annoying)
[![Build Status](https://secure.travis-ci.org/angeloashmore/so-annoying.svg?branch=master)](http://travis-ci.org/angeloashmore/so-annoying?branch=master)

## Installation

```sh
npm install --save so-annoying
```

## Quick Guide

### 1. Import

Import the module.

```js
import { annoy } from 'so-annoying'
```

### 2. Create an annoyance

```js
annoy('newsletter-signup-2018-02', async () => {
  const email = window.prompt('Give us your email address.')

  // Perform some async action.
  await sendEmailToServer(email)

  // The return value is saved with the cookie. If the function doesn't return,
  // the cookie is not set.
  return email
})
```

### 3. That's it!

By default, your annoyance will be run once until the cookie expires (14 days
by default).

## Advanced Usage

### Using the existing cookie value

The existing cookie value is provided as the only argument to annoyance.

```js
// Example here...
```

The existing cookie value is also provided to the `shouldAnnoyIfCookiePresent`
option. This allows you to conditionally run the annoyance even if the cookie
is present.

```js
// Example here...
```

### Using a `Promise` (or `async`/`await`) in the annoyance

The return value of the annoyance is used as the cookie value when it is set.
If some type of async action needs to take place during the annoyance, you can
utilize a `Promise` or `async`/`await` to control when the cookie is set.

```js
// Example here...
```

## API

### `annoy(key, annoyance, [options])`

Run an annoying function if the user is new.

* **key** (string): Unique key to track the annoyance
* **annoyance** (function): Function to conditionally run. Return value
  is saved with the cookie. Existing cookie is passed to the function. If the
  function returns a `Promise`, the cookie will not be set until the `Promise`
  resolves.
* **options** (object): Includes all cookie options from RFC 6265
  * **shouldAnnoyIfCookiePresent** (function): Function to determine if the
    annoying function should be run even if the cookie is present. The cookie
    is passed as the first argument.
  * **path** (string): Cookie path, use `/` as the path if you want your cookie
    to be accessible on all pages.
  * **expires** (Date): Absolute expiration date for the cookie.
  * **maxAge** (number): Relative max age of the cookie from when the client
    receives it in seconds.
  * **domain** (string): Domain for the cookie (sub.domain.com or
    .allsubdomains.com).
  * **secure** (boolean): Is only accessible through HTTPS?
  * **httpOnly** (boolean): Is only accessible by HTTP(S)?

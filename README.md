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
annoy('newsletter-signup-2018-02', () => {
  window.alert('Give us your email address.')
})
```

### 3. That's it!

By default, your annoyance will be run once until the cookie expires (14 days
be default).

## API

Coming soon.

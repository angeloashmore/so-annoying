// Run a given function for each node found by a selector.
const forNodesBySelector = (selector, f) =>
  Array.from(document.querySelectorAll(selector)).forEach(f)

// Add a class name to each node.
export const addClassNameBySelector = (selector, className) =>
  forNodesBySelector(selector, node => node.classList.add(className))

// Remove a class name from each node.
export const removeClassNameBySelector = (selector, className) =>
  forNodesBySelector(selector, node => node.classList.remove(className))

// Add inline styles to each node.
export const addInlineStylesBySelector = (selector, styles) =>
  forNodesBySelector(selector, node =>
    node.setAttribute('style', `${node.style}; ${styles}`),
  )

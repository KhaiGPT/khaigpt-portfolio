/** The top bar takes the theme of whatever sits under it: any [data-dark] block crossing its midline turns it dark. */
export function syncTheme() {
  const line = 36
  let dark = false
  for (const el of document.querySelectorAll("[data-dark]")) {
    const r = el.getBoundingClientRect()
    if (r.top <= line && r.bottom > line) {
      dark = true
      break
    }
  }
  document.documentElement.dataset.theme = dark ? "dark" : "light"
}

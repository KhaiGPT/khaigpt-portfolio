import { clsx, type ClassValue } from "clsx"

export const cn = (...inputs: ClassValue[]) => clsx(inputs)

export const pad2 = (n: number) => String(n).padStart(2, "0")

/** Runs fn once the page has loaded and the main thread is idle, so first paint isn't contended. */
export function afterLoadIdle(fn: () => void) {
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 300))
  if (document.readyState === "complete") idle()
  else addEventListener("load", idle, { once: true })
  return () => removeEventListener("load", idle)
}

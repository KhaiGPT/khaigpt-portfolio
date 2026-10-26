import type { Art } from "@/content/art"

/** Tiny pub/sub so DOM components can drive the WebGL stage without React re-renders. */
export type ArtTarget = { art: Art; el: HTMLImageElement }

type Events = {
  art: [ArtTarget]
  ripple: [x: number, y: number, strength: number]
  wave: []
}

type Handler<K extends keyof Events> = (...args: Events[K]) => void

const handlers = new Map<keyof Events, Set<(...args: never[]) => void>>()
let lastArt: ArtTarget | null = null

export const stageBus = {
  emit<K extends keyof Events>(type: K, ...args: Events[K]) {
    if (type === "art") lastArt = args[0] as ArtTarget
    handlers.get(type)?.forEach((h) => (h as Handler<K>)(...args))
  },
  on<K extends keyof Events>(type: K, h: Handler<K>) {
    if (!handlers.has(type)) handlers.set(type, new Set())
    const set = handlers.get(type)!
    set.add(h as (...args: never[]) => void)
    return () => void set.delete(h as (...args: never[]) => void)
  },
  lastArt: () => lastArt,
}

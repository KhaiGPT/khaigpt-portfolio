export type Art = {
  id: string
  src: string
  w: number
  h: number
  alt: string
  /** sits on the mercury pool (rises out of it, casts a reflection) */
  reflect: boolean
  wave?: boolean
  /** normalized fingertip gap, where the spark lives */
  spark?: [number, number]
  mobile?: { src: string; w: number; h: number; spark: [number, number] }
}

export const MOBILE_ART_MQ = "(max-width: 767px) and (orientation: portrait)"

const a = (id: string, file: string, w: number, h: number, alt: string, extra: Partial<Art> = {}): Art => ({
  id,
  src: `/art/${file}.webp`,
  w,
  h,
  alt,
  reflect: true,
  ...extra,
})

export const art = {
  hero: a(
    "hero",
    "hero_wide",
    1264,
    458,
    "Two liquid-chrome hands reaching for each other, fingertips almost touching — Khai Huynh's nod to Michelangelo's Creation of Adam",
    {
      reflect: false,
      spark: [0.502, 0.49],
      mobile: { src: "/art/hero_tall.webp", w: 805, h: 1200, spark: [0.502, 0.487] },
    },
  ),
  wings: a("wings", "about_wings", 973, 931, "Liquid-chrome Icarus wings with feather tips melting into mercury, illustrating Khai Huynh's founder story"),
  promer: a("promer", "work_promer", 530, 877, "Chrome horseshoe magnet pulling tiny shopping bags toward it, representing AI-native growth for e-commerce teams at Promer AI"),
  indie: a("indie", "work_substack", 899, 679, "Liquid-chrome paper airplane in flight, representing the consumer apps Khai builds and ships as an indie developer"),
  nakame: a("nakame", "work_nakame", 900, 601, "Two puffy chrome party dice, one marked with a tiny heart, representing Nakame, the AI companion app Khai founded"),
  consulting: a("consulting", "work_consulting", 710, 832, "Open chrome pocket compass, representing Khai's product and growth consulting for consumer tech companies"),
  playsipher: a("playsipher", "work_playsipher", 688, 815, "Chrome arcade joystick, representing Khai's time as Head of Marketing at Sipher"),
  mckinsey: a("mckinsey", "work_mckinsey", 479, 876, "Polished chrome chess knight, representing Khai's strategy consulting at McKinsey & Company"),
  betteru: a("betteru", "work_betteru", 707, 630, "Halved avocado cast in liquid chrome, representing BetterU, the health food brand Khai founded"),
  quill: a("quill", "writing_quill", 746, 846, "Chrome feather quill dripping a single drop of mercury, illustrating Khai Huynh's writing"),
  bubble: a("bubble", "ask_bubble", 804, 760, "Puffy chrome speech bubble with three typing dots, inviting visitors to ask Khai a question"),
  wave: a("wave", "hi_wave", 505, 824, "Liquid-chrome hand waving hello, inviting visitors to get in touch with Khai Huynh", { wave: true }),
} satisfies Record<string, Art>

export type ArtKey = keyof typeof art

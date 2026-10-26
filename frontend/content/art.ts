export type Art = { src: string; w: number; h: number; alt: string }

const a = (file: string, w: number, h: number, alt: string): Art => ({ src: `/art/${file}.webp`, w, h, alt })

export const art = {
  compass: a("work_consulting", 710, 832, "Open liquid-chrome pocket compass, for Khai's independent product and growth advisory work"),
  magnet: a("work_promer", 530, 877, "Liquid-chrome horseshoe magnet pulling tiny shopping bags toward it, for growth work at Promer AI"),
  bubble: a("ask_bubble", 804, 760, "Puffy liquid-chrome speech bubble with three typing dots, standing for hands-on AI team workshops"),
  reptime: a("reptime", 560, 720, "RepTime app logo: a liquid-chrome kettlebell with a keyhole, lit orange and blue"),
  dice: a("work_nakame", 900, 601, "Two puffy chrome party dice, one marked with a tiny heart, for Nakame, the AI companion app Khai founded"),
  joystick: a("work_playsipher", 688, 815, "Chrome arcade joystick, for Khai's time as Head of Marketing at Sipher"),
  knight: a("work_mckinsey", 479, 876, "Polished chrome chess knight, for Khai's strategy consulting at McKinsey & Company"),
  avocado: a("work_betteru", 707, 630, "Halved avocado cast in liquid chrome, for BetterU, the health food brand Khai founded"),
  quill: a("writing_quill", 746, 846, "Chrome feather quill dripping a single drop of mercury, for Khai's newsletter Zero-One Shot"),
  wings: a("about_wings", 973, 931, "Liquid-chrome Icarus wings with feather tips melting into mercury"),
  khai: a("khai", 900, 900, "Khai Huynh, head-and-shoulders portrait in a black blazer and white tee"),
} satisfies Record<string, Art>

export type ArtKey = keyof typeof art

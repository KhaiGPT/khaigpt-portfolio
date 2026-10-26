export type Art = { src: string; w: number; h: number; alt: string }

const a = (file: string, w: number, h: number, alt: string): Art => ({ src: `/art/${file}.webp`, w, h, alt })

export const art = {
  compass: a("work_consulting", 710, 832, "Open liquid-chrome pocket compass, standing for the 10-day growth sprint that finds an app's direction"),
  magnet: a("work_promer", 530, 877, "Liquid-chrome horseshoe magnet pulling tiny shopping bags toward it, standing for ongoing fractional growth work"),
  bubble: a("ask_bubble", 804, 760, "Puffy liquid-chrome speech bubble with three typing dots, standing for hands-on AI team workshops"),
  wings: a("about_wings", 973, 931, "Liquid-chrome Icarus wings with feather tips melting into mercury"),
} satisfies Record<string, Art>

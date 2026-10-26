import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = HTMLAttributes<HTMLElement> & { i?: number; as?: ElementType; children?: ReactNode }

/** Staggered reveal item — choreographed purely in CSS by its chapter's data-state. */
export function R({ i = 0, as: Tag = "div", className, style, children, ...rest }: Props) {
  return (
    <Tag className={cn("rv", className)} style={{ "--i": i, ...style } as CSSProperties} {...rest}>
      {children}
    </Tag>
  )
}

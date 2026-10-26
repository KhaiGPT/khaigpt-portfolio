export const chapters = [
  { id: "hello", label: "hello", prompt: "" },
  { id: "about", label: "about", prompt: "so, who are you?" },
  { id: "work", label: "work", prompt: "show me the receipts." },
  { id: "writing", label: "writing", prompt: "what do you write about?" },
  { id: "ask", label: "ask me", prompt: "can i ask you something?" },
  { id: "hi", label: "say hi", prompt: "how do i reach you?" },
] as const

export type ChapterId = (typeof chapters)[number]["id"]

export const chapterIndex = (id: ChapterId) => chapters.findIndex((c) => c.id === id)

export type Reply = { to: ChapterId; text: string }

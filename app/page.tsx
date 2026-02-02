"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Section visible:", entry.target.id)
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center section-hidden"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Khai
                  <br />
                  <span className="text-muted-foreground">Huynh</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Growth marketing leader with 6+ years driving user growth at scale across consumer and gaming. Currently at the intersections of
                  <span className="text-foreground"> AI</span>,
                  <span className="text-foreground"> technology</span>, and
                  <span className="text-foreground"> culture</span>. Chat with my AI persona{" "}
                  <a
                    href="https://www.superme.ai/khai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    here
                  </a>
                  .
                </p>

                <div className="space-y-4">
                  <Link
                    href="https://cal.com/khaih"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">Book a discovery chat with me</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Remote</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Head of Growth & Marketing</div>
                  <div className="text-muted-foreground">@ Consumer AI</div>
                  <div className="text-xs text-muted-foreground">2026 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">KEY COMPETENCIES</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Product-Led Growth",
                    "Funnel Optimization & ASO",
                    "SEA Go-to-market",
                    "Acquisition & Retention Channels",
                    "Start-up",
                    "Cross-functional",
                    "A/B Testing & Experimentation",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 section-hidden"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2016 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025-Present",
                  role: "Growth Marketing",
                  company: "Promer.ai",
                  description:
                    "Core team of Promer AI where we are building B2B solutions to help e-com/DTC teams & individuals resolve scaling acquisition channels.",
                  tech: [
                    "GTM strategy",
                    "Funnel optimization & ASO",
                    "Growth & distribution channels",
                    "A/B testing & experimentation",
                    "B2B product-led growth",
                    "Cross-functional",
                  ],
                },
                {
                  year: "2025-Present",
                  role: "Indie Builder",
                  company: "KhaiGPT.substack.com",
                  description:
                    "I hunt for invisible shifts in startup, tech, and culture. Occasionally ship stuff with AI and share my experience.",
                  tech: [
                    "Content creation", 
                    "GTM", 
                    "AI automation", 
                    "Context engineering", 
                    "AI coding",
                  ]
                },
                {
                  year: "2024-2025",
                  role: "Product & GTM",
                  company: "Nakame.social",
                  description:
                    "Founder of Nakame.social, where we built a wholesome hybrid of AI companion and Mario Party with feel-good games.",
                  tech: [
                    "GTM",
                    "Product development",
                    "Consumer product-led growth",
                    "Start-up",
                    "Growth & distribution channels",
                    "A/B testing & experimentation",
                  ],
                },
                {
                  year: "2022-Present",
                  role: "GTM & Growth",
                  company: "Freelance Advisor/Fractional Head",
                  description:
                    "Identify the right go-to-market wedges, then execute at scale. Defined directions and growth loops for consumer & gaming projects that consistently punch above their weight.",
                  tech: [
                    "GTM",
                    "Start-up",
                    "Acquisition & retention channels",
                    "A/B testing & experimentation",
                    "Client relationship management",
                  ],
                },
                {
                  year: "2021-2023",
                  role: "GTM & Marketing",
                  company: "PlaySipher.com",
                  description:
                    "Founding member of Ather Labs, top 5 fastest-growing free game of SEA in 2022 where I owned GTM, campaign P&L, and attribution.",
                  tech: [
                    "GTM",
                    "Start-up",
                    "Consumer product-led growth",
                    "Funnel optimization & ASO",
                    "A/B testing & experimentation",
                    "Growth & distribution channels",
                  ],
                },
                {
                  year: "2018-2019",
                  role: "Associate Consultant",
                  company: "McKinsey & Company",
                  description:
                    "Offered strategic consulting with a focus on the technology sector, particularly in e-commerce transformation.",
                  tech: [
                    "GTM strategy",
                    "Segmentation & product positioning",
                    "A/B testing & experimentation",
                    "Client relationship management",
                    "Cross-functional",
                    "E-commerce",
                  ],
                },
                {
                  year: "2016-2020",
                  role: "Founder",
                  company: "BetterU Health & Wellness",
                  description:
                    "Bootstrapped a new F&B concept with a 30% monthly growth rate, grew 5 outlets in Vietnam & Cambodia within 14 months.",
                  tech: [
                    "Marketing & distribution channels",
                    "GTM",
                    "Start-up",
                    "Business scalability",
                    "Partner relationship management",
                  ],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 section-hidden"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "how to build your own AI assistant (the one that's actually useful).",
                  excerpt: "it's not about magic prompts. it's about giving your chatbot a job and a memory.",
                  date: "2025",
                  readTime: "7 min",
                  url: "https://khaigpt.substack.com/p/how-to-build-your-own-ai-assistant",
                },
                {
                  title: "thinking is the only moat left.",
                  excerpt: "and most people are giving it away for free.",
                  date: "2025",
                  readTime: "3 min",
                  url: "https://khaigpt.substack.com/p/thinking-is-the-only-moat-left",
                },
                {
                  title: "so, we all have to learn to code now?",
                  excerpt:
                    "a realistic guide to 'vibe coding' that won't make you a bad developer and a distracted marketer.",
                  date: "2025",
                  readTime: "4 min",
                  url: "https://khaigpt.substack.com/p/so-we-all-have-to-learn-to-code-now",
                },
                {
                  title: 'optimize for "fun".',
                  excerpt: "why it beats every dashboard you're staring at.",
                  date: "2025",
                  readTime: "4 min",
                  url: "https://khaigpt.substack.com/p/optimize-for-fun",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      >
                        <span>khaigpt.substack.com</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 section-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about startup, culture-shaping technologies
                  and growth/marketing.
                </p>

                <div className="space-y-4">
                  <Link
                    href="https://cal.com/khaih"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">Book a discovery chat with me</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Substack", handle: "@KhaiGPT", url: "https://khaigpt.substack.com" },
                  { name: "X", handle: "@KhaiGPT", url: "https://x.com/khaiGPT" },
                  { name: "Linkedin", handle: "KhaiGPT", url: "https://www.linkedin.com/in/khaidhuynh/" },
                  { name: "Superme agent", handle: "Khai", url: "https://www.superme.ai/khai" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm block"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Khai Huynh. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}

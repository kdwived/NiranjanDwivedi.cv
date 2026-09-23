import { useState } from 'react'
import { Card, Eyebrow, Reveal, Section } from '../components/ui'
import BrandIcon from '../components/BrandIcon'
import { profile, web3formsKey } from '../data/portfolio'

const field =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-cyan/50'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  /**
   * Posts to Web3Forms when an access key is set in `src/data/portfolio.ts`.
   * With no key it falls back to composing the mail locally, so the form is
   * never a dead end.
   */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!web3formsKey) {
      const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`.trim())
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio enquiry from ${form.name}`,
          message: form.message,
          from_name: 'niranjandwivedi.cv',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setError(data.message || 'Something went wrong. Please email me directly.')
      }
    } catch {
      setStatus('error')
      setError('Could not reach the server. Please email me directly.')
    }
  }

  return (
    <Section id="contact">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="section-title">
          Let's <span className="grad-text">Connect.</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/50">
          Have a project, business opportunity, collaboration idea or simply want to connect? Send a
          message and let's discuss how we can turn an idea into something meaningful.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            <Card accent="#22d3ee">
              <p className="eyebrow mb-4">Direct</p>
              <a
                href={`mailto:${profile.email}`}
                className="block text-lg font-semibold text-white transition-colors hover:text-cyan"
              >
                {profile.email}
              </a>
              <p className="mt-1 text-xs text-white/35">
                Projects, collaborations &amp; business opportunities
              </p>

              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="mt-6 block text-lg font-semibold text-white transition-colors hover:text-cyan"
              >
                {profile.phone}
              </a>
              <p className="mt-1 text-xs text-white/35">Available for professional conversations</p>
            </Card>

            <Card>
              <p className="eyebrow mb-3">Find me online</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Facebook', href: profile.facebook },
                  { name: 'Instagram', href: profile.instagram },
                  { name: 'GitHub', href: profile.github },
                  { name: 'Gmail', href: `mailto:${profile.email}` },
                  {
                    name: 'WhatsApp Marketing',
                    href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`,
                    label: 'WhatsApp',
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-xs text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <BrandIcon name={s.name} size={26} />
                    {s.label ?? s.name}
                  </a>
                ))}
              </div>

              <p className="eyebrow mb-3 mt-7">Based in</p>
              <p className="text-sm text-white/70">{profile.location}</p>
              <p className="mt-1 text-xs text-white/35">Originally from {profile.origin}</p>
              <div className="mt-5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                </span>
                <span className="text-xs text-white/50">
                  Open to selected projects &amp; collaborations
                </span>
              </div>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card accent="#8b5cf6" className="h-full">
            <p className="eyebrow mb-5">Send a message</p>

            {status === 'sent' ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 text-2xl text-cyan">
                  ✓
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-white/45">
                  Thanks for reaching out — I'll get back to you as soon as I can.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                {/* honeypot — bots fill this, people never see it */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className={field}
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={field}
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <input
                  name="subject"
                  className={field}
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <textarea
                  required
                  name="message"
                  rows={5}
                  className={`${field} resize-none`}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan to-violet px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>

                {status === 'error' && (
                  <p className="pt-1 text-center text-[11px] text-rose-300/80">{error}</p>
                )}
                <p className="pt-1 text-center text-[11px] text-white/30">
                  {web3formsKey
                    ? 'Delivered straight to my inbox.'
                    : 'Opens your mail app — add a Web3Forms key to send it here instead.'}
                </p>
              </form>
            )}
          </Card>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <footer className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-lg font-semibold text-white">{profile.name}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
            Marketing • Technology • AI • Automation
          </p>
          <p className="mt-6 text-xs text-white/25">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </footer>
      </Reveal>
    </Section>
  )
}

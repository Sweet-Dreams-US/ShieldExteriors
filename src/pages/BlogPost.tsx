import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { CtaBand } from '../components/sections'
import { Reveal } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { POSTS } from '../data/site'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  if (!post) return <Navigate to="/blog" replace />

  useSEO({ title: `${post.title} | Shield Exteriors Learn`, description: post.excerpt })

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  return (
    <>
      <article className="bg-bone pt-28 lg:pt-36">
        <div className="wrap-tight">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink">
              <ArrowLeft size={16} /> All articles
            </Link>
            <span className="mt-6 block pill w-fit border-amber/40 bg-amber/10 text-amber-deep">{post.category}</span>
            <h1 className="mt-4 h-display text-[2.4rem] leading-[1.02] text-ink sm:text-[3rem]">{post.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/45"><Clock size={14} /> {post.read} · {post.date}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative mt-8 overflow-hidden rounded-3xl border shadow-xl">
              <video ref={videoRef} className="aspect-video w-full object-cover" src={asset('assets/hero-roof.mp4')} poster={post.image} playsInline loop onClick={toggle} />
              {!playing && (
                <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-ink/30" aria-label="Play">
                  <span className="anim-pulse-ring flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink"><Play size={26} className="ml-1 fill-ink" /></span>
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="prose mx-auto mt-10 max-w-none">
              {post.body.map((para, i) => (
                <p key={i} className="mb-5 text-[17px] leading-[1.75] text-ink/80">{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="my-12 flex flex-col items-center gap-4 rounded-2xl border-2 border-amber/30 bg-ink p-8 text-center text-bone grain">
              <h3 className="h-display text-2xl">Ready to see your options?</h3>
              <p className="max-w-md text-bone/75">A free, no-pressure inspection turns all of this into real numbers for your home.</p>
              <CtaButton source={`Blog — ${post.slug}`}>Get My Free Inspection</CtaButton>
            </div>
          </Reveal>
        </div>
      </article>

      <CtaBand />
    </>
  )
}

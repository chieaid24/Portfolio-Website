'use client'
import { useEffect, useState, useMemo } from 'react'
import ChessRapid from '@/icons/ChessRapid'
import ChessBlitz from '@/icons/ChessBlitz'
import ChessBullet from '@/icons/ChessBullet'
import ChessPuzzle from '@/icons/ChessPuzzle'
import Image from 'next/image'


function Rating({ label, value, Icon, className = "", spanClassName = "" }) {
  return (
    <div className={`flex flex-col items-center rounded-xl bg-[#484848] px-3 py-2 font-medium aspect-square justify-center gap-0.5 hover:translate-y-[-2px] duration-200 ] cursor-default`}>
      <div className={`flex items-center gap-1.5 ${spanClassName}`}>
        <div className={`mt-1 flex items-center`}>
          {Icon ? <Icon className={`w-7 h-8 ${className}`} aria-hidden /> : null}
        </div>
        <div className="text-lg text-chess-text-grey font-semibold">{label}</div>
      </div>
      <div className="text-[38px] font-extrabold tabular-nums leading-[48px]">{value ?? '—'}</div>
    </div>
  )
}

function formatDate(epochSeconds) {
  if (!epochSeconds) return '—'
  return new Date(epochSeconds * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatDateTime(epochSeconds) {
  if (!epochSeconds) return '—'
  return new Date(epochSeconds * 1000).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function ChessWidget() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
      ; (async () => {
        try {
          setError(null)
          const res = await fetch('/api/chess')
          if (!res.ok) throw new Error(`API failed: ${res.status}`)
          const json = await res.json()
          if (!cancelled) setData(json)
        } catch (e) {
          if (!cancelled) setError(e.message || 'Failed to load')
        }
      })()
    return () => { cancelled = true }
  }, [])

  const profile = data?.profile
  const stats = data?.stats

  const ratings = useMemo(() => ({
    rapid: stats?.chess_rapid?.last?.rating ?? '—',
    blitz: stats?.chess_blitz?.last?.rating ?? '—',
    bullet: stats?.chess_bullet?.last?.rating ?? '—',
    puzzle: stats?.tactics?.highest?.rating ?? '—',
  }), [stats])

  return (
    <div className="rounded-xl bg-[#5B5B5B] p-4 h-[352px] flex flex-col text-white-text">
      {/* Header */}
      <div className="flex items-center gap-3 mt-5 mx-2">
        <Image
          src={profile?.avatar || '/about/chess_profile_backup'}
          alt=""
          width={90}
          height={90}
          className="rounded-2xl self-center hover:scale-105 duration-200"
          onError={(e) => { e.currentTarget.src = '/favicon.ico' }}
        />
        <div>
          {/* Username (hover → underline, click → profile) */}
          <a
            href={profile?.url ?? 'https://www.chess.com/member/mangus_carlston'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[35px] truncate hover:opacity-80 transition-opacity duration-150"
          >
            @{profile?.username ?? '—'}
          </a>
          <div className="text-[13px] text-chess-text-grey">aidan's (mediocre) chess account!</div>
          <div className="flex flex-wrap gap-2.5 text-[12px] font-semibold mt-0.5">
            <div>{formatDate(profile?.joined)} <span className="text-chess-text-grey">joined</span></div>
            <div>{profile?.followers ?? 0} <span className="text-chess-text-grey">followers</span></div>
            <div>{formatDateTime(profile?.last_online)} <span className="text-chess-text-grey">last online</span></div>
          </div>
        </div>
      </div>

      {/* Ratings with icons */}
      <div className="mt-6.5 grid grid-cols-4 gap-2">
        <Rating label="Rapid" value={ratings.rapid} Icon={ChessRapid} className="-translate-y-[2px]" spanClassName="-translate-x-1" />
        <Rating label="Blitz" value={ratings.blitz} Icon={ChessBlitz} className="-translate-y-[3px]" spanClassName="-translate-x-[5px]" />
        <Rating label="Bullet" value={ratings.bullet} Icon={ChessBullet} />
        <Rating label="Puzzles" value={ratings.puzzle} Icon={ChessPuzzle} />
      </div>

      <a href="https://www.chess.com/member/mangus_carlston" target="_blank" rel="noopener noreferrer" className="self-end mt-auto ">
        <Image
          src="/about/chess_logo.svg"
          alt="Chess.com logo"
          width={125}
          height={125}
          className="cursor-pointer"
        />
      </a>


      {/* States */}
      {error && <div className="mt-3 text-xs text-red-300">{error}</div>}
      {!data && !error && <div className="mt-3 text-xs text-neutral-200/70 animate-pulse">Loading Chess.com data…</div>}
    </div>
  )
}

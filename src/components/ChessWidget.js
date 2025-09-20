'use client'
import { useEffect, useState, useMemo } from 'react'
import ChessRapid from '@/icons/ChessRapid'
import ChessBlitz from '@/icons/ChessBlitz'
import ChessBullet from '@/icons/ChessBullet'
import ChessPuzzle from '@/icons/ChessPuzzle'
import Image from 'next/image'


function Rating({ label, value, Icon, className = "", spanClassName = "" }) {
  return (
    <div className={`flex items-center rounded-xl bg-[#484848] px-[11px] font-medium py-[12px] justify-center hover:translate-y-[-2px] duration-200 cursor-default gap-x-3
                      sm:flex-col sm:px-3 sm:py-2 sm:gap-0.5 sm:aspect-square`}>
      <div className={`flex items-center gap-1.5 ${spanClassName}`}>
        <div className={`mt-1 flex items-center`}>
          {Icon ? <Icon className={`w-11 h-11 sm:w-8 sm:h-8 translate-y-[-3px] ${className} `} aria-hidden /> : null}
        </div>
        <div className="text-[18px] sm:text-lg text-chess-text-grey font-semibold hidden sm:block">{label}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[12px] sm:text-lg text-chess-text-grey font-semibold block sm:hidden">{label}</div>
        <div className="text-[27px] sm:text-[38px] font-extrabold tabular-nums leading-6 sm:leading-[48px]  sm:translate-0">{value ?? '—'}</div>
      </div>
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

function useIsSmall() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)"); // Tailwind sm breakpoint
    const handler = (e) => setIsSmall(e.matches);
    setIsSmall(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isSmall;
}

export default function ChessWidget() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isSmall = useIsSmall();

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
    <div className="rounded-xl bg-[#5B5B5B] py-6.5 px-1.5 sm:p-4 h-[352px] flex flex-col text-white-text justify-between">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 sm:mt-5 mx-2">
        <Image
          src={profile?.avatar || '/about/chess_profile_backup.jpg'}
          alt="My Chess.com profile picture"
          width={90}
          height={90}
          className="rounded-2xl self-center hover:scale-105 duration-200 hidden sm:block"
          onError={(e) => { e.currentTarget.src = '/favicon.ico' }}
        />
        <div className="flex flex-col gap-1 items-center  
                        sm:gap-0 sm:items-start ">
          <a
            href={profile?.url ?? 'https://www.chess.com/member/mangus_carlston'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black sm:font-bold text-[31px] sm:text-[35px] truncate hover:opacity-80 transition-opacity duration-150"
          >
            @{profile?.username ?? '—'}
          </a>

          <div className="flex">
            <Image
              src={profile?.avatar || '/about/chess_profile_backup.jpg'}
              alt="My Chess.com profile picture"
              width={65}
              height={65}
              className="rounded-2xl self-center block sm:hidden"
            />
            <div className="flex flex-col gap-y-[3px] pl-4 sm:gap-0 sm:pl-0">
              <div className="text-[13px] text-chess-text-grey italic sm:not-italic">aidan&apos;s (mediocre) chess account!</div>
              {/**greater than small screens this desc. shows up */}
              <div className="flex-wrap text-[12px] font-semibold hidden sm:flex gap-2.5 mt-0.5">
                <div>{formatDate(profile?.joined)} <span className="text-chess-text-grey">joined</span></div>
                <div>{profile?.followers ?? 0} <span className="text-chess-text-grey">followers</span></div>
                <div>{formatDateTime(profile?.last_online)} <span className="text-chess-text-grey">last online</span></div>
              </div>

              {/**less than small screens this desc. shows up */}
              <div className="flex flex-col text-[12px] font-semibold sm:hidden">
                <div className="flex gap-2">
                  <div>{formatDate(profile?.joined)} <span className="text-chess-text-grey">joined</span></div>
                  <div>{profile?.followers ?? 0} <span className="text-chess-text-grey">followers</span></div>
                </div>
                <div>{formatDateTime(profile?.last_online)} <span className="text-chess-text-grey">last online</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings with icons */}
      <div className=" grid grid-cols-2 gap-4 mx-auto mt-auto 
                      sm:grid-cols-4 sm:mx-0 sm:mt-6.5 sm:gap-x-2">
        <Rating label="Rapid" value={ratings.rapid} Icon={ChessRapid} className="-translate-x-[-2px]" spanClassName="-translate-x-[5px]" />
        <Rating label="Blitz" value={ratings.blitz} Icon={ChessBlitz} className="-translate-x-[-3px]" spanClassName="-translate-x-[8px]" />
        <Rating label="Bullet" value={ratings.bullet} Icon={ChessBullet} />
        <Rating label="Puzzles" value={ratings.puzzle} Icon={ChessPuzzle} />
      </div>

      <a href="https://www.chess.com/member/mangus_carlston" target="_blank" rel="noopener noreferrer" className="self-end mt-auto ">
        <Image
          src="/about/chess_logo.svg"
          alt="Chess.com logo"
          width={125}
          height={125}
          className="cursor-pointer hidden sm:block"
        />
      </a>
      {/* States */}
      {error && <div className="mt-3 text-xs text-red-300">{error}</div>}
      {!data && !error && <div className="mt-3 text-xs text-neutral-200/70 animate-pulse self-center">Loading Chess.com data…</div>}
    </div>
  )
}

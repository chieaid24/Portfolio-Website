// components/SpotifyEmbed.jsx
export default function SpotifyEmbed({
  playlistId,        // e.g. "1oQngKRVkU7oI8hmB4hf7i"
  theme = 0,         // 0 = dark, 1 = light
  height = 352,      // px
  className = "",    // extra Tailwind classes
}) {
  const src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`;

  return (
    <iframe
    style={{borderRadius:12 + "px"}}
      title="Spotify playlist"
      className={`w-full rounded-none ${className}`}
      src={src}
      height={height}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

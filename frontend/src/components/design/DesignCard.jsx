import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Download } from 'lucide-react';

/**
 * Renders the snippet HTML+CSS inside a tiny sandboxed iframe that is
 * CSS-scaled down to fill the card's aspect-video thumbnail area.
 *
 * The iframe is rendered at 1200×675 (16:9 at full desktop width) and
 * scaled down via transform: scale() so the design looks exactly as it
 * would in a browser — no "Preview unavailable" fallback needed.
 */
function SnippetThumbnail({ html, css, title }) {
  const RENDER_W = 1200;
  const RENDER_H = 675;

  const srcDoc = useMemo(() => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${RENDER_W}px;height:${RENDER_H}px;overflow:hidden}
  ${css || ''}
</style>
</head>
<body>${html || ''}</body>
</html>`, [html, css]);

  const wrapRef = useRef(null);

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden' }}
    >
      <iframe
        title={title}
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        scrolling="no"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${RENDER_W}px`,
          height: `${RENDER_H}px`,
          border: 'none',
          transformOrigin: 'top left',
          /* Scale to fill: containerWidth / RENDER_W.
             We use a CSS custom property set by a ResizeObserver below,
             falling back to calc for SSR / first paint. */
          transform: 'scale(var(--thumb-scale, 0.27))',
          pointerEvents: 'none',
        }}
        onLoad={(e) => {
          // Once the iframe is in the DOM we know the container width and
          // can set the exact scale so the snippet fills the card perfectly.
          const wrap = e.currentTarget.parentElement;
          if (wrap) {
            const scale = wrap.offsetWidth / RENDER_W;
            wrap.style.setProperty('--thumb-scale', scale);
            // Keep height in sync (56.25% padding-bottom already handles it,
            // but set explicit height to prevent any gap on very small cards).
            wrap.style.paddingBottom = `${(RENDER_H / RENDER_W) * 100}%`;
          }
        }}
      />
    </div>
  );
}

export default function DesignCard({ design, wishlisted, onToggleWishlist }) {
  const hasSnippet = Boolean(design.snippet_html);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Link to={`/app/designs/${design.id}`} className="block">
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {hasSnippet ? (
            <SnippetThumbnail
              html={design.snippet_html}
              css={design.snippet_css}
              title={design.title}
            />
          ) : design.thumbnail ? (
            <img
              src={design.thumbnail}
              alt={design.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              Preview unavailable
            </div>
          )}
        </div>
      </Link>

      {/* Hover overlay — "click to view" cue */}
      <Link
        to={`/app/designs/${design.id}`}
        className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100"
        style={{ top: 0, height: 'calc(100% - 72px)' }}
        aria-label={`View ${design.title}`}
      >
        <span className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow">
          View Design
        </span>
      </Link>

      <button
        onClick={() => onToggleWishlist?.(design.id)}
        className={`absolute right-2 top-2 z-10 rounded-full p-2 shadow ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
          }`}
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="p-3">
        <Link
          to={`/app/designs/${design.id}`}
          className="block truncate font-semibold text-gray-900 hover:text-brand-600 dark:text-gray-100"
        >
          {design.title}
        </Link>
        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {design.description}
        </p>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Eye size={12} /> {design.views_count ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <Download size={12} /> {design.downloads_count ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
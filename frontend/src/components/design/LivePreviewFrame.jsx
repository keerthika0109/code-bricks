import { useMemo } from 'react';

/**
 * Renders a design's html/css/js inside a sandboxed iframe via `srcDoc`.
 * This is what powers both the static detail-page preview AND the live
 * customizer (where css changes as the user drags color/radius controls).
 *
 * sandbox="allow-scripts" lets the snippet's own script.js run (for things
 * like password-toggle buttons, modals, etc.) but blocks it from touching
 * the parent page, navigating top-level, or accessing cookies/storage.
 */
export default function LivePreviewFrame({ html, css, js, title = 'Live preview' }) {
  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${css || ''}</style>
</head>
<body>
${html || ''}
<script>${js || ''}</script>
</body>
</html>`;
  }, [html, css, js]);

  return (
    <iframe
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className="snippet-iframe rounded-lg"
    />
  );
}

const FONT = "'Gilroy','Plus Jakarta Sans',-apple-system,sans-serif";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";

const CSS = `@import url('${FONT_URL}');*{-webkit-tap-highlight-color:transparent;user-select:none;box-sizing:border-box}::-webkit-scrollbar{width:0}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.8}}@keyframes resultRing{from{stroke-dashoffset:515}to{stroke-dashoffset:140}}@keyframes evaBioTilePulse{0%,100%{box-shadow:0 0 0 0 rgba(0,173,128,0.25)}50%{box-shadow:0 0 0 8px rgba(0,173,128,0)}}@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }@keyframes bioRingFill{from{stroke-dashoffset:440}to{stroke-dashoffset:0}}@keyframes bioCountUp{from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)}}@keyframes bioSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes bioPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,173,128,0.4)}50%{box-shadow:0 0 0 12px rgba(0,173,128,0)}}
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
    @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}`;

// ── UI Components ──

const SAFE_TOP = 16;

export { FONT, FONT_URL, CSS, SAFE_TOP };

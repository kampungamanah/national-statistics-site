// Small SVG chart builders. No library, no network: each function takes a series and
// returns an SVG string. All charts share the same palette and type scale.

const fmt = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// A line chart with a horizontal grid, a labelled y axis and a value on every point.
// `series` is [[year, value], ...]; `opts` sets width, height and decimals.
export function lineChart(series, opts = {}) {
  const w = opts.width || 720;
  const h = opts.height || 300;
  const padL = 56, padR = 14, padT = 18, padB = 34;
  const decimals = opts.decimals ?? 2;
  const vals = series.map((p) => p[1]);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (lo === hi) { lo -= 1; hi += 1; }
  const span = hi - lo;
  lo -= span * 0.12;
  hi += span * 0.12;
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / (hi - lo);
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = lo + ((hi - lo) * t) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e2e8f0" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(v, decimals)}</text>`;
  }
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  const dots = series.map((p, i) => {
    const showLabel = opts.showLabels !== false && (i === 0 || i === series.length - 1 || i % 3 === 0);
    return `<circle cx="${x(i)}" cy="${y(p[1])}" r="4" fill="#0f766e" stroke="#fff" stroke-width="1.5"/>` +
      (showLabel ? `<text x="${x(i)}" y="${y(p[1]) - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f766e">${fmt(p[1], decimals)}</text>` : '');
  }).join('');
  const years = series.map((p, i) => `<text x="${x(i)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="#64748b">${p[0]}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart">${grid}` +
    `<polyline points="${points}" fill="none" stroke="#0f766e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` +
    `${dots}${years}</svg>`;
}

// A horizontal bar chart: label on the left, value at the end of each bar.
export function barChart(rows, opts = {}) {
  const w = opts.width || 720;
  const rowH = opts.rowHeight || 34;
  const labelW = opts.labelWidth || 190;
  const h = rows.length * rowH + 14;
  const max = Math.max(...rows.map((r) => r.value));
  const decimals = opts.decimals ?? 1;
  const suffix = opts.suffix || '';
  const bars = rows.map((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - 90) * r.value) / max;
    return `<text x="0" y="${y + 15}" font-size="13" fill="#1e293b">${esc(r.label)}</text>` +
      `<rect x="${labelW}" y="${y}" width="${Math.max(bw, 2)}" height="20" rx="3" fill="${r.colour || '#0f766e'}"/>` +
      `<text x="${labelW + bw + 8}" y="${y + 15}" font-size="13" font-weight="600" fill="#0f766e">${fmt(r.value, decimals)}${suffix}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart">${bars}</svg>`;
}

// A donut chart with a legend column beside it.
export function donutChart(slices, opts = {}) {
  const size = opts.size || 220;
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;
  const total = slices.reduce((a, s) => a + s.share, 0);
  let angle = -90;
  let arcs = '';
  for (const s of slices) {
    const frac = s.share / total;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    arcs += `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${s.colour}" stroke="#fff" stroke-width="2"/>`;
    angle += frac * 360;
  }
  arcs += `<circle cx="${cx}" cy="${cy}" r="46" fill="#fff"/>` +
    `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="20" font-weight="700" fill="#0f172a">${fmt(total, 1)}%</text>` +
    `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">of total</text>`;
  const legend = slices.map((s) =>
    `<li><span class="swatch" style="background:${s.colour}"></span>${esc(s.label)} <strong>${fmt(s.share, 1)}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart">${arcs}</svg>` +
    `<ul class="legend">${legend}</ul></div>`;
}

// The router and the controls. Hash routes name the pages; every button, search box
// and sort header on a page does what it says, wired up here after each render.
//
//   #/                overview
//   #/population      population
//   #/economy         economy
//   #/prices          prices and inflation
//   #/jobs            jobs
//   #/people          people and wellbeing
//   #/regions         regions
//   #/sources         sources and methods
//
// window.__shotReady is false while a page renders and true once it is on screen, so a
// screenshot script knows when to capture.

import { INDICATORS, PROVINCES, SERIES } from './data.js';
import { lineChart } from './charts.js';
import { economy, jobs, missing, overview, people, population, prices, regions, sources } from './views.js';

const app = document.getElementById('app');

const PAGES = {
  '': overview,
  population,
  economy,
  prices,
  jobs,
  people,
  regions,
  sources,
};

const TITLES = {
  '': 'NusaStats — Indonesia in Numbers',
  population: 'Population | NusaStats',
  economy: 'Economy | NusaStats',
  prices: 'Prices & Inflation | NusaStats',
  jobs: 'Jobs | NusaStats',
  people: 'People & Wellbeing | NusaStats',
  regions: 'Regions | NusaStats',
  sources: 'Sources & Methods | NusaStats',
};

// The overview's chart switcher: which metric is plotted, and which years.
let chartMetric = 'gdpGrowth';
let chartRange = 'all';

function renderChart() {
  const host = document.getElementById('main-chart');
  if (!host) return;
  const series = SERIES[chartMetric];
  const values = chartRange === '5' ? series.values.slice(-5) : series.values;
  host.innerHTML = lineChart(values);
  const title = document.getElementById('chart-title');
  const source = document.getElementById('chart-source');
  if (title) title.textContent = `${series.label}, ${values[0][0]}–${values[values.length - 1][0]}`;
  if (source) source.textContent = `${series.unit} · Source: ${series.source}`;
}

function wireOverview() {
  document.querySelectorAll('[data-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      chartMetric = btn.dataset.metric;
      document.querySelectorAll('[data-metric]').forEach((b) => b.classList.toggle('active', b === btn));
      renderChart();
    });
  });
  document.querySelectorAll('[data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      chartRange = btn.dataset.range;
      document.querySelectorAll('[data-range]').forEach((b) => b.classList.toggle('active', b === btn));
      renderChart();
    });
  });
  const search = document.getElementById('indicator-search');
  const table = document.getElementById('indicator-table');
  const count = document.getElementById('indicator-count');
  if (search && table) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      let shown = 0;
      rows.forEach((row) => {
        const hit = !q || row.textContent.toLowerCase().includes(q);
        row.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      if (count) count.textContent = `${shown} of ${INDICATORS.length} indicators`;
    });
  }
}

// The regions table: live search plus sorting by name, population or share.
function wireRegions() {
  const search = document.getElementById('province-search');
  const body = document.getElementById('province-body');
  const count = document.getElementById('province-count');
  if (!body) return;
  let rows = [...PROVINCES];
  let sortKey = 'pop';
  let sortDir = -1;
  let query = '';

  const fmt = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  function paint() {
    const shown = rows
      .filter((p) => !query || p.name.toLowerCase().includes(query))
      .sort((a, b) => (typeof a[sortKey] === 'string'
        ? a[sortKey].localeCompare(b[sortKey]) * sortDir
        : (a[sortKey] - b[sortKey]) * sortDir));
    body.innerHTML = shown.map((p) =>
      `<tr><td>${p.name}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${fmt(p.share, 1)}%</td></tr>`).join('');
    if (count) count.textContent = `${shown.length} of ${PROVINCES.length} provinces shown`;
  }

  if (search) {
    search.addEventListener('input', () => {
      query = search.value.trim().toLowerCase();
      paint();
    });
  }
  document.querySelectorAll('#province-table .sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
      paint();
    });
  });
  paint();
}

function render() {
  window.__shotReady = false;
  const slug = (location.hash.match(/^#\/([^/?]+)/) || [])[1] || '';
  const page = PAGES[slug] || missing;
  document.title = TITLES[slug] || 'Page not found | NusaStats';
  app.innerHTML = page();
  document.querySelectorAll('nav a').forEach((a) => {
    const target = (a.getAttribute('href') || '').replace(/^#\//, '');
    a.classList.toggle('active', target === slug);
    a.setAttribute('aria-current', target === slug ? 'page' : 'false');
  });
  if (slug === '') wireOverview();
  if (slug === 'regions') wireRegions();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();

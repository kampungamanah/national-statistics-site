// HTML for each page of the site, built from the data in data.js. Every value shown is
// escaped before it goes into the page, and every figure carries its source and year.

import { AGE_STRUCTURE, COUNTRY, HEADLINES, INDICATORS, LARGEST_INDUSTRIES, PROVINCES, RELEASES, SECTOR_GROUPS, SERIES } from './data.js';
import { barChart, donutChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 2) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function kpiCards() {
  return HEADLINES.map((h) => `<a class="kpi" href="${h.href}">
    <span class="kpi-label">${esc(h.label)}</span>
    <span class="kpi-value">${esc(h.value)}</span>
    <span class="kpi-note">${esc(h.note)}</span>
    <span class="kpi-source">Source: ${esc(h.source)}</span>
  </a>`).join('');
}

function indicatorRows(list) {
  return list.map((i) => `<tr>
    <td>${esc(i.name)}</td><td class="num">${esc(i.value)}</td>
    <td class="num">${esc(i.year)}</td><td>${esc(i.source)}</td><td>${esc(i.topic)}</td>
  </tr>`).join('');
}

function releasesList() {
  return RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span>
    <span class="rel-title">${esc(r.title)}</span><span class="rel-source">${esc(r.source)}</span></li>`).join('');
}

export function overview() {
  return `<section class="hero">
    <p class="eyebrow">Republic of Indonesia &middot; Official statistics, 2015&ndash;2024</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">The population, the economy, prices, jobs and wellbeing of the world&rsquo;s
    fourth most populous country &mdash; every figure with its source and year, and
    nothing behind a login or a download form.</p>
  </section>
  <section class="kpis" aria-label="Headline indicators">${kpiCards()}</section>

  <section class="panel">
    <div class="panel-head">
      <div>
        <h2 id="chart-title">Real GDP growth, 2015&ndash;2024</h2>
        <p class="panel-sub" id="chart-source">Percent per year &middot; Source: BPS, 2024</p>
      </div>
      <div class="controls" role="group" aria-label="Choose the indicator to chart">
        <button class="chip active" data-metric="gdpGrowth" type="button">GDP growth</button>
        <button class="chip" data-metric="inflation" type="button">Inflation</button>
        <button class="chip" data-metric="poverty" type="button">Poverty</button>
        <button class="chip" data-metric="unemployment" type="button">Unemployment</button>
      </div>
    </div>
    <div class="controls range" role="group" aria-label="Choose the years shown">
      <button class="chip small active" data-range="all" type="button">2015&ndash;2024</button>
      <button class="chip small" data-range="5" type="button">Last 5 years</button>
    </div>
    <div id="main-chart">${lineChart(SERIES.gdpGrowth.values)}</div>
    <p class="panel-note">Growth stayed near 5% a year through the decade, except for the
    pandemic contraction of &minus;2.07% in 2020. The 2024 figure, 5.03%, is the
    fourth straight year of growth above 5% since the pandemic.</p>
  </section>

  <div class="two-col">
    <section class="panel">
      <h2>Largest provinces</h2>
      <p class="panel-sub">Population, millions &middot; Census 2020, BPS</p>
      ${barChart(PROVINCES.slice(0, 5).map((p) => ({ label: p.name, value: p.pop, colour: '#0f766e' })), { decimals: 2, suffix: 'm' })}
      <p class="panel-note">Java holds 56.1% of the population on 6.7% of the land area.
      West Java alone, 48.27 million people, is larger than most countries.
      <a href="#/regions">See all provinces &rarr;</a></p>
    </section>
    <section class="panel">
      <h2>Latest releases</h2>
      <p class="panel-sub">What the statistical office published most recently</p>
      <ul class="releases">${releasesList()}</ul>
    </section>
  </div>

  <section class="panel">
    <h2>Browse every indicator</h2>
    <p class="panel-sub">Type to filter the full catalogue &mdash; ${INDICATORS.length} indicators, each with its value, year and source.</p>
    <label class="search-label" for="indicator-search">Search indicators</label>
    <input id="indicator-search" class="search" type="search" placeholder="Try &ldquo;poverty&rdquo;, &ldquo;exports&rdquo; or &ldquo;wage&rdquo;&hellip;" autocomplete="off">
    <p class="result-count" id="indicator-count">${INDICATORS.length} indicators</p>
    <div class="table-wrap"><table class="data" id="indicator-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th><th>Topic</th></tr></thead>
      <tbody>${indicatorRows(INDICATORS)}</tbody>
    </table></div>
  </section>`;
}

export function population() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Population</h1>
  <p class="lede">281.6 million people at mid-2024 (BPS), the fourth largest population in the
  world, growing 0.8% a year. Two in three Indonesians are of working age.</p>
  <section class="kpis">
    <div class="kpi"><span class="kpi-label">Population, 2024</span><span class="kpi-value">281.6m</span>
      <span class="kpi-note">BPS mid-year estimate</span><span class="kpi-source">Source: BPS, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Growth</span><span class="kpi-value">0.8%</span>
      <span class="kpi-note">Per year, 2024</span><span class="kpi-source">Source: World Bank WDI, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Urban share</span><span class="kpi-value">58.8%</span>
      <span class="kpi-note">Live in towns and cities</span><span class="kpi-source">Source: World Bank WDI, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Density</span><span class="kpi-value">148.6/km&sup2;</span>
      <span class="kpi-note">People per square kilometre</span><span class="kpi-source">Source: World Bank WDI, 2023</span></div>
  </section>
  <section class="panel">
    <h2>Population, 2015&ndash;2024</h2>
    <p class="panel-sub">Millions, mid-year &middot; Source: BPS, 2024</p>
    ${lineChart(SERIES.population.values, { decimals: 1 })}
    <p class="panel-note">The population rose by 26.1 million over the decade. The 2020 census
    counted 270.2 million people; the 2024 figure is a mid-year projection from it.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <h2>Age structure</h2>
      <p class="panel-sub">Share of population &middot; Source: World Bank WDI, 2024</p>
      ${donutChart(AGE_STRUCTURE)}
      <p class="panel-note">A young country: a quarter of the population is under 15, and only
      7.3% is 65 or older. The fertility rate is 2.1 births per woman (2023).</p>
    </section>
    <section class="panel">
      <h2>Where people live</h2>
      <p class="panel-sub">Share of the 2020 census population, by island</p>
      ${barChart([
        { label: 'Java', value: 56.1, colour: '#0f766e' },
        { label: 'Sumatra', value: 21.7, colour: '#b45309' },
        { label: 'Sulawesi', value: 7.4, colour: '#4d7c0f' },
        { label: 'Kalimantan', value: 6.1, colour: '#475569' },
        { label: 'Other islands', value: 8.7, colour: '#94a3b8' },
      ], { decimals: 1, suffix: '%' })}
      <p class="panel-note">Java, the smallest of the big islands, holds more than half the
      country. The capital moved in stages to Nusantara in East Kalimantan from 2024.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Largest provinces</h2>
    <p class="panel-sub">Population Census 2020 &middot; Source: BPS</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Province</th><th>Population (millions)</th><th>Share of Indonesia</th></tr></thead>
      <tbody>${PROVINCES.map((p) => `<tr><td>${esc(p.name)}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${fmt(p.share, 1)}%</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="panel-note"><a href="#/regions">Open the full regions table &rarr;</a> to search and sort every province.</p>
  </section>`;
}

export function economy() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Economy</h1>
  <p class="lede">Southeast Asia&rsquo;s largest economy: Rp 22,139 trillion of output in 2024
  (US$1.40 trillion), growing 5.03% in real terms, with US$4,941.90 of output per person.</p>
  <section class="kpis">
    <div class="kpi"><span class="kpi-label">GDP, 2024</span><span class="kpi-value">Rp 22,139tn</span>
      <span class="kpi-note">US$1.40 trillion</span><span class="kpi-source">Source: BPS / World Bank, 2024</span></div>
    <div class="kpi"><span class="kpi-label">GDP per capita</span><span class="kpi-value">US$4,941.90</span>
      <span class="kpi-note">US$16,515 at purchasing power parity</span><span class="kpi-source">Source: World Bank WDI, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Exports of goods</span><span class="kpi-value">US$264.7bn</span>
      <span class="kpi-note">Trade surplus US$31.0bn</span><span class="kpi-source">Source: BPS, 2024</span></div>
    <div class="kpi"><span class="kpi-label">FDI inflows</span><span class="kpi-value">US$24.2bn</span>
      <span class="kpi-note">Net foreign direct investment</span><span class="kpi-source">Source: World Bank WDI, 2024</span></div>
  </section>
  <section class="panel">
    <h2>Real GDP growth, 2015&ndash;2024</h2>
    <p class="panel-sub">Percent per year &middot; Source: BPS, 2024</p>
    ${lineChart(SERIES.gdpGrowth.values)}
    <p class="panel-note">The pandemic year 2020 is the only contraction in the series, at
    &minus;2.07%. Growth returned to 3.69% in 2021 and has stayed above 5% since 2022.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <h2>GDP at current prices</h2>
      <p class="panel-sub">Rp trillion &middot; Source: BPS, 2024</p>
      ${lineChart(SERIES.gdpNominal.values, { decimals: 0 })}
      <p class="panel-note">Nominal output almost doubled in ten years, from Rp 11,526 trillion
      in 2015 to Rp 22,139 trillion in 2024.</p>
    </section>
    <section class="panel">
      <h2>GDP per capita</h2>
      <p class="panel-sub">US$, current prices &middot; Source: World Bank WDI, 2024</p>
      ${lineChart(SERIES.gdpPerCapita.values, { decimals: 0 })}
      <p class="panel-note">Output per person rose from US$3,331.70 in 2015 to US$4,941.90 in
      2024 &mdash; up 48% in nine years, and above the upper-middle-income line throughout.</p>
    </section>
  </div>
  <div class="two-col">
    <section class="panel">
      <h2>What the economy makes</h2>
      <p class="panel-sub">Share of gross value added &middot; Source: World Bank, 2024</p>
      ${donutChart(SECTOR_GROUPS)}
    </section>
    <section class="panel">
      <h2>Largest industries</h2>
      <p class="panel-sub">Share of GDP &middot; Source: BPS, 2024</p>
      ${barChart(LARGEST_INDUSTRIES.map((s) => ({ label: s.label, value: s.share, colour: '#b45309' })), { decimals: 2, suffix: '%' })}
      <p class="panel-note">Manufacturing is the largest single industry at 18.98% of GDP,
      followed by trade at 13.07%. The five largest industries together are about two-thirds
      of output.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Trade in 2024</h2>
    <p class="panel-sub">Goods, US$ billion &middot; Source: BPS, 2024</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Flow</th><th>2024</th><th>2023</th><th>Change</th></tr></thead>
      <tbody>
        <tr><td>Exports of goods</td><td class="num">US$264.7bn</td><td class="num">US$258.8bn</td><td class="num">+2.3%</td></tr>
        <tr><td>Imports of goods</td><td class="num">US$233.7bn</td><td class="num">US$221.9bn</td><td class="num">+5.3%</td></tr>
        <tr><td>Trade balance</td><td class="num">US$31.0bn surplus</td><td class="num">US$36.9bn surplus</td><td class="num">&minus;US$5.9bn</td></tr>
      </tbody>
    </table></div>
    <p class="panel-note">The current account &mdash; trade plus income flows &mdash; was a
    deficit of 0.6% of GDP in 2024 (IMF World Economic Outlook). Exports of goods and services
    were 22.2% of GDP.</p>
  </section>`;
}

export function prices() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Prices &amp; inflation</h1>
  <p class="lede">Consumer prices rose 1.57% in the year to December 2024 (BPS) &mdash; the
  lowest December reading in the series &mdash; inside Bank Indonesia&rsquo;s 2.5% &plusmn; 1%
  target band.</p>
  <section class="kpis">
    <div class="kpi"><span class="kpi-label">Inflation, Dec 2024</span><span class="kpi-value">1.57%</span>
      <span class="kpi-note">Year on year, consumer prices</span><span class="kpi-source">Source: BPS, Dec 2024</span></div>
    <div class="kpi"><span class="kpi-label">Annual average</span><span class="kpi-value">2.18%</span>
      <span class="kpi-note">Average CPI inflation over 2024</span><span class="kpi-source">Source: World Bank WDI, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Food &amp; tobacco</span><span class="kpi-value">+1.90%</span>
      <span class="kpi-note">Year on year, Dec 2024; the main driver</span><span class="kpi-source">Source: BPS, Dec 2024</span></div>
    <div class="kpi"><span class="kpi-label">Inflation target</span><span class="kpi-value">2.5% &plusmn; 1%</span>
      <span class="kpi-note">Bank Indonesia target band</span><span class="kpi-source">Source: Bank Indonesia</span></div>
  </section>
  <section class="panel">
    <h2>Inflation, 2015&ndash;2024</h2>
    <p class="panel-sub">Consumer prices, December year on year, percent &middot; Source: BPS, 2024</p>
    ${lineChart(SERIES.inflation.values)}
    <p class="panel-note">Inflation spiked to 5.51% in December 2022 after fuel-subsidy
    prices rose, then fell back to 2.61% in 2023 and 1.57% in 2024 &mdash; the lowest
    December reading since the series began.</p>
  </section>
  <section class="panel">
    <h2>What moved prices in December 2024</h2>
    <p class="panel-sub">Year-on-year change by expenditure group &middot; Source: BPS, Jan 2025</p>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Expenditure group</th><th>Change</th><th>What it means</th></tr></thead>
      <tbody>
        <tr><td>All items</td><td class="num">+1.57%</td><td>CPI rose from 105.15 to 106.80</td></tr>
        <tr><td>Food, beverages &amp; tobacco</td><td class="num">+1.90%</td><td>Contributed 0.55 points of the 1.57%</td></tr>
        <tr><td>Gold jewellery</td><td class="num">rose sharply</td><td>Named by BPS as a second driver</td></tr>
        <tr><td>Other groups</td><td class="num">near flat</td><td>Administered prices and core items were calm</td></tr>
      </tbody>
    </table></div>
    <p class="panel-note">BPS publishes the consumer price index monthly, usually on the
    first working day of the following month. The index covers 150 cities.</p>
  </section>`;
}

export function jobs() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Jobs</h1>
  <p class="lede">4.91% of the labour force was unemployed in August 2024 (BPS) &mdash; the
  lowest August reading on record &mdash; out of a labour force of 152.1 million people.</p>
  <section class="kpis">
    <div class="kpi"><span class="kpi-label">Unemployment, Aug 2024</span><span class="kpi-value">4.91%</span>
      <span class="kpi-note">7.5 million people out of work</span><span class="kpi-source">Source: BPS, Aug 2024</span></div>
    <div class="kpi"><span class="kpi-label">Labour force</span><span class="kpi-value">152.1m</span>
      <span class="kpi-note">144.6 million in work</span><span class="kpi-source">Source: BPS, Aug 2024</span></div>
    <div class="kpi"><span class="kpi-label">Urban unemployment</span><span class="kpi-value">5.79%</span>
      <span class="kpi-note">Cities, Aug 2024</span><span class="kpi-source">Source: BPS, Aug 2024</span></div>
    <div class="kpi"><span class="kpi-label">Rural unemployment</span><span class="kpi-value">3.67%</span>
      <span class="kpi-note">Countryside, Aug 2024</span><span class="kpi-source">Source: BPS, Aug 2024</span></div>
  </section>
  <section class="panel">
    <h2>Open unemployment rate, 2015&ndash;2024</h2>
    <p class="panel-sub">Percent of the labour force, August &middot; Source: BPS, 2024</p>
    ${lineChart(SERIES.unemployment.values)}
    <p class="panel-note">Unemployment jumped to 7.07% in August 2020 as the pandemic hit,
    then fell every year after: 6.49% in 2021, 5.86% in 2022, 5.32% in 2023 and 4.91% in 2024.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <h2>Who is unemployed</h2>
      <p class="panel-sub">August 2024 &middot; Source: BPS</p>
      ${barChart([
        { label: 'Men', value: 4.90, colour: '#0f766e' },
        { label: 'Women', value: 4.92, colour: '#b45309' },
        { label: 'Urban areas', value: 5.79, colour: '#0f766e' },
        { label: 'Rural areas', value: 3.67, colour: '#b45309' },
      ], { decimals: 2, suffix: '%' })}
      <p class="panel-note">Men and women were unemployed at almost identical rates in 2024.
      The gap is geographic: city jobseekers face a rate more than two points above the countryside.</p>
    </section>
    <section class="panel">
      <h2>Pay</h2>
      <p class="panel-sub">The floor under wages</p>
      <p>Indonesia sets a provincial minimum wage each year. The highest is Jakarta&rsquo;s:
      <strong>Rp 5,396,761 a month in 2025</strong> (Jakarta provincial government). Minimum
      wages are set province by province, so the floor differs across the country&rsquo;s 38 provinces.</p>
      <p>BPS publishes the labour-force survey twice a year, in February and August, under
      the name Sakernas. The headline rate counts people actively looking for work; it does
      not count underemployment or informal work, which is most of the jobs market.</p>
    </section>
  </div>`;
}

export function people() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>People &amp; wellbeing</h1>
  <p class="lede">Human development reached 75.02 in 2024 (BPS) &mdash; the highest on record
  &mdash; while poverty fell to 8.57%, also the lowest since BPS began publishing the series in 1960.</p>
  <section class="kpis">
    <div class="kpi"><span class="kpi-label">Human Development Index</span><span class="kpi-value">75.02</span>
      <span class="kpi-note">Up from 74.39 in 2023</span><span class="kpi-source">Source: BPS, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Life expectancy</span><span class="kpi-value">74.15 yrs</span>
      <span class="kpi-note">At birth, 2024</span><span class="kpi-source">Source: BPS, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Poverty rate</span><span class="kpi-value">8.57%</span>
      <span class="kpi-note">24.06 million people</span><span class="kpi-source">Source: BPS, Sep 2024</span></div>
    <div class="kpi"><span class="kpi-label">Gini ratio</span><span class="kpi-value">0.379</span>
      <span class="kpi-note">Down from 0.388 in 2023</span><span class="kpi-source">Source: BPS, Mar 2024</span></div>
  </section>
  <div class="two-col">
    <section class="panel">
      <h2>Human Development Index, 2015&ndash;2024</h2>
      <p class="panel-sub">Index 0&ndash;100 &middot; Source: BPS, 2024</p>
      ${lineChart(SERIES.hdi.values)}
      <p class="panel-note">The index combines life expectancy, schooling and spending power.
      It rose every year in the series, including through the pandemic.</p>
    </section>
    <section class="panel">
      <h2>Poverty rate, 2015&ndash;2024</h2>
      <p class="panel-sub">Percent of population, September &middot; Source: BPS, 2024</p>
      ${lineChart(SERIES.poverty.values)}
      <p class="panel-note">Poverty fell from 11.13% in September 2015 to 8.57% in September
      2024. The pandemic pushed it back above 10% in 2020; it has fallen every September since.</p>
    </section>
  </div>
  <section class="panel">
    <h2>The poverty line</h2>
    <p class="panel-sub">September 2024 &middot; Source: BPS</p>
    <p>In September 2024 the poverty line was <strong>Rp 595,242 per person per month</strong>
    (about US$36.50). Rice, cigarettes, housing and fuel contribute the most to it. The 24.06
    million people below the line were 1.16 million fewer than in March 2024 and 1.84 million
    fewer than in March 2023.</p>
    <p>Inequality, measured by the Gini ratio, was 0.379 in March 2024, down from 0.388 a year
    earlier (BPS). Extreme poverty &mdash; under the international $2.15-a-day line &mdash; was
    1.5% in 2024 (World Bank).</p>
  </section>`;
}

export function regions() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Regions</h1>
  <p class="lede">38 provinces across more than 17,000 islands. Search the table or sort any
  column &mdash; the figures are from the 2020 Population Census (BPS).</p>
  <section class="panel">
    <h2>Provinces by population</h2>
    <p class="panel-sub">Population Census 2020 &middot; Source: BPS</p>
    <label class="search-label" for="province-search">Search provinces</label>
    <input id="province-search" class="search" type="search" placeholder="Try &ldquo;Java&rdquo; or &ldquo;Sulawesi&rdquo;&hellip;" autocomplete="off">
    <p class="result-count" id="province-count">${PROVINCES.length} provinces shown</p>
    <div class="table-wrap"><table class="data" id="province-table">
      <thead><tr>
        <th><button class="sort" data-key="name" type="button">Province &#8597;</button></th>
        <th><button class="sort" data-key="pop" type="button">Population (millions) &#8597;</button></th>
        <th><button class="sort" data-key="share" type="button">Share of Indonesia &#8597;</button></th>
      </tr></thead>
      <tbody id="province-body">${PROVINCES.map((p) => `<tr><td>${esc(p.name)}</td><td class="num">${fmt(p.pop, 2)}</td><td class="num">${fmt(p.share, 1)}%</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="panel-note">The ten largest provinces hold 68.1% of the country. The 2024
    projections are higher still: West Java 50.35 million, East Java 41.81 million and
    Central Java 37.89 million (BPS, 2024).</p>
  </section>
  <section class="panel">
    <h2>How the country is spread out</h2>
    <p class="panel-sub">Share of the 2020 census population, by island</p>
    ${barChart([
      { label: 'Java', value: 56.1, colour: '#0f766e' },
      { label: 'Sumatra', value: 21.7, colour: '#b45309' },
      { label: 'Sulawesi', value: 7.4, colour: '#4d7c0f' },
      { label: 'Kalimantan', value: 6.1, colour: '#475569' },
      { label: 'Other islands', value: 8.7, colour: '#94a3b8' },
    ], { decimals: 1, suffix: '%' })}
    <p class="panel-note">Land area is 1,904,569 km&sup2; (World Bank) across an archipelago
    stretching 5,100 km from east to west &mdash; wider than the continental United States.</p>
  </section>`;
}

export function sources() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Sources &amp; methods</h1>
  <p class="lede">Every figure on this site names its source and its year where it appears.
  This page collects them, explains how the numbers are made, and gives you the data to reuse.</p>
  <section class="panel">
    <h2>Where the numbers come from</h2>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Source</th><th>What it provides here</th><th>Latest year used</th></tr></thead>
      <tbody>
        <tr><td>Statistics Indonesia (BPS)</td><td>Population, GDP, inflation, unemployment, poverty, HDI, Gini, trade, census</td><td>2024</td></tr>
        <tr><td>World Bank, World Development Indicators</td><td>GDP in US$, GDP per capita, PPP, population growth, urban share, fertility, FDI, life expectancy (international series)</td><td>2024</td></tr>
        <tr><td>IMF, World Economic Outlook</td><td>Current account balance</td><td>2024</td></tr>
        <tr><td>Bank Indonesia</td><td>Inflation target band</td><td>2024</td></tr>
        <tr><td>Jakarta provincial government</td><td>Provincial minimum wage</td><td>2025</td></tr>
      </tbody>
    </table></div>
    <p class="panel-note">Figures are revised by their publishers. Where a publisher has
    published a newer value since this site was built, the newer value governs &mdash; see the
    release calendar below.</p>
  </section>
  <section class="panel">
    <h2>How the headline numbers are made</h2>
    <ul class="methods">
      <li><strong>GDP growth</strong> is the change in real GDP (constant 2010 prices) on the previous year, as published by BPS each February.</li>
      <li><strong>Inflation</strong> is the change in the consumer price index, December on December, covering 150 cities.</li>
      <li><strong>Unemployment</strong> is the open unemployment rate from the Sakernas labour-force survey, published in February and August.</li>
      <li><strong>Poverty</strong> counts people whose spending falls below the poverty line &mdash; the cost of a basket of food and non-food basics &mdash; published in March and September.</li>
      <li><strong>HDI</strong> combines life expectancy, expected and mean years of schooling, and adjusted per-capita spending, on a 0&ndash;100 scale.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>Release calendar</h2>
    <div class="table-wrap"><table class="data">
      <thead><tr><th>Release</th><th>When</th></tr></thead>
      <tbody>
        <tr><td>Consumer price index &amp; inflation</td><td>Monthly, first working day</td></tr>
        <tr><td>GDP</td><td>Quarterly, about five weeks after the quarter ends</td></tr>
        <tr><td>Labour-force survey (Sakernas)</td><td>February and August</td></tr>
        <tr><td>Poverty</td><td>March and September</td></tr>
        <tr><td>Human Development Index</td><td>Annually, in November</td></tr>
        <tr><td>Trade (exports &amp; imports)</td><td>Monthly, mid-month</td></tr>
      </tbody>
    </table></div>
  </section>
  <section class="panel">
    <h2>Download the data</h2>
    <p>Every headline figure on this site, as one comma-separated file you can open in a
    spreadsheet: <a href="data.csv" download>data.csv</a> (${INDICATORS.length} indicators,
    with value, year and source). The file is part of this site and works offline.</p>
    <h2>About this site</h2>
    <p>NusaStats is an independent, unofficial statistics site built for readers who want
    Indonesia&rsquo;s key figures in one place. It is not affiliated with Statistics Indonesia,
    the World Bank, the IMF or Bank Indonesia, and it copies no other site&rsquo;s brand, text or
    images. Figures are shown as their publishers published them; rounding may make shares
    not sum to exactly 100%. Spotted an error? The sources above are the place to check first.</p>
  </section>`;
}

export function missing() {
  return `<h1>Page not found</h1>
  <p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}

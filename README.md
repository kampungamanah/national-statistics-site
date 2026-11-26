# NusaStats — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/kampungamanah/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/kampungamanah/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An independent national statistics site for Indonesia: population, economy, prices,
jobs, wellbeing and regions — every figure with its source and year, running entirely
offline from static files.

## What it is

- **Overview** — headline indicators (population 281.6m, GDP Rp 22,139tn, growth 5.03%,
  poverty 8.57%), a chart switcher (GDP growth / inflation / poverty / unemployment,
  2015–2024 or last 5 years), largest provinces, latest releases, and a searchable
  catalogue of all 29 indicators.
- **Population** — 2015–2024 population series, age-structure donut, island shares,
  largest provinces.
- **Economy** — GDP growth, nominal GDP and GDP-per-capita charts, sector donut,
  largest industries, 2024 trade table.
- **Prices** — inflation 2015–2024 and what moved prices in December 2024.
- **Jobs** — unemployment 2015–2024, breakdowns by sex and urban/rural, minimum wage.
- **People** — Human Development Index and poverty series, poverty line, Gini.
- **Regions** — sortable, searchable table of the ten largest provinces (Census 2020).
- **Sources & methods** — where every number comes from, how the headline figures are
  made, the release calendar, and a downloadable `data.csv`.

All figures are real, from Statistics Indonesia (BPS), the World Bank's World
Development Indicators, the IMF World Economic Outlook and Bank Indonesia. The site is
unofficial and not affiliated with any of them.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Open `app/index.html` in any browser; it works offline, on desktop and on a phone.
No build step, no network requests, no framework — hand-rolled SVG charts and plain
ES modules.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the vendored make.fun library.

## Layout

- `app/` — the site: `index.html`, `style.css`, `main.js` (router + controls),
  `views.js` (one function per page), `charts.js` (SVG line/bar/donut builders),
  `data.js` (every figure, with source and year), `data.csv` (downloadable data)
- `screenshots/` — four real renders of the site (desktop overview, economy, people,
  phone regions)
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `main.ts` — the entrypoint that hands the site in

## License

MIT — see [LICENSE](LICENSE).

// Indonesia in numbers: every figure on this site lives here, with its source and year.
// Figures come from Statistics Indonesia (BPS), the World Bank's World Development
// Indicators, the IMF World Economic Outlook and Bank Indonesia. Nothing here is
// fetched from the network; the site shows exactly what this file holds.

export const COUNTRY = {
  name: 'Indonesia',
  fullName: 'Republic of Indonesia',
  capital: 'Jakarta',
  language: 'Indonesian',
  currency: 'Indonesian rupiah (IDR)',
  landAreaKm2: 1904569,
  islands: 17000,
  provinces: 38,
  updated: '26 November 2026',
};

// Headline cards on the overview page.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Population',
    value: '281.6 million',
    note: 'Mid-year estimate, 4th largest in the world',
    source: 'BPS, 2024',
    href: '#/population',
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: 'Rp 22,139 trillion',
    note: 'US$1.40 trillion at current prices',
    source: 'BPS / World Bank, 2024',
    href: '#/economy',
  },
  {
    id: 'growth',
    label: 'Economic growth',
    value: '5.03%',
    note: 'Real GDP growth on the previous year',
    source: 'BPS, 2024',
    href: '#/economy',
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.57%',
    note: '24.06 million people below the poverty line',
    source: 'BPS, September 2024',
    href: '#/people',
  },
];

// Annual series, 2015-2024. Each series: { id, label, unit, source, values: [[year, value]] }
export const SERIES = {
  gdpGrowth: {
    label: 'Real GDP growth',
    unit: '% per year',
    source: 'BPS, 2024',
    values: [[2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
      [2020, -2.07], [2021, 3.69], [2022, 5.31], [2023, 5.05], [2024, 5.03]],
  },
  gdpNominal: {
    label: 'GDP at current prices',
    unit: 'Rp trillion',
    source: 'BPS, 2024',
    values: [[2015, 11526.3], [2016, 12401.7], [2017, 13589.8], [2018, 14838.8], [2019, 15832.7],
      [2020, 15443.4], [2021, 16976.7], [2022, 19588.1], [2023, 20892.4], [2024, 22139.0]],
  },
  gdpPerCapita: {
    label: 'GDP per capita',
    unit: 'US$',
    source: 'World Bank WDI, 2024',
    values: [[2015, 3331.7], [2016, 3562.8], [2017, 3837.6], [2018, 3893.9], [2019, 4135.2],
      [2020, 3871.9], [2021, 4293.3], [2022, 4725.6], [2023, 4859.8], [2024, 4941.9]],
  },
  inflation: {
    label: 'Inflation (December, year on year)',
    unit: '%',
    source: 'BPS, 2024',
    values: [[2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13], [2019, 2.72],
      [2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57]],
  },
  unemployment: {
    label: 'Open unemployment rate (August)',
    unit: '% of labour force',
    source: 'BPS, 2024',
    values: [[2015, 6.18], [2016, 5.61], [2017, 5.50], [2018, 5.34], [2019, 5.28],
      [2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.32], [2024, 4.91]],
  },
  poverty: {
    label: 'Poverty rate (September)',
    unit: '% of population',
    source: 'BPS, 2024',
    values: [[2015, 11.13], [2016, 10.70], [2017, 10.12], [2018, 9.66], [2019, 9.22],
      [2020, 10.19], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57]],
  },
  hdi: {
    label: 'Human Development Index',
    unit: 'index (0-100)',
    source: 'BPS, 2024',
    values: [[2015, 69.55], [2016, 70.18], [2017, 70.81], [2018, 71.39], [2019, 71.92],
      [2020, 71.94], [2021, 72.29], [2022, 72.91], [2023, 74.39], [2024, 75.02]],
  },
  population: {
    label: 'Population (mid-year)',
    unit: 'million',
    source: 'BPS, 2024',
    values: [[2015, 255.5], [2016, 258.7], [2017, 261.9], [2018, 265.0], [2019, 268.1],
      [2020, 270.2], [2021, 272.7], [2022, 275.8], [2023, 278.7], [2024, 281.6]],
  },
};

// GDP by broad sector group, 2024 (World Bank, gross value added).
export const SECTOR_GROUPS = [
  { label: 'Services', share: 43.8, colour: '#0f766e' },
  { label: 'Industry', share: 39.3, colour: '#b45309' },
  { label: 'Agriculture, forestry & fishing', share: 12.6, colour: '#4d7c0f' },
  { label: 'Net taxes on products', share: 4.3, colour: '#94a3b8' },
];

// Largest industries by share of GDP, 2024 (BPS).
export const LARGEST_INDUSTRIES = [
  { label: 'Manufacturing', share: 18.98 },
  { label: 'Wholesale & retail trade', share: 13.07 },
  { label: 'Agriculture, forestry & fishing', share: 12.6 },
  { label: 'Construction', share: 9.9 },
];

// Age structure, 2024 (World Bank WDI).
export const AGE_STRUCTURE = [
  { label: 'Aged 0-14', share: 24.6, colour: '#0f766e' },
  { label: 'Aged 15-64', share: 68.1, colour: '#b45309' },
  { label: 'Aged 65 and over', share: 7.3, colour: '#475569' },
];

// Ten largest provinces, Population Census 2020 (BPS).
export const PROVINCES = [
  { name: 'West Java', pop: 48.27, share: 17.9 },
  { name: 'East Java', pop: 40.67, share: 15.1 },
  { name: 'Central Java', pop: 36.52, share: 13.5 },
  { name: 'North Sumatra', pop: 14.80, share: 5.5 },
  { name: 'Banten', pop: 11.90, share: 4.4 },
  { name: 'Jakarta', pop: 10.56, share: 3.9 },
  { name: 'South Sulawesi', pop: 9.07, share: 3.4 },
  { name: 'Lampung', pop: 9.01, share: 3.3 },
  { name: 'South Sumatra', pop: 8.47, share: 3.1 },
  { name: 'West Sumatra', pop: 5.53, share: 2.0 },
];

// Every indicator on the site, for the searchable catalogue on the overview page.
export const INDICATORS = [
  { name: 'Population', value: '281.6 million', year: 2024, source: 'BPS', topic: 'Population' },
  { name: 'Population growth', value: '0.8% per year', year: 2024, source: 'World Bank WDI', topic: 'Population' },
  { name: 'Population density', value: '148.6 people per km²', year: 2023, source: 'World Bank WDI', topic: 'Population' },
  { name: 'Urban population', value: '58.8% of total', year: 2024, source: 'World Bank WDI', topic: 'Population' },
  { name: 'Fertility rate', value: '2.1 births per woman', year: 2023, source: 'World Bank WDI', topic: 'Population' },
  { name: 'Life expectancy at birth', value: '74.15 years', year: 2024, source: 'BPS', topic: 'People' },
  { name: 'GDP at current prices', value: 'Rp 22,139 trillion', year: 2024, source: 'BPS', topic: 'Economy' },
  { name: 'GDP in US dollars', value: 'US$1.40 trillion', year: 2024, source: 'World Bank WDI', topic: 'Economy' },
  { name: 'GDP per capita', value: 'US$4,941.90', year: 2024, source: 'World Bank WDI', topic: 'Economy' },
  { name: 'GDP (PPP)', value: 'US$4.67 trillion', year: 2024, source: 'World Bank WDI', topic: 'Economy' },
  { name: 'Real GDP growth', value: '5.03%', year: 2024, source: 'BPS', topic: 'Economy' },
  { name: 'Exports of goods', value: 'US$264.7 billion', year: 2024, source: 'BPS', topic: 'Economy' },
  { name: 'Imports of goods', value: 'US$233.7 billion', year: 2024, source: 'BPS', topic: 'Economy' },
  { name: 'Goods trade surplus', value: 'US$31.0 billion', year: 2024, source: 'BPS', topic: 'Economy' },
  { name: 'Foreign direct investment, net inflows', value: 'US$24.2 billion', year: 2024, source: 'World Bank WDI', topic: 'Economy' },
  { name: 'Current account balance', value: '-0.6% of GDP', year: 2024, source: 'IMF WEO', topic: 'Economy' },
  { name: 'Inflation, December year on year', value: '1.57%', year: 2024, source: 'BPS', topic: 'Prices' },
  { name: 'Inflation, annual average', value: '2.18%', year: 2024, source: 'World Bank WDI', topic: 'Prices' },
  { name: 'Food, beverages & tobacco inflation', value: '1.90% year on year', year: 'Dec 2024', source: 'BPS', topic: 'Prices' },
  { name: 'Open unemployment rate', value: '4.91%', year: 'Aug 2024', source: 'BPS', topic: 'Jobs' },
  { name: 'Labour force', value: '152.1 million people', year: 'Aug 2024', source: 'BPS', topic: 'Jobs' },
  { name: 'Unemployment, urban areas', value: '5.79%', year: 'Aug 2024', source: 'BPS', topic: 'Jobs' },
  { name: 'Unemployment, rural areas', value: '3.67%', year: 'Aug 2024', source: 'BPS', topic: 'Jobs' },
  { name: 'Jakarta provincial minimum wage', value: 'Rp 5,396,761 per month', year: 2025, source: 'Jakarta provincial government', topic: 'Jobs' },
  { name: 'Poverty rate', value: '8.57%', year: 'Sep 2024', source: 'BPS', topic: 'People' },
  { name: 'People in poverty', value: '24.06 million', year: 'Sep 2024', source: 'BPS', topic: 'People' },
  { name: 'Poverty line', value: 'Rp 595,242 per person per month', year: 'Sep 2024', source: 'BPS', topic: 'People' },
  { name: 'Human Development Index', value: '75.02', year: 2024, source: 'BPS', topic: 'People' },
  { name: 'Gini ratio', value: '0.379', year: 'Mar 2024', source: 'BPS', topic: 'People' },
];

// Latest statistical releases.
export const RELEASES = [
  { date: '5 Feb 2026', title: 'GDP grew 5.11% in 2025; GDP per capita reached US$5,083', source: 'BPS' },
  { date: '15 Jan 2026', title: 'Poverty fell to 8.25% in September 2025', source: 'BPS' },
  { date: '2 Jan 2026', title: 'December 2025 inflation at 2.92% year on year', source: 'BPS' },
  { date: '5 Nov 2025', title: 'Open unemployment at 4.84% in August 2025', source: 'BPS' },
  { date: '15 Jan 2025', title: 'Poverty fell to 8.57% in September 2024, the lowest on record', source: 'BPS' },
  { date: '2 Jan 2025', title: 'December 2024 inflation at 1.57% year on year', source: 'BPS' },
];

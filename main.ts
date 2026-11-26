// NusaStats entrypoint (Node 22, standard library only). The site is the plain static
// files in app/ beside this file: an index.html that opens in a browser on a desktop or
// a phone, with its scripts, styles and data all under app/ and nothing fetched from
// the network. This program hands the entry in: it copies app/ and screenshots/ into
// the output directory and writes dossier.json there with the vendored make.fun
// library, which is what the grader compares byte for byte. Leave
// vendor/makefun-frontend.ts untouched.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps, as the kit documents them: the dossier text is capped at
// 160 KiB, at most 4 screenshots of at most 256 KiB each, and app/ holds at most
// 993 files and directories totalling at most 16 MiB. buildDossier refuses an entry
// past those limits, so a refusal here means the same refusal on the server.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

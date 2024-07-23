import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { program } from 'commander';
import Identicon from 'identicon.js';

program.argument('<identifer>');
program.option('-s --size <number>', 'icon size', Number, 64);
program.option('-o --output <path>', 'output path');
program.option('--svg', 'use SVG instead of PNG');
program.version('0.1.0', '-v --version');
program.showHelpAfterError();
program.parse();

const [identifer] = program.args;
const { size, svg, output } = program.opts();

if (Number.isNaN(size)) {
  program.error(`error: option '-s --size <number>' argument must be a number`);
}

const format = svg ? 'svg' : 'png';
const hash = crypto.createHash('sha256').update(identifer).digest('hex');
const identicon = new Identicon(hash, { size, format });

const mimeType = svg ? 'image/svg+xml' : 'image/png';
const dataUri = `data:${mimeType};base64,${identicon.toString()}`;

if (output) {
  const resp = await fetch(dataUri);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(await resp.arrayBuffer()));
} else {
  console.log(dataUri);
}

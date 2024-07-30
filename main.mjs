import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { program } from 'commander';
import Identicon from 'identicon.js';
import hexRgb from 'hex-rgb';

program.argument('<identifer>');
program.option('-s --size <number>', 'icon size', parseNumber, 64);
program.option('-o --output <path>', 'output path');
program.option('--foreground <hex>', 'foreground color', parseColor);
program.option('--background <hex>', 'background color', parseColor);
program.option('--svg', 'use SVG instead of PNG');
program.version('0.2.1', '-v --version');
program.showHelpAfterError();
program.parse();

const [identifer] = program.args;
const { size, output, foreground, background, svg } = program.opts();

const format = svg ? 'svg' : 'png';
const hash = crypto.createHash('sha256').update(identifer).digest('hex');
const identicon = new Identicon(hash, { size, format, foreground, background });

const mimeType = svg ? 'image/svg+xml' : 'image/png';
const dataUri = `data:${mimeType};base64,${identicon.toString()}`;

if (output) {
  const resp = await fetch(dataUri);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(await resp.arrayBuffer()));
} else {
  console.log(dataUri);
}

function parseNumber(str) {
  const num = Number(str);
  if (Number.isNaN(num)) {
    program.error(`error: option '-s --size <number>' argument must be a number`);
  }
  return num;
}

function parseColor(str) {
  try {
    return str && ((rgba) => [rgba.red, rgba.green, rgba.blue, rgba.alpha * 0xff])(hexRgb(str));
  } catch (error) {
    program.error(`error: option '${this.flags}' ${error.message}`);
  }
}

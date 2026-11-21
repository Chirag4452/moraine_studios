const fs = require('node:fs');
const { Resvg } = require('@resvg/resvg-js');
const [input, output, width] = process.argv.slice(2);
if (!input || !output) throw new Error('Usage: node render-svg.cjs input.svg output.png');
const svg = new Resvg(fs.readFileSync(input), { font: { loadSystemFonts: false }, ...(width ? { fitTo: { mode: 'width', value: Number(width) } } : {}) });
fs.writeFileSync(output, svg.render().asPng());

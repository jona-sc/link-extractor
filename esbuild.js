const esbuild = require('esbuild');
const {readFile, writeFile} = require('fs').promises;
const minify = require('html-minifier-terser').minify;

// sandbox

esbuild
  .build({
    entryPoints: ['src/code.ts'],
    bundle: true,
    platform: 'node',
    target: ['node10.4'],
    outfile: 'dist/code.js'
  })
  .catch(() => process.exit(1));

// iframe UI

const buildWebComponents = (entryPoints) =>
  entryPoints
    .map((entryPoint) =>
      esbuild.buildSync({
        entryPoints: [entryPoint],
        bundle: true,
        minify: true,
        write: false,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        format: 'esm'
      })
    )
    .map((componentScript) => componentScript.outputFiles[0].text)
    .join('');

(async () => {
  const script = esbuild.buildSync({
    entryPoints: ['src/ui.js'],
    // bundle: true,
    // minify: true,
    write: false,
    target: ['chrome58', 'firefox57', 'safari11', 'edge18']
  });

  const componentsScript = buildWebComponents([
    'src/components/getTextNodes.ts',
    'src/components/findHyperlinksInTextNodes.ts',
    'src/components/focusOnTextNode.ts',
    'src/components/extractHyperlinkSegments.ts',
    'src/components/extractHyperlinkPositionsFromMixedTextNode.ts',
    'node_modules/figma-plugin-ds/dist/figma-plugin-ds.css'
  ]);

  const html = await readFile('src/ui.html', 'utf8');

  const minifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true
  };

  await writeFile(
    'dist/ui.html',
    `${await minify(html, minifyOptions)}<script>${script.outputFiles[0].text}</script>`
  );
})();
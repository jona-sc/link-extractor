const esbuild = require('esbuild');

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

const minify = require('html-minifier-terser').minify;

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
  const componentsScript = buildWebComponents([
    'src/components/getTextNodes.ts',
    'src/components/findHyperlinksInTextNodes.ts',
    'src/components/focusOnTextNode.ts',
    'src/components/extractHyperlinkSegments.ts',
    'src/components/extractHyperlinkPositionsFromMixedTextNode.ts',
  ]);
})();

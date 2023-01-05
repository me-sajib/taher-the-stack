const fs = require('fs');
const path = require('path');
const manifest = require('../public/manifest.json');

/**
 * readFileName uses a Regex to filter, match, and return the static file based on
 * the `prefix` and `extension` in the directory based on the `path`.
 *
 * @param {string} path File path relative to the build directory - `'static/js'`
 * @param {string} prefix File prefix for the file name - `'main'`
 * @param {string} extension File extension - 'js'
 * @returns {string} File name - `'main.66848e72.js'`
 */
function readFileName(path, prefix, extension) {
  const file = new RegExp(`^${prefix}\.[a-z0-9]+\.${extension}$`);

  return fs
    .readdirSync(`./build/${path}`)
    .filter((filename) => file.test(filename))
    .map((filename) => `${path}/${filename}`)[0];
}

const jsFile = readFileName('static/js', 'main', 'js');
const cssFile = readFileName('static/css', 'main', 'css');

const addJsPath = (codes) =>
  codes.replace('<%main-js-path%>', jsFile);
const makePath = (...paths) => path.resolve(__dirname, ...paths);

const backgroundPath = makePath('..', 'build', 'background.js');
const backgroundJs = fs.readFileSync(backgroundPath).toString();
fs.writeFileSync(backgroundPath, addJsPath(backgroundJs));

const newManifest = {
  ...manifest,
  content_scripts: [
    {
      ...manifest.content_scripts[0],
      css: [cssFile]
    }
  ]
};

fs.writeFileSync(
  './build/manifest.json',
  JSON.stringify(newManifest, null, 2)
);

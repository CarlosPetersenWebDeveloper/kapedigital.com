import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DhKASdw_.mjs';
import { manifest } from './manifest_3IYOn3ZG.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/portafolio.astro.mjs');
const _page5 = () => import('./pages/servicios.astro.mjs');
const _page6 = () => import('./pages/sobre.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/portafolio.astro", _page4],
    ["src/pages/servicios.astro", _page5],
    ["src/pages/sobre.astro", _page6],
    ["src/pages/index.astro", _page7]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a4598410-f842-42be-86c1-76d0b56d4649",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

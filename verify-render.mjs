import { createServer } from 'vite'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
const server = await createServer({ server: { middlewareMode: true }, base: '/ano-spp-vue/' })
try {
 for (const route of ['/', '/support', '/documents', '/regulation']) {
  globalThis.location = { pathname: '/ano-spp-vue' + route }
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const html = await renderToString(createSSRApp(App))
  if (!html.includes('href="/ano-spp-vue/')) throw Error('Missing base links')
  if (html.includes('Страница не найдена')) throw Error('Route failed: '+route)
  console.log('Render OK:', route)
 }
} finally { await server.close() }

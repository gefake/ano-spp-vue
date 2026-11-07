import fs from 'node:fs'
const routes = ['support','documents','requisites','regulation','tax-document','personal','oferta','news','about','page6','page9','page10','payment']
for (const route of routes) {
 fs.mkdirSync(`dist/${route}`, { recursive: true })
 fs.copyFileSync('dist/index.html', `dist/${route}/index.html`)
}

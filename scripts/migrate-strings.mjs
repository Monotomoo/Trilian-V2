// One-shot migration: read content/strings.ts, write strings.en.json + strings.hr.json
// Run: node scripts/migrate-strings.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { transform } from 'esbuild'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve('.')
const src = readFileSync(path.join(root, 'content/strings.ts'), 'utf8')

// esbuild transform strips type annotations + `as const` etc., yielding ESM JS
const { code } = await transform(src, { loader: 'ts', format: 'esm' })

// Stage to a temp .mjs we can dynamic-import
const tmpDir = path.join(root, '.tmp-migrate')
mkdirSync(tmpDir, { recursive: true })
const tmpFile = path.join(tmpDir, 'strings.mjs')
writeFileSync(tmpFile, code, 'utf8')

const mod = await import(pathToFileURL(tmpFile).href)
const { strings } = mod

writeFileSync(
  path.join(root, 'content/strings.en.json'),
  JSON.stringify(strings.en, null, 2) + '\n',
  'utf8',
)
writeFileSync(
  path.join(root, 'content/strings.hr.json'),
  JSON.stringify(strings.hr, null, 2) + '\n',
  'utf8',
)

rmSync(tmpDir, { recursive: true, force: true })

console.log('✓ wrote content/strings.en.json + content/strings.hr.json')

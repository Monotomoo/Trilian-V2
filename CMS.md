# Trillian CMS — guide

Vedra edits site copy and photos through Decap CMS at **/admin**. Edits commit to GitHub on her behalf and Vercel rebuilds automatically.

---

## For Vedra — how to edit

### 1. Log in
Go to **https://trilian-v2.vercel.app/admin** (or whatever the live URL is).
Click **Login with GitHub**, approve the permission prompt the first time.

### 2. Pick a section
The left sidebar lists numbered sections — `01 · Brand & meta`, `02 · Navigation`, `03 · Hero`, `04 · Manifesto` and so on. Click any of them.

Each section has **two cards**: one for English (`en`), one for Croatian (`hr`). Open whichever you want to edit.

### 3. Make a change
Edit any field. Photos can be replaced with the photo widget — click the photo, then **Choose an image** to either pick from the existing media library or upload a new file.

### 4. Save
Click **Save** in the top right. Decap commits straight to the `main` branch on GitHub.

### 5. Wait ~2 minutes
Vercel sees the commit, runs the build, and the live site updates. Refresh the public URL after about two minutes to see it.

> **Note** — there's no preview between Save and the live update. Test changes by going to the live URL after the rebuild finishes.

### 6. If you break something
You can't really break the JSON — the form prevents it. If a build fails for some other reason, message Tomo. Every edit is a git commit, so we can roll back to any prior version.

---

## For Tomo — first-time setup

### 1. Create a GitHub OAuth app
- Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
- Application name: `Trillian CMS`
- Homepage URL: `https://trilian-v2.vercel.app`
- Authorization callback URL: `https://trilian-v2.vercel.app/api/oauth/callback`
- Generate a client secret, copy both `Client ID` and `Client Secret`

### 2. Add env vars to Vercel
In the Vercel project settings → **Environment Variables**, add:
- `GITHUB_CLIENT_ID` — from step 1
- `GITHUB_CLIENT_SECRET` — from step 1

Apply to **Production** + **Preview** + **Development**.

### 3. Confirm config.yml
In `public/admin/config.yml`, the `backend.base_url` should match the live URL. Update it if the Vercel domain changes.

### 4. Local editing (optional)
You can edit content offline without going through GitHub:
```bash
npx decap-server          # in one terminal
npm run dev               # in another
```
Open `http://localhost:4001/admin`. Decap-server proxies edits straight into local JSON files (no commits) — useful for bulk edits or testing schema changes.

### 5. Adding new fields
1. Add the field to `content/strings.en.json` and `content/strings.hr.json`
2. Use the value in a component
3. Add the field definition to `public/admin/config.yml`

---

## Where the data lives

```
content/
  strings.en.json     ← English copy
  strings.hr.json     ← Croatian copy
  strings.ts          ← thin wrapper that re-exports the JSON to consumers

public/
  admin/
    index.html        ← loads Decap from CDN
    config.yml        ← schema for every section
  uploads/            ← all photos Decap manages

api/
  oauth/
    index.ts          ← redirects to GitHub OAuth
    callback.ts       ← exchanges code for token, posts back to admin window

scripts/
  migrate-strings.mjs ← one-shot script that built the initial JSON from
                        the old strings.ts (kept for reference)
```

## Limits

- **Build delay** — saving an edit takes ~2 min to appear on the live site.
- **No live preview** — Decap shows a form, not the rendered page.
- **Schema changes** — adding a new field needs a code change, not a CMS edit.
- **Bilingual sync** — EN and HR are saved as two separate files. If you add a list item in EN, also add the corresponding one in HR.
- **Images** — Decap commits image files directly into the repo (`public/uploads/`). For very heavy media (many large photos), migrate to Vercel Blob or Cloudinary later.

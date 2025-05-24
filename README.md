# PPbe – pascal.polleunus.be

## How Was This Created?

### Create Project

```bash
cd $HOME/dev
pnpm create astro@latest ./ppbe --skip-houston --template minimal --no-install --no-git
cd ppbe
git init
asdf set nodejs 22.15.0
pnpm install
gh repo create ppbe --public -h "pascal.polleunus.be" -s . --push
```

**Options:**
- dir: `./ppbe`
- tmpl: `minimal` (Empty)
- ts: No
- use: `base`
- deps: No (we’ll first define Node version)
- git: No (because it commits immediately)

**Test install:** `pnpm dev`

> See [commit](https://github.com/ppo/ppbe/commit/9b0e56344ee3b69c19215e611e013eeb41c7a3e1)


### Some Configuration

> See [commits](https://github.com/ppo/ppbe/commits/main/?after=8504a54df01e8df0afcfdf23b768c8b735521488+0).


### Configure Vercel Deployment

Basically:
- Add `vercel` adapter.
    - `pnpm astro add vercel`
    - Configure Astro.
- Add configuration for Vercel:
    - Define Node version in `package.json`.
    - Create `vercel.json` to define install command.
- Git ignore `.vercel` folder.
- Install Vercel CLI.
    - `brew install vercel-cli`
- Deploy to Vercel, accepting all defaults.
    - `vercel deploy --yes`.
    - Test: `https://ppbe.vercel.app/`.
- Configure Vercel
    - Go to Vercel › Project “ppbe” › Settings › Git.
    - In “Connected Git Repository”, click on `GitHub`.
    - “Install the GitHub application”, click on `Install`.
        - Select `ppo`
        - Choose `Only select repositories`
        - Select `ppbe` repo
        - Click on `Install`
    - Click on `Connect` beside `mysite`
    - Enable `Pull Request Comments` & `Commit Comments`

> See [commit](https://github.com/ppo/ppbe/commit/8504a54df01e8df0afcfdf23b768c8b735521488)


### Create Components

> See [commits](https://github.com/ppo/ppbe/commits/main/?after=4dae9bd8a322b717065ae0fedb86c2c14bfd5a12+0).


### Integrate sitemap & Tailwind

> See [commits](https://github.com/ppo/ppbe/commits/main/?after=393682ffd865f4b9865589821b7ff18ab5e3850c+0).


### And All The Rest…

> See [latest commits](https://github.com/ppo/ppbe/commits/main/)

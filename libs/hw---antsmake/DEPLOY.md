# Self-hosted MakeCode Arcade (Level 2)

Use this after your fork includes `libs/hw---antsmake` and the `pxtarget.json` / `targetconfig.json` edits.

## 1. Fork and push

1. Fork [microsoft/pxt-arcade](https://github.com/microsoft/pxt-arcade) on GitHub (or push your clone to a new repo).
2. Ensure branch `master` (or `main`) contains the Ants Make board changes.

## 2. Build the static editor

From the repo root (with Node.js and `npm install` already done):

```bash
npm install
node node_modules/pxt-core/built/pxt.js staticpkg --githubpages
```

This prepares output under `built/gh-pages/` (exact layout may vary by PXT version; see `pxt help staticpkg`).

Options you may need:

- `--route <name>` if the site is not at the domain root.
- `--output <dir>` to set the output folder.

Official CLI docs: [pxt staticpkg](https://makecode.com/cli/staticpkg).

## 3. Publish to GitHub Pages

- Enable **GitHub Pages** for the repository (Settings → Pages).
- Point it at the branch/folder that contains the packaged static site (often `gh-pages` root or `/docs`).

After deploy, open:

`https://<YOUR_USER>.github.io/<REPO>/`

Users can select **Ants Make (micro:bit + ST7735)** in the hardware dialog and download builds for `nrf52833` (`.hex` for micro:bit V2).

## 4. Local testing (Level 1)

```bash
npm run serve
```

Then open the URL printed in the terminal (often `http://localhost:3232`).

## Notes

- Official **arcade.makecode.com** only lists boards merged by Microsoft; your self-hosted instance is how others use **your** hardware without that merge.
- For product-scale listing on the official site, contact **arcadehdw@microsoft.com** per [Creating your own Arcade hardware](https://arcade.makecode.com/hardware/adding).

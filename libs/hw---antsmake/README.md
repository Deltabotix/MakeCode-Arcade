# `hw---antsmake`

MakeCode Arcade hardware definition for a **BBC micro:bit V2** with a **1.8″ ST7735 SPI TFT** and **GPIO arcade buttons** (direct wiring, no 74HC165 multiplexer).

- **Pins & display tuning:** [BOARD.md](BOARD.md)
- **Self-hosted editor (GitHub Pages):** [DEPLOY.md](DEPLOY.md)

**Compile variant:** `nrf52833` (same Codal target as `hw---n3`).

Validate this package:

```bash
cd libs/hw---antsmake
node ../../node_modules/pxt-core/built/pxt.js build
```

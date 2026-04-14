# Ants Make — pin map and tuning

## Display (ST7735 SPI, 128×160)

| Signal | micro:bit edge | nRF GPIO | `config.ts` |
|--------|----------------|----------|-------------|
| SCK | P13 | P0.17 | `PIN_DISPLAY_SCK` |
| MOSI | P15 | P0.13 | `PIN_DISPLAY_MOSI` |
| CS | P16 | P1.02 | `PIN_DISPLAY_CS` |
| DC | P8 | P0.10 | `PIN_DISPLAY_DC` |
| RST | P12 | P0.12 | `PIN_DISPLAY_RST` |
| Backlight | P1 | P0.03 | `PIN_DISPLAY_BL` |
| MISO (unused) | P14 | P0.01 | `PIN_DISPLAY_MISO` (kept for SPI init) |

Route your PCB to match **before** changing `config.ts`.

## Buttons (active low to GND; firmware uses active-low pull-up)

| Control | Edge | nRF GPIO | Constant |
|---------|------|----------|----------|
| Up | P1 | P0.03 | `PIN_BTN_UP` |
| Down | P2 | P0.04 | `PIN_BTN_DOWN` |
| Left | P3 | P0.31 | `PIN_BTN_LEFT` |
| Right | P4 | P0.28 | `PIN_BTN_RIGHT` |
| A | P5 | P0.14 | `PIN_BTN_A` (also on-board button A) |
| B | P11 | P0.23 | `PIN_BTN_B` (also on-board button B) |
| Menu | P9 | P0.09 | `PIN_BTN_MENU` |

**Notes:**
- **P5/P11** are shared with the micro:bit's on-board A/B buttons — pressing either the shield button or the board button fires the same Arcade input.
- **P3/P4/P9** are shared with the LED-matrix columns on micro:bit V2. That's fine here because the LED matrix driver is disabled on Arcade targets (`ARCADE_MBIT_CODAL=1`).
- If your shield uses different edge pins, update `config.ts` to match the actual traces.

## Audio

On-board buzzer: `PIN_JACK_SND = P0.0` (internal routing, same idea as N3).

## Display tuning (`DISPLAY_CFG0`)

The low byte of `DISPLAY_CFG0` is the ST7735 **MADCTL** register:

| Bit | Mask | Name | Effect when set |
|-----|------|------|----------------|
| 7 | `0x80` | MY | rows scan bottom→top (image inverted) |
| 6 | `0x40` | MX | columns scan right→left (image mirrored) |
| 5 | `0x20` | MV | row/column exchange |
| 3 | `0x08` | BGR | R and B channels swapped (red appears blue) |

Current value is `0x00` (normal scan, RGB order).  
If the image is still wrong after reflashing, try: `0x40` (mirror only), `0x80` (flip only), `0xC0` (180° rotation).  
Some panels need the `0x1000000` upper bit to invert all colors.

Edit `DISPLAY_CFG0` / `DISPLAY_CFG1` in [`config.ts`](config.ts), rebuild, and reflash.

## Troubleshooting: screen stays white (simulator OK)

**White usually means backlight on, but SPI/init or pins are wrong.**

1. **Power & ground** — Module **GND** to micro:bit **GND**; **VCC** to **3V** (not 5 V unless your module’s regulator is meant for 5 V in).
2. **Every signal** — SCK→P13, MOSI→P15, CS→P16, DC→P8, RST→P12. One wrong or loose wire → no image.
3. **Backlight** — If the module **LED** pin is not wired to **P1** (as in `PIN_DISPLAY_BL`), tie **LED** to **3V** (through the board’s resistor) per your module’s docs, or wire LED→P1.
4. **SPI speed** — `DISPLAY_CFG2` low byte is SPI MHz; start with **8** on jumper wires, then increase.
5. **MADCTL** — If still white/garbled after wiring checks, try low byte of `DISPLAY_CFG0`: **0xC8**, **0xA8**, **0x08**, **0x48** (128×160 ST7735 variants differ).
6. **Rebuild & reflash** — After any `config.ts` change, download a new `.hex` and copy to **MICROBIT**.

## References

- [Arcade hardware: adding](https://arcade.makecode.com/hardware/adding)
- [micro:bit edge connector](https://tech.microbit.org/hardware/edgeconnector/)

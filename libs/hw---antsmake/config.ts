// Ants Make: micro:bit V2 + 1.8" ST7735 (128x160) over edge-connector SPI.
// Direct ST7735 (no 74HC165 / "smart display" auto-detect). GPIO arcade buttons.
//
// Display wiring (module silkscreen -> micro:bit edge):
//   SCK -> P13, MOSI/SDA -> P15, CS -> P16, DC/A0 -> P8, RST -> P12, LED -> 3V3 (always on, no pin control)
//
// Button wiring (active-low to GND; internal pull-ups — match your PCB):
//   UP=P1, DOWN=P2, LEFT=P3, RIGHT=P4, A=P5, B=P11, MENU=P9
// P5/P11 are shared with the on-board A/B buttons (pressing either triggers the arcade input).
// P3/P4/P9 are shared with LED-matrix columns on V2; fine to use since the LED matrix is off on Arcade targets.

namespace config {
    export const SETTINGS_SIZE = (8 * 1024)

    // --- ST7735 SPI (same SCK/MOSI/DC/RST as reference N3 layout; CS on P16) ---
    export const PIN_DISPLAY_SCK = DAL.P0_17 // P13
    export const PIN_DISPLAY_MOSI = DAL.P0_13 // P15
    export const PIN_DISPLAY_MISO = DAL.P0_1 // unused for TFT-only; kept for CODAL SPI ctor
    export const PIN_DISPLAY_CS = DAL.P1_2 // P16
    export const PIN_DISPLAY_DC = DAL.P0_10 // P8
    export const PIN_DISPLAY_RST = DAL.P0_12 // P12
    // Backlight: LED tied to 3V3 on this board — always on, no software control needed.
    // PIN_DISPLAY_BL omitted; driver will not toggle a BL pin.

    // --- Arcade controls (direct GPIO; see controllerbuttons.cpp setupButton) ---
    export const PIN_BTN_UP = DAL.P0_3   // P1
    export const PIN_BTN_DOWN = DAL.P0_4 // P2
    export const PIN_BTN_LEFT = DAL.P0_31 // P3
    export const PIN_BTN_RIGHT = DAL.P0_28 // P4
    export const PIN_BTN_A = DAL.P0_14   // P5 (also on-board button A)
    export const PIN_BTN_B = DAL.P0_23   // P11 (also on-board button B)
    export const PIN_BTN_MENU = DAL.P0_9 // P9

    // Audio: on-board buzzer (same as N3 / micro:bit). Default mixer volume is 128/255 — bump to max.
    export const PIN_JACK_SND = DAL.P0_0
    export const SPEAKER_VOLUME = 255

    // P12 is display RST — Jacdac TX not routed (omit PIN_JACK_TX)

    // --- Display tuning (ST7735 128x160; logical 160x120 playfield) ---
    export const DISPLAY_WIDTH = 160
    export const DISPLAY_HEIGHT = 128
    export const DISPLAY_DELAY = 300
    export const CLOCK_SPEED = 32
    export const DISPLAY_TYPE = 7735 // DISPLAY_TYPE_ST7735 — direct panel, not smart 4242

    // DISPLAY_CFG0 low byte = MADCTL sent directly to ST7735:
    //   Bit 7 (0x80) MY  — row scan direction     (1 = bottom→top)
    //   Bit 6 (0x40) MX  — column scan direction  (1 = right→left)
    //   Bit 5 (0x20) MV  — row/col exchange
    //   Bit 3 (0x08) BGR — color order            (1 = BGR, 0 = RGB)
    // 0x80 = MY=1 only. Driver swaps RASET/CASET (see screen---st7735/panic.cpp),
    // so MY controls the user-visible horizontal direction (mirror), MX controls vertical (invert).
    export const DISPLAY_CFG0 = 0x00000080
    export const DISPLAY_CFG1 = 0x00000603
    export const DISPLAY_CFG2 = 8

    // Edge connector aliases for user extensions (P0 is the only unused digital pin).
    export const PIN_P0 = DAL.P0_2
}

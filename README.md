# Sandbox-
 A lightweight React Native application for executing JavaScript code in a secure, isolated environment using a hidden WebView as the execution engine.
# JS Sandbox

A lightweight React Native application for executing JavaScript code in a
secure, isolated environment using a hidden WebView as the execution engine.

---

## What It Does

JS Sandbox lets you write and run JavaScript directly on your Android device.
Code runs inside a sandboxed WebView completely isolated from the host app,
so nothing you execute can touch native modules, device storage, or app state.
Results, console logs, and errors are piped back to the UI in real time.

---

## Features

- **Isolated Execution** — Code runs inside a hidden WebView sandbox, with no
  access to the host app or native Android APIs.
- **Real-time Output** — console.log calls and return values appear instantly
  in the output panel as they happen.
- **Error Handling** — Runtime errors are caught and displayed clearly without
  crashing the app.
- **Execution Timeout** — A 10-second watchdog timer automatically kills
  infinite loops before they lock the UI.
- **Line Numbers** — The editor displays line numbers alongside your code for
  easier debugging.
- **Security Hardened** — Pop-ups, localStorage, geolocation, file access, and
  inline media are all blocked at the WebView level.

---

## Project Structure

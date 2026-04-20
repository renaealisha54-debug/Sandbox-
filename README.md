# Sandbox-# JS-Sandbox-18

A lightweight React Native application designed to execute dynamic JavaScript code in a secure, isolated environment using a hidden WebView.

## Features
- **Isolated Execution:** Code runs inside a sandboxed WebView, preventing access to the host app's native modules.
- **Real-time Feedback:** Instantly view console logs, return values, or execution errors.
- **Safety First:** Implements a 10-second execution timeout to prevent infinite loops from locking the UI.

## Project Structure
- `src/components/`: UI components (Editor, Output, WebView).
- `src/hooks/`: Business logic for the WebView bridge and execution flow.
- `src/types/`: TypeScript definitions for the message schema.

## How it Works
1. **Input:** User submits JS code via the `CodeEditor`.
2. **Injection:** The app wraps the code in a `try/catch` block and uses `injectJavaScript` to push it to the WebView.
3. **Execution:** The WebView executes the code, and results are passed back to the native side via `window.ReactNativeWebView.postMessage`.
4. **Communication:** The `OutputPanel` listens for these messages to display the status and output to the user.

## Security
- `javaScriptCanOpenWindowsAutomatically` is set to `false`.
- `domStorageEnabled` is set to `false`.
- All execution is wrapped in an IIFE to prevent global scope pollution.

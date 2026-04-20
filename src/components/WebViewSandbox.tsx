import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { WebView } from 'react-native-webview';

interface WebViewSandboxProps {
  onMessageReceived: (message: string) => void;
}

// Define the interface for the ref methods
export interface WebViewSandboxRef {
  runCode: (code: string) => void;
}

const WebViewSandbox = forwardRef<WebViewSandboxRef, WebViewSandboxProps>(
  ({ onMessageReceived }, ref) => {
    const webViewRef = useRef<WebView>(null);

    // Expose methods to the parent via the ref
    useImperativeHandle(ref, () => ({
      runCode: (code: string) => {
        const wrappedCode = `
          (function() {
            try {
              // Capture output
              const result = eval(${JSON.stringify(code)});
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SUCCESS', data: result }));
            } catch (e) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ERROR', data: e.message }));
            }
          })();
        `;
        webViewRef.current?.injectJavaScript(wrappedCode);
      },
    }));

    return (
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: '<html><body></body></html>' }}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={false}
        domStorageEnabled={false}
        onMessage={(event) => {
          onMessageReceived(event.nativeEvent.data);
        }}
        // Hide the webview as it's only an execution engine
        style={{ width: 0, height: 0, opacity: 0 }}
      />
    );
  }
);

export default WebViewSandbox;

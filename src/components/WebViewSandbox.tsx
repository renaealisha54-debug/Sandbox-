import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { WebView } from 'react-native-webview';

export interface WebViewSandboxRef {
  runCode: (code: string) => void;
}

interface WebViewSandboxProps {
  onMessageReceived: (message: string) => void;
}

const WebViewSandbox = forwardRef<WebViewSandboxRef, WebViewSandboxProps>(
  ({ onMessageReceived }, ref) => {
    const webViewRef = useRef<WebView>(null);

    useImperativeHandle(ref, () => ({
      runCode: (code: string) => {
        const wrappedCode = `
          (function() {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
              const msg = args.join(' ');
              logs.push(msg);
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'LOG', data: msg })
              );
              originalLog.apply(console, args);
            };
            try {
              const result = eval(${JSON.stringify(code)});
              if (result !== undefined) {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({ type: 'SUCCESS', data: String(result) })
                );
              } else if (logs.length === 0) {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({ type: 'SUCCESS', data: 'undefined' })
                );
              }
            } catch (e) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'ERROR', data: e.message })
              );
            }
          })();
          true;
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
        geolocationEnabled={false}
        allowFileAccess={false}
        allowsInlineMediaPlayback={false}
        onShouldStartLoadWithRequest={(request) => {
          return request.navigationType === 'other';
        }}
        onMessage={(event) => {
          onMessageReceived(event.nativeEvent.data);
        }}
        style={{ width: 0, height: 0, opacity: 0 }}
      />
    );
  }
);

export default WebViewSandbox;

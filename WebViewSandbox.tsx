<WebView
  // Security Props
  javaScriptEnabled={true}
  javaScriptCanOpenWindowsAutomatically={false} // Prevents pop-ups
  domStorageEnabled={false}                    // Blocks localStorage/sessionStorage
  geolocationEnabled={false}                   // Blocks location tracking
  allowFileAccess={false}                      // Prevents filesystem access
  allowsInlineMediaPlayback={false}            // Blocks media/camera
  
  // Navigation Control
  onShouldStartLoadWithRequest={(request) => {
    // Only allow the initial about:blank or local source load
    return request.navigationType === 'other';
  }}
  
  // Invisible Engine
  style={{ width: 0, height: 0, opacity: 0 }}
  source={{ html: '<html><body></body></html>' }}
/>

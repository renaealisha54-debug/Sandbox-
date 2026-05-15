import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import WebViewSandbox, { WebViewSandboxRef } from './src/components/WebViewSandbox';
import { CodeEditor } from './src/components/CodeEditor';
import { OutputPanel } from './src/components/OutputPanel';
import { useSandbox } from './src/hooks/useSandbox';

const STARTER_CODE = `// Example: try console.log or expressions
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World'));
greet('Sandbox');`;

export default function App() {
  const sandboxRef = useRef<WebViewSandboxRef>(null);
  const { state, runCode, handleMessage, clearOutput } = useSandbox();
  const [code, setCode] = useState(STARTER_CODE);

  const handleRun = () => {
    if (code.trim()) {
      runCode(sandboxRef, code);
    }
  };

  const handleClear = () => {
    setCode('');
    clearOutput();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#181825" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.flex}>
          <View style={styles.editor}>
            <CodeEditor
              code={code}
              setCode={setCode}
              onRun={handleRun}
              onClear={handleClear}
              isRunning={state.status === 'running'}
            />
          </View>
          <View style={styles.output}>
            <OutputPanel logs={state.output} status={state.status} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <WebViewSandbox ref={sandboxRef} onMessageReceived={handleMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#181825',
  },
  flex: {
    flex: 1,
  },
  editor: {
    flex: 1,
  },
  output: {
    flex: 1,
  },
});

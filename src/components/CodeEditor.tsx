import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export const CodeEditor = ({
  code,
  setCode,
  onRun,
  onClear,
  isRunning,
}: CodeEditorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>JS Sandbox</Text>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={onClear}
          activeOpacity={0.7}
        >
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.runBtn, isRunning && styles.runBtnDisabled]}
          onPress={onRun}
          disabled={isRunning}
          activeOpacity={0.7}
        >
          <Text style={styles.runBtnText}>
            {isRunning ? 'Running...' : '▶ Run'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.editorScroll}
        keyboardShouldPersistTaps="handled"
        horizontal={false}
      >
        <View style={styles.editorRow}>
          {/* Line numbers */}
          <View style={styles.lineNumbers}>
            {code.split('\n').map((_, i) => (
              <Text key={i} style={styles.lineNumber}>
                {i + 1}
              </Text>
            ))}
          </View>
          <TextInput
            style={styles.input}
            multiline
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            keyboardType="default"
            placeholder="// Write JavaScript here..."
            placeholderTextColor="#585b70"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#181825',
    borderBottomWidth: 1,
    borderBottomColor: '#313244',
  },
  title: {
    color: '#cdd6f4',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  clearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#313244',
    marginRight: 8,
  },
  clearBtnText: {
    color: '#cdd6f4',
    fontFamily: 'monospace',
    fontSize: 13,
  },
  runBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#a6e3a1',
  },
  runBtnDisabled: {
    backgroundColor: '#313244',
  },
  runBtnText: {
    color: '#1e1e2e',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 13,
  },
  editorScroll: {
    flex: 1,
  },
  editorRow: {
    flexDirection: 'row',
    padding: 10,
  },
  lineNumbers: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
  lineNumber: {
    color: '#585b70',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
  },
  input: {
    flex: 1,
    color: '#cdd6f4',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    textAlignVertical: 'top',
    padding: 0,
  },
});

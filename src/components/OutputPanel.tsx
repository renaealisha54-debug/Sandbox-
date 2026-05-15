import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SandboxStatus } from '../hooks/useSandbox';

interface OutputPanelProps {
  logs: string[];
  status: SandboxStatus;
}

export const OutputPanel = ({ logs, status }: OutputPanelProps) => {
  const getColor = (status: SandboxStatus) => {
    if (status === 'error') return '#ff5555';
    if (status === 'success') return '#50fa7b';
    if (status === 'running') return '#f1fa8c';
    return '#cdd6f4';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Output</Text>
        <View style={[styles.statusDot, { backgroundColor: getColor(status) }]} />
        <Text style={[styles.statusText, { color: getColor(status) }]}>
          {status.toUpperCase()}
        </Text>
      </View>
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        {logs.length === 0 ? (
          <Text style={styles.placeholder}>Run code to see output...</Text>
        ) : (
          logs.map((log, index) => (
            <Text
              key={index}
              style={[styles.logLine, { color: getColor(status) }]}
            >
              {'> ' + log}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    borderTopWidth: 1,
    borderTopColor: '#313244',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#181825',
    borderBottomWidth: 1,
    borderBottomColor: '#313244',
  },
  headerText: {
    color: '#cdd6f4',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
  scroll: {
    padding: 12,
  },
  placeholder: {
    color: '#585b70',
    fontFamily: 'monospace',
    fontSize: 13,
    fontStyle: 'italic',
  },
  logLine: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
  },
});

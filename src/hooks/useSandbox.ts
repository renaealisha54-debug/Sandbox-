import { useState, useCallback, useRef } from 'react';
import { SandboxMessage } from '../types/sandbox';

export type SandboxStatus = 'idle' | 'running' | 'error' | 'success';

export type SandboxState = {
  output: string[];
  status: SandboxStatus;
};

export const useSandbox = () => {
  const [state, setState] = useState<SandboxState>({
    output: [],
    status: 'idle',
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runCode = useCallback((sandboxRef: any, code: string) => {
    setState({ output: [], status: 'running' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setState(prev => ({
        output: [...prev.output, 'Execution timed out after 10 seconds.'],
        status: 'error',
      }));
    }, 10000);

    sandboxRef.current?.runCode(code);
  }, []);

  const handleMessage = useCallback((message: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const parsed: SandboxMessage = JSON.parse(message);
      setState(prev => ({
        output: [...prev.output, parsed.data],
        status: parsed.type === 'ERROR' ? 'error' : 'success',
      }));
    } catch {
      setState(prev => ({
        output: [...prev.output, 'Failed to parse message.'],
        status: 'error',
      }));
    }
  }, []);

  const clearOutput = useCallback(() => {
    setState({ output: [], status: 'idle' });
  }, []);

  return { state, runCode, handleMessage, clearOutput };
};

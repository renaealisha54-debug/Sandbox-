export interface SandboxMessage {
  type: 'SUCCESS' | 'ERROR' | 'LOG';
  data: string;
}

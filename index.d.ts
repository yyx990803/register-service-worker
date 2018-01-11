export type Hooks = {
  ready?: () => void;
  cached?: () => void;
  updated?: () => void;
  offline?: () => void;
  error?: (error: Error) => void;
};

export function register(swUrl: string, hooks: Hooks): void;

export function unregister(): void;

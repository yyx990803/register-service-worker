export type Hooks = {
  ready?: () => void;
  registered?: (registration: any) => void;
  cached?: (registration: any) => void;
  updated?: (registration: any) => void;
  updatefound?: (registration: any) => void;
  offline?: () => void;
  error?: (error: Error) => void;
};

export function register(swUrl: string, hooks: Hooks): void;

export function unregister(): void;

import { APP_MODE } from "@/constants/app";

// utils/logger.ts
type Logger = {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  info: (...args: any[]) => void;
};

const noop = () => {};

export const logger: Logger = import.meta.env.VITE_MODE === APP_MODE.DEVELOPMENT
  ? {
      log: (...args: any[]) => console.log(...args),
      warn: (...args: any[]) => console.warn(...args),
      error: (...args: any[]) => console.error(...args),
      info: (...args: any[]) => console.info(...args),
    }
  : {
      log: noop,
      warn: noop,
      error: noop,
      info: noop,
    };
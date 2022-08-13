import { debounce as debounceCallback } from 'debounce';

const debounce = (
  cb: () => void,
  timeout: number,
): (() => void) & { clear(): void } => debounceCallback(cb, timeout);

export { debounce };

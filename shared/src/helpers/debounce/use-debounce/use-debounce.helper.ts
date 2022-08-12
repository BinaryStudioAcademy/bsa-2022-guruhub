import { debounce } from 'debounce';

const useDebounce = (
  cb: () => void,
  timeout: number,
): (() => void) & { clear(): void } => debounce(cb, timeout);

export { useDebounce };

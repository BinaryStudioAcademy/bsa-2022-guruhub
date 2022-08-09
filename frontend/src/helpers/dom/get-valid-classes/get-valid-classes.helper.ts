import { ClassValue, clsx } from 'clsx';

const getValidClasses = (...values: ClassValue[]): string => clsx(values);

export { getValidClasses };

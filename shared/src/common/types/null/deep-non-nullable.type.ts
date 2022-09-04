type DeepNonNullable<T> = {
  [K in keyof T]: DeepNonNullable<NonNullable<T[K]>>;
};

export { type DeepNonNullable };

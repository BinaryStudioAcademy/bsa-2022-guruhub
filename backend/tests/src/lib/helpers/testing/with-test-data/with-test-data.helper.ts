type TestDataProperty =
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined
  | TestData
  | TestDataProperty[];

type TestData = {
  [key: string | number | symbol]: TestDataProperty;
};

function withTestData<S extends TestData>(
  data: S[],
  createCase: (data: S) => void,
): void;
function withTestData<S extends TestData, D extends TestData>(
  data: ((S & D) | [S, () => D])[],
  createCase: (data: S & D) => void,
): void;

function withTestData<
  S extends TestData,
  D extends TestData = Record<string, never>,
>(
  data: (S | (S & D) | [S, () => D])[],
  createCase: (data: S | (S & D)) => void,
): void {
  data.forEach((dataCase) => {
    if (Array.isArray(dataCase)) {
      const [staticPart, dynamicPart] = dataCase;

      createCase(
        new Proxy<S & D>({} as S & D, {
          get: (_, propertyKey): TestDataProperty => {
            if (staticPart[propertyKey] !== undefined) {
              return staticPart[propertyKey];
            }

            return dynamicPart()[propertyKey];
          },
        }),
      );
    } else {
      createCase(dataCase);
    }
  });
}

export { withTestData };

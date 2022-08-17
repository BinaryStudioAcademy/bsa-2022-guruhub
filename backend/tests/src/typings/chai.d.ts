declare namespace Chai {
  interface Assertion {
    normalExecutionTime: Assertion;
    status(expectedStatus: number): Assertion;
  }
}

/**
 * Error thrown when attempting to directly instantiate an abstract class.
 */
export class NotInstantiableError extends Error {
  constructor(className) {
    super(`Class ${className} is abstract and cannot be instantiated directly.`);
    this.name = "NotInstantiableError";
  }
}

/**
 * Error thrown when calling an abstract method that has not been overridden by a subclass.
 */
export class NotImplementedError extends Error {
  constructor(methodName) {
    super(`Method ${methodName} must be implemented by subclass.`);
    this.name = "NotImplementedError";
  }
}
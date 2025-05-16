import { CustomError } from './custom-error';

describe('CustomError', () => {
  let errorMessage: string;
  let errorStatus: number;
  let customErrorInstance: CustomError;

  beforeEach(() => {
    errorMessage = 'Test error message';
    errorStatus = 400;
    customErrorInstance = new CustomError(errorMessage, errorStatus);
  });

  test('should correctly set the message property', () => {
    expect(customErrorInstance.message).toBe(errorMessage);
  });

  test('should correctly set the status property', () => {
    expect(customErrorInstance.status).toBe(errorStatus);
  });

  test('should be an instance of Error', () => {
    expect(customErrorInstance).toBeInstanceOf(Error);
  });
});

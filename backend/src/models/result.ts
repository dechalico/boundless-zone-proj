export default class TResult<Type> {
  result: Type;
  success: boolean;
  message: string;
  error: Error | undefined;

  constructor(result: Type, success: boolean, message: string, error?: Error) {
    this.success = success;
    this.message = message;
    this.result = result;
    this.error = error;
  }
}

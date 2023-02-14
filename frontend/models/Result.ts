export default class TResult<Type> {
  data: Type;
  success: boolean;
  message: string;
  error: Error | undefined;

  constructor(result: Type, success: boolean, message: string, error?: Error) {
    this.success = success;
    this.message = message;
    this.data = result;
    this.error = error;
  }
}

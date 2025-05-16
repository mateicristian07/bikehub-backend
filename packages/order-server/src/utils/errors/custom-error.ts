export class CustomError extends Error {
  public status: number;

  constructor(message: string | undefined, status: number) {
    super(message);
    this.status = status;
  }
}
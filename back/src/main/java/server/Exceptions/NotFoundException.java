package server.Exceptions;

public class NotFoundException extends Exception {
  private final Throwable cause;

  public NotFoundException(String message) {
    super(message);
    this.cause = null;
  }

  public NotFoundException(String message, Throwable cause) {
    super(message);
    this.cause = cause;
  }
}

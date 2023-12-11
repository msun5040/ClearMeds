package server.Exceptions;

public class BadJSONException extends Exception {
  private final Throwable cause;

  public BadJSONException(String message) {
    super(message);
    this.cause = null;
  }

  public BadJSONException(String message, Throwable cause) {
    super(message);
    this.cause = cause;
  }
}

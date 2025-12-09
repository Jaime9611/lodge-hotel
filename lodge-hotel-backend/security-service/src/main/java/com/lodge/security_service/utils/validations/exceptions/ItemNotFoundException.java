package com.lodge.security_service.utils.validations.exceptions;

public class ItemNotFoundException extends RuntimeException {

  private String resourcePath;

  public ItemNotFoundException() {
  }

  public ItemNotFoundException(String message) {
    super(message);
  }

  public ItemNotFoundException(String message, String path) {
    super(message);
    this.resourcePath = path;
  }

  public ItemNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public ItemNotFoundException(Throwable cause) {
    super(cause);
  }

  public ItemNotFoundException(String message, Throwable cause, boolean enableSuppression,
      boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }
}

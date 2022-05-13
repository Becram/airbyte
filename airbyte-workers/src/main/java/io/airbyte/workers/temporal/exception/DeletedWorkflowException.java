/*
 * Copyright (c) 2021 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.workers.temporal.exception;

public class DeletedWorkflowException extends Exception {

  public DeletedWorkflowException(final String message) {
    super(message);
  }

}

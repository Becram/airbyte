/*
 * Copyright (c) 2021 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.db.jdbc.streaming;

public final class FetchSizeConstants {

  // The desired buffer size in memory to store the fetched rows.
  // This size is not enforced. It is only used to calculate a proper
  // fetch size. The max row size the connector can handle is actually
  // limited by the heap size.
  public static final long TARGET_BUFFER_BYTE_SIZE = 200L * 1024L * 1024L; // 200 MB
  // sample size for making the first estimation of the row size
  public static final int INITIAL_SAMPLE_SIZE = 10;
  // sample size for making the post-initial estimation of the row size
  public static final int POST_INITIAL_SAMPLE_SIZE = 10;
  // sample every N rows during the post-initial stage
  public static final int SAMPLE_FREQUENCY = 100;

  public static final int MIN_FETCH_SIZE = 1;
  public static final int DEFAULT_FETCH_SIZE = 1000;
  public static final int MAX_FETCH_SIZE = 100_000;

  private FetchSizeConstants() {}

}

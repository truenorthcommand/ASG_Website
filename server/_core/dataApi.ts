// Stubbed data API service - not configured for Railway deployment
// Keep type exports for compatibility

export type DataApiCallOptions = {
  endpoint: string;
  method?: string;
  data?: unknown;
  headers?: Record<string, string>;
};

/**
 * Call data API function - STUBBED
 * Throws error indicating data API service is not configured
 */
export async function callDataApi(
  options: DataApiCallOptions
): Promise<unknown> {
  throw new Error(
    "Data API service is not configured. This feature requires a data API integration which has not been set up for this Railway deployment."
  );
}

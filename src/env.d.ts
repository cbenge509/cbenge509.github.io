// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

/**
 * Environment variable type definitions
 *
 * Note: Only PUBLIC_ prefixed variables are client-accessible
 */

interface ImportMetaEnv {
  /**
   * Site URL for production
   * @example 'https://cbenge509.github.io'
   */
  readonly SITE_URL?: string;

  /**
   * Current deployment mode
   */
  readonly MODE: 'development' | 'production';

  /**
   * Whether in development mode
   */
  readonly DEV: boolean;

  /**
   * Whether in production mode
   */
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

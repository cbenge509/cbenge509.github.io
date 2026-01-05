import {getViteConfig} from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.test.{js,ts}', 'test/**/*.test.{js,ts}'],
    exclude: ['node_modules', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,astro}'],
      exclude: [
        'src/**/*.test.ts',
        'src/env.d.ts',
        'src/content/**',
        'src/pages/**',
        'src/scripts/**', // Runtime scripts tested via E2E
        'src/types/**', // Type-only files
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});

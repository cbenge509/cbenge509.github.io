import {getViteConfig} from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.test.{js,ts}'],
    exclude: ['node_modules', 'e2e/**'],
  },
});

import {experimental_AstroContainer as AstroContainer} from 'astro/container';

/**
 * Shared AstroContainer instance for unit tests.
 * Reduces boilerplate and ensures consistent test setup.
 */
let containerInstance: AstroContainer | null = null;

/**
 * Get or create an AstroContainer instance.
 * The container is cached for performance within a test run.
 *
 * @example
 * const container = await getTestContainer();
 * const result = await container.renderToString(MyComponent, { props: {...} });
 */
export async function getTestContainer(): Promise<AstroContainer> {
  if (!containerInstance) {
    containerInstance = await AstroContainer.create();
  }
  return containerInstance;
}

/**
 * Render a component to string using the shared container.
 * Convenience method that combines container creation and rendering.
 *
 * @example
 * const html = await renderComponent(Hero);
 * const html = await renderComponent(Card, { props: { title: 'Test' } });
 */
export async function renderComponent<T>(
  Component: T,
  options?: {props?: Record<string, unknown>; slots?: Record<string, string>},
): Promise<string> {
  const container = await getTestContainer();
  return container.renderToString(
    Component as Parameters<typeof container.renderToString>[0],
    options,
  );
}

/**
 * Reset the container instance (useful for test isolation if needed).
 */
export function resetTestContainer(): void {
  containerInstance = null;
}

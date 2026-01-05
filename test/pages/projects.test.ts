import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect, vi, beforeEach} from 'vitest';

/**
 * Projects Gallery Page Unit Tests
 *
 * Note: Page-level tests with content collections and nested components
 * are better suited for E2E tests. These unit tests focus on the empty
 * state which can be tested without complex mocking.
 *
 * Full rendering tests (with projects) are covered in e2e/projects-gallery.spec.ts
 */

// Mock astro:content module
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

describe('Projects Gallery Page', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders empty state when no projects exist', async () => {
    const {getCollection} = await import('astro:content');
    (getCollection as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ProjectsPage = (await import('../../src/pages/projects/index.astro'))
      .default;
    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);

    expect(result).toContain('Projects coming soon');
    expect(result).toContain('data-testid="empty-state"');
  });

  it('uses container-custom for layout', async () => {
    const {getCollection} = await import('astro:content');
    (getCollection as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ProjectsPage = (await import('../../src/pages/projects/index.astro'))
      .default;
    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);

    expect(result).toContain('container-custom');
  });

  it('has proper section spacing', async () => {
    const {getCollection} = await import('astro:content');
    (getCollection as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ProjectsPage = (await import('../../src/pages/projects/index.astro'))
      .default;
    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);

    expect(result).toContain('py-16');
    expect(result).toContain('md:py-24');
  });

  it('empty state has secondary text color', async () => {
    const {getCollection} = await import('astro:content');
    (getCollection as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ProjectsPage = (await import('../../src/pages/projects/index.astro'))
      .default;
    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);

    expect(result).toContain('text-text-secondary');
    expect(result).toContain('dark:text-text-secondary-dark');
  });

  it('empty state message has proper styling', async () => {
    const {getCollection} = await import('astro:content');
    (getCollection as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ProjectsPage = (await import('../../src/pages/projects/index.astro'))
      .default;
    const container = await AstroContainer.create();
    const result = await container.renderToString(ProjectsPage);

    expect(result).toContain('text-center');
    expect(result).toContain('text-lg');
  });
});

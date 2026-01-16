import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import SecondaryProjectCard from './SecondaryProjectCard.astro';
import {createMockProject} from '../../test/fixtures/props';

// Mock project data for testing (using shared fixtures)
const mockProject = createMockProject({
  title: 'Secondary Test Project',
  description:
    'A utility tool for data analysis and visualization with comprehensive features.',
  category: 'research',
  skills: ['Python', 'Pandas'],
  tools: ['Jupyter'],
});

const mockProjectBuilder = createMockProject({
  category: 'builder',
  title: 'Builder Project',
});

const mockProjectLeader = createMockProject({
  category: 'leader',
  title: 'Leader Project',
});

const mockProjectWinner = createMockProject({
  category: 'winner',
  title: 'Winner Project',
});

describe('SecondaryProjectCard', () => {
  describe('Content Rendering', () => {
    it('renders project title', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('Secondary Test Project');
    });

    it('renders project description', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('data analysis');
    });

    it('renders title with Space Grotesk font', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('font-display');
      expect(result).toContain('font-semibold');
    });

    it('renders single-line description with truncation', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      // Check description has line-clamp-1 for single line
      expect(result).toMatch(/<p[^>]*class="[^"]*line-clamp-1[^"]*"[^>]*>/);
    });

    it('renders title with single-line truncation', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toMatch(/<h3[^>]*class="[^"]*line-clamp-1[^"]*"[^>]*>/);
    });
  });

  describe('Layout', () => {
    it('has horizontal flex layout', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('flex');
      expect(result).toContain('items-stretch');
    });

    it('thumbnail has fixed square dimensions', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      // Check for square thumbnail container
      expect(result).toContain('w-20');
      expect(result).toContain('h-20');
    });
  });

  describe('Category Tags', () => {
    it('renders only single tag', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      // Count ProjectTag occurrences - should be exactly 1
      const tagMatches = result.match(/data-component="project-tag"/g);
      expect(tagMatches).toHaveLength(1);
    });

    it('renders Research tag for research category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('Research');
      expect(result).toContain('bg-purple-100');
    });

    it('renders Technical tag for builder category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProjectBuilder, slug: 'builder-test'},
      });
      expect(result).toContain('Technical');
      expect(result).toContain('bg-green-100');
    });

    it('renders Leadership tag for leader category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProjectLeader, slug: 'leader-test'},
      });
      expect(result).toContain('Leadership');
      expect(result).toContain('bg-blue-100');
    });

    it('renders Winner tag for winner category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProjectWinner, slug: 'winner-test'},
      });
      expect(result).toContain('Winner');
      expect(result).toContain('bg-amber-100');
    });
  });

  describe('Hover and Focus States', () => {
    it('has hover lift effect class', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('hover:-translate-y-1');
    });

    it('has hover shadow effect', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('shadow-sm');
      expect(result).toContain('hover:shadow-lg');
    });

    it('has active tap state', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('active:scale-[0.98]');
    });

    it('has focus-within ring for keyboard focus', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('focus-within:ring-2');
      expect(result).toContain('focus-within:ring-accent');
    });

    it('has smooth transition duration', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('duration-150');
    });
  });

  describe('Image Handling', () => {
    it('includes alt text with project title', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('alt=');
    });

    it('uses lazy loading for images', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('loading="lazy"');
    });
  });

  describe('Navigation', () => {
    it('links to project detail page', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('href="/projects/secondary-test"');
    });

    it('main link has aria-labelledby', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain(
        'aria-labelledby="secondary-project-title-secondary-test"',
      );
    });
  });

  describe('Structure', () => {
    it('has data-component attribute', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('data-component="secondary-project-card"');
    });

    it('uses article element', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('<article');
    });

    it('title uses h3 element', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('<h3');
    });

    it('has minimum touch target height', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('min-h-11');
    });
  });

  describe('Dark Mode', () => {
    it('has dark mode background classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('dark:bg-surface-dark');
    });

    it('has dark mode text classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('dark:text-text-dark');
      expect(result).toContain('dark:text-text-secondary-dark');
    });

    it('has dark mode focus ring', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {project: mockProject, slug: 'secondary-test'},
      });
      expect(result).toContain('dark:focus-within:ring-accent-dark');
    });
  });

  describe('Props Passthrough', () => {
    it('applies custom class', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(SecondaryProjectCard, {
        props: {
          project: mockProject,
          slug: 'secondary-test',
          class: 'custom-secondary-class',
        },
      });
      expect(result).toContain('custom-secondary-class');
    });
  });
});

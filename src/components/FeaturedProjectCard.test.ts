import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import FeaturedProjectCard from './FeaturedProjectCard.astro';
import {createMockProject, mockProjects} from '../../test/fixtures/props';

// Use shared fixtures for consistent test data across the codebase
const mockProject = {
  ...createMockProject({achievement: '1st Place Winner'}),
};

const mockProjectNoGithub = mockProjects.minimal;

const mockProjectLeader = mockProjects.leader;

const mockProjectWinner = mockProjects.winner;

const mockProjectResearch = mockProjects.research;

describe('FeaturedProjectCard', () => {
  describe('Content Rendering', () => {
    it('renders project title', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('Test ML Project');
    });

    it('renders project description', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('machine learning pipeline');
    });

    it('renders title with Space Grotesk font', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('font-display');
      expect(result).toContain('font-semibold');
    });

    it('renders description with line clamp', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('line-clamp-3');
    });
  });

  describe('Category Tags', () => {
    it('renders Technical tag for builder category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('Technical');
      expect(result).toContain('bg-green-100');
    });

    it('renders Leadership tag for leader category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProjectLeader, slug: 'leader-project'},
      });
      expect(result).toContain('Leadership');
      expect(result).toContain('bg-blue-100');
    });

    it('renders Winner tag for winner category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProjectWinner, slug: 'winner-project'},
      });
      expect(result).toContain('Winner');
      expect(result).toContain('bg-amber-100');
    });

    it('renders Research tag for research category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProjectResearch, slug: 'research-project'},
      });
      expect(result).toContain('Research');
      expect(result).toContain('bg-purple-100');
    });

    it('shows achievement for winner category', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProjectWinner, slug: 'winner-project'},
      });
      expect(result).toContain('Grand Prize');
    });
  });

  describe('GitHub Link', () => {
    it('renders GitHub link when provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('GitHub');
      expect(result).toContain('github.com/example/test-project');
    });

    it('does not render GitHub link when not provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProjectNoGithub, slug: 'test-project'},
      });
      expect(result).not.toContain('github.com');
    });

    it('GitHub link opens in new tab', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('GitHub link has external link icon', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      // Check for arrow icon character
      expect(result).toMatch(/GitHub[\s\S]*↗/);
    });

    it('GitHub link has accessible label', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('opens in new tab');
    });
  });

  describe('Hover and Focus States', () => {
    it('has hover lift effect class', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('hover:-translate-y-1');
    });

    it('has hover shadow effect', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('shadow-sm');
      expect(result).toContain('hover:shadow-lg');
    });

    it('has active tap state', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('active:scale-[0.98]');
    });

    it('has focus-within ring for keyboard focus', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('focus-within:ring-2');
      expect(result).toContain('focus-within:ring-accent');
    });

    it('has smooth transition duration', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('duration-150');
    });
  });

  describe('Image Handling', () => {
    it('has 16:9 aspect ratio container', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('aspect-video');
    });

    it('includes alt text with project title', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('alt=');
      expect(result).toContain('Test ML Project');
    });

    it('uses lazy loading for images', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('loading="lazy"');
    });
  });

  describe('Navigation', () => {
    it('links to project detail page', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('href="/projects/test-project"');
    });

    it('main link has aria-labelledby', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('aria-labelledby="project-title-test-project"');
    });
  });

  describe('Structure', () => {
    it('has data-component attribute', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('data-component="featured-project-card"');
    });

    it('uses article element', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('<article');
    });

    it('title uses h3 element', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('<h3');
    });
  });

  describe('Dark Mode', () => {
    it('has dark mode background classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('dark:bg-surface-dark');
    });

    it('has dark mode text classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('dark:text-text-dark');
      expect(result).toContain('dark:text-text-secondary-dark');
    });

    it('has dark mode focus ring', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {project: mockProject, slug: 'test-project'},
      });
      expect(result).toContain('dark:focus-within:ring-accent-dark');
    });
  });

  describe('Props Passthrough', () => {
    it('applies custom class', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(FeaturedProjectCard, {
        props: {
          project: mockProject,
          slug: 'test-project',
          class: 'custom-card-class',
        },
      });
      expect(result).toContain('custom-card-class');
    });
  });
});

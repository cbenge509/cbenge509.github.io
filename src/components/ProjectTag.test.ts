import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import {describe, it, expect} from 'vitest';
import ProjectTag from './ProjectTag.astro';

describe('ProjectTag', () => {
  describe('Rendering', () => {
    it('renders leadership variant with correct colors', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'leadership'},
        slots: {default: 'Leadership'},
      });
      expect(result).toContain('Leadership');
      expect(result).toContain('bg-blue-100');
      expect(result).toContain('text-blue-700');
      expect(result).toContain('dark:bg-blue-900/50');
      expect(result).toContain('dark:text-blue-300');
    });

    it('renders technical variant with correct colors', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'technical'},
        slots: {default: 'Technical'},
      });
      expect(result).toContain('Technical');
      expect(result).toContain('bg-green-100');
      expect(result).toContain('text-green-700');
      expect(result).toContain('dark:bg-green-900/50');
      expect(result).toContain('dark:text-green-300');
    });

    it('renders winner variant with correct colors', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'winner'},
        slots: {default: 'Winner'},
      });
      expect(result).toContain('Winner');
      expect(result).toContain('bg-amber-100');
      expect(result).toContain('text-amber-700');
      expect(result).toContain('dark:bg-amber-900/50');
      expect(result).toContain('dark:text-amber-300');
    });

    it('renders research variant with correct colors', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'research'},
        slots: {default: 'Research'},
      });
      expect(result).toContain('Research');
      expect(result).toContain('bg-purple-100');
      expect(result).toContain('text-purple-700');
      expect(result).toContain('dark:bg-purple-900/50');
      expect(result).toContain('dark:text-purple-300');
    });
  });

  describe('Structure', () => {
    it('has data-component attribute for JS hooks', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'leadership'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('data-component="project-tag"');
    });

    it('has data-variant attribute', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'technical'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('data-variant="technical"');
    });

    it('has pill-shaped styling (rounded-full)', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'winner'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('rounded-full');
    });

    it('has correct font styling', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'research'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('text-xs');
      expect(result).toContain('font-medium');
    });
  });

  describe('Props Passthrough', () => {
    it('applies custom class when provided', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'leadership', class: 'custom-tag-class'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('custom-tag-class');
    });

    it('passes through additional HTML attributes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'technical', 'data-testid': 'tag-test'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('data-testid="tag-test"');
    });
  });

  describe('Dark Mode', () => {
    it('includes all dark mode classes for leadership', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'leadership'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('dark:');
    });

    it('includes all dark mode classes for technical', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'technical'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('dark:bg-green-900/50');
      expect(result).toContain('dark:text-green-300');
    });

    it('includes all dark mode classes for winner', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'winner'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('dark:bg-amber-900/50');
      expect(result).toContain('dark:text-amber-300');
    });

    it('includes all dark mode classes for research', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectTag, {
        props: {variant: 'research'},
        slots: {default: 'Test'},
      });
      expect(result).toContain('dark:bg-purple-900/50');
      expect(result).toContain('dark:text-purple-300');
    });
  });
});

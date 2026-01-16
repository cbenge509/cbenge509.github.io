import {describe, it, expect} from 'vitest';
import {experimental_AstroContainer as AstroContainer} from 'astro/container';
import ProjectImage from './ProjectImage.astro';
import {mockImageMetadata} from '../../test/fixtures/props/project';

describe('ProjectImage', () => {
  describe('Featured Variant', () => {
    it('renders with valid image and hover scale', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test project screenshot',
          variant: 'featured',
        },
      });
      expect(result).toContain('aspect-video');
      expect(result).toContain('overflow-hidden');
      expect(result).toContain('group-hover:scale-105');
      expect(result).toContain('alt="Test project screenshot"');
    });

    it('renders placeholder when image is undefined', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: undefined,
          alt: 'Placeholder image',
          variant: 'featured',
        },
      });
      expect(result).toContain('aspect-video');
      expect(result).toContain('alt="Placeholder image"');
      // Placeholder should not have hover scale
      expect(result).not.toContain('group-hover:scale-105');
    });

    it('has 16:9 aspect ratio container', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
        },
      });
      expect(result).toContain('aspect-video');
    });

    it('disables hover scale when hoverScale is false', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
          hoverScale: false,
        },
      });
      expect(result).not.toContain('group-hover:scale-105');
    });
  });

  describe('Thumbnail Variant', () => {
    it('renders with valid image', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Thumbnail image',
          variant: 'thumbnail',
        },
      });
      expect(result).toContain('w-20');
      expect(result).toContain('h-20');
      expect(result).toContain('md:w-24');
      expect(result).toContain('md:h-24');
      expect(result).toContain('flex-shrink-0');
    });

    it('renders placeholder when image is undefined', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: undefined,
          alt: 'Placeholder thumbnail',
          variant: 'thumbnail',
        },
      });
      expect(result).toContain('w-20');
      expect(result).toContain('alt="Placeholder thumbnail"');
    });

    it('has square dimensions', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Square thumbnail',
          variant: 'thumbnail',
        },
      });
      expect(result).toContain('w-20');
      expect(result).toContain('h-20');
    });
  });

  describe('Common Behavior', () => {
    it('applies custom class to container', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
          class: 'custom-class',
        },
      });
      expect(result).toContain('custom-class');
    });

    it('has object-cover on images', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
        },
      });
      expect(result).toContain('object-cover');
    });

    it('uses lazy loading', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
        },
      });
      expect(result).toContain('loading="lazy"');
    });

    it('has dark mode background classes', async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectImage, {
        props: {
          image: mockImageMetadata,
          alt: 'Test image',
          variant: 'featured',
        },
      });
      expect(result).toContain('bg-surface');
      expect(result).toContain('dark:bg-surface-dark');
    });
  });
});

import {defineCollection, z, type SchemaContext} from 'astro:content';

// === CONTENT COLLECTIONS (Markdown with body) ===

const projects = defineCollection({
  type: 'content',
  schema: ({image}: SchemaContext) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      githubUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      skills: z.array(z.string()),
      tools: z.array(z.string()),
      category: z.enum(['leader', 'builder', 'winner', 'research']),
      achievement: z.string().optional(),
      affiliation: z.string().optional(),
      isFeatured: z.boolean().default(false),
      publishDate: z.coerce.date(),
      order: z.number().optional(),
    }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number(),
    abstract: z.string().optional(), // Made optional - publications may omit abstracts
    pdfUrl: z.string().optional(),
    codeUrl: z.string().url().optional(),
    doiUrl: z.string().url().optional(),
    order: z.number().optional(), // For custom sort order
  }),
});

const patents = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    patentNumber: z.string(),
    filingDate: z.coerce.date(),
    grantDate: z.coerce.date().optional(),
    url: z.string().url().optional(),
    status: z.enum(['filed', 'pending', 'granted']),
  }),
});

// === DATA COLLECTIONS (YAML/JSON, no markdown body) ===

const education = defineCollection({
  type: 'data',
  schema: ({image}: SchemaContext) =>
    z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string(),
      year: z.number(),
      gpa: z.string().optional(),
      logoImage: image(),
      institutionUrl: z.string().url().optional(),
      honors: z.array(z.string()).optional(),
      order: z.number(),
    }),
});

const certifications = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.number(),
    badgeUrl: z.string().optional(),
    verificationUrl: z.string().url().optional(),
    category: z.enum(['cloud', 'data', 'database', 'other']),
    order: z.number(),
  }),
});

const awards = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.enum(['competition', 'professional']),
    description: z.string(),
    placement: z.string().optional(),
    organization: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = {
  projects,
  publications,
  patents,
  education,
  certifications,
  awards,
};

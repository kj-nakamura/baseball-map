import { defineCollection, z } from 'astro:content';

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    team: z.string(),
    stadium: z.string(),
    location: z.string(),
    league: z.string(),
    description: z.string().optional(),
    capacity: z.number().optional(),
    access: z.object({
      train: z.array(z.string()).optional(),
      car: z.string().optional(),
      parking: z.string().optional()
    }).optional(),
    gourmet: z.array(z.object({
      name: z.string(),
      description: z.string(),
      price: z.string().optional()
    })).optional(),
    tips: z.array(z.string()).optional(),
    publishDate: z.date()
  })
});

export const collections = {
  'guides': guidesCollection,
};
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
    access: z
      .object({
        train: z.array(z.string()).optional(),
        car: z.string().optional(),
        parking: z.string().optional(),
      })
      .optional(),
    gourmet: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          price: z.string().optional(),
        })
      )
      .optional(),
    tips: z.array(z.string()).optional(),
    publishDate: z.date(),
  }),
});

const travelCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    destination: z.string(),
    duration: z.string(),
    category: z.string(),
    highlights: z.array(z.string()),
    itinerary: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        activities: z.array(z.string()),
      })
    ),
    cost: z
      .object({
        budget: z.string(),
        accommodation: z.string().optional(),
        transportation: z.string().optional(),
        food: z.string().optional(),
      })
      .optional(),
    tips: z.array(z.string()).optional(),
    publishDate: z.date(),
  }),
});

const mlbCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    team: z.string(),
    stadium: z.string(),
    location: z.string(),
    state: z.string(),
    league: z.string(),
    division: z.string(),
    description: z.string().optional(),
    capacity: z.number().optional(),
    opened: z.number().optional(),
    surface: z.string().optional(),
    amazonLink: z.string().optional(),
    access: z
      .object({
        metro: z.array(z.string()).optional(),
        bus: z.array(z.string()).optional(),
        car: z.string().optional(),
        parking: z.string().optional(),
      })
      .optional(),
    concessions: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          location: z.string().optional(),
        })
      )
      .optional(),
    tips: z.array(z.string()).optional(),
    publishDate: z.date(),
  }),
});

export const collections = {
  guides: guidesCollection,
  travel: travelCollection,
  mlb: mlbCollection,
};

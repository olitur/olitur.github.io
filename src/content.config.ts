import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    // Un post = un dossier (src/content/blog/<slug>/index.mdx) → slug = <slug>, sans "/index".
    // Rétro-compatible avec les articles à plat (<slug>.md).
    generateId: ({ entry }) =>
      entry.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, ''),
  }),
  schema: ({ image }) => z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: image(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Canopée'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const parcellesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/parcelles' }),
  schema: z.object({
    titre: z.string(),
    terrain: z.string().optional(),
    surface: z.string(),
    disponible: z.boolean(),
    prix: z.string(),
    prixM2: z.string().optional(),
    finBail: z.string().optional(),
    localisation: z.string(),
    coordonnees: z.string().optional(),
    emplacement: z.string().url().optional(),
    description: z.string(),
    sol: z
      .object({
        travail: z.boolean(),
        travailDetail: z.string().optional(),
        amendement: z.boolean(),
        amendementDetail: z.string().optional(),
      })
      .optional(),
    irrigation: z.string().optional(),
    equipements: z.array(z.string()).optional(),
    amenagements: z.array(z.string()).optional(),
  }),
});

const terrainsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/terrains' }),
  schema: z.object({
    lettre: z.string(),
    repere: z.number(),
    nom: z.string(),
    lieu: z.string(),
    coordonnees: z.string().optional(),
    emplacement: z.string().url().optional(),
    surfaceParcelle: z.string(),
    etat: z.enum(['travaillée', 'friche']),
    irriguee: z.boolean(),
    ouvert: z.boolean(),
    atoutsCommuns: z.boolean().optional(),
    typeParcelle: z.string(),
    extent: z.object({ nord: z.string(), sud: z.string() }),
    resume: z.string(),
  }),
});

const formationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/formations' }),
  schema: z.object({
    titre: z.string(),
    categorie: z.string(),
    date: z.string(),
    duree: z.string(),
    niveau: z.string(),
    places: z.number(),
    placesRestantes: z.number(),
    prix: z.string(),
    animateur: z.string(),
    description: z.string(),
    programme: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  parcelles: parcellesCollection,
  terrains: terrainsCollection,
  formations: formationsCollection,
};

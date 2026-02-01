import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const citizens = pgTable("citizens", {
  id: serial("id").primaryKey(),
  stt: integer("stt"),
  fullName: text("full_name").notNull(),
  dob: text("dob"),
  gender: text("gender"),
  idCard: text("id_card"),
  ethnicity: text("ethnicity"),
  permanentAddress: text("permanent_address"),
  temporaryAddress: text("temporary_address"),
  currentAddress: text("current_address"),
  voteNationalAssembly: text("vote_national_assembly"),
  votePeopleCouncilProvince: text("vote_people_council_province"),
  votePeopleCouncilCommune: text("vote_people_council_commune"),
  note: text("note"),
});

export const insertCitizenSchema = createInsertSchema(citizens).omit({ id: true });
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Citizen = typeof citizens.$inferSelect;

export const searchSchema = z.object({
  query: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  province: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(20),
});

export type SearchParams = z.infer<typeof searchSchema>;

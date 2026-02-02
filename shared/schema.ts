import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
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

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  description: text("description"),
  coordinates: text("coordinates"), // Optional for manual lat/lng if needed
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email"),
  images: text("images").array(), // Array of image URLs/paths
  status: text("status").default("pending"), // pending, processed, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertCitizenSchema = createInsertSchema(citizens).omit({ id: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });
export const insertReportSchema = createInsertSchema(reports).omit({ id: true, createdAt: true, status: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export type Citizen = typeof citizens.$inferSelect;
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const searchSchema = z.object({
  query: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  province: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(20),
});

export type SearchParams = z.infer<typeof searchSchema>;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

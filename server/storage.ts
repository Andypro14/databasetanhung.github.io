import { db } from "./db";
import { citizens, locations, type InsertCitizen, type Citizen, type Location, type InsertLocation, type SearchParams, type PaginatedResponse } from "@shared/schema";
import { eq, ilike, and, or, sql } from "drizzle-orm";

export interface IStorage {
  getCitizens(params: SearchParams): Promise<PaginatedResponse<Citizen>>;
  createCitizen(citizen: InsertCitizen): Promise<Citizen>;
  createCitizens(citizensData: InsertCitizen[]): Promise<Citizen[]>;
  getLocations(): Promise<Location[]>;
  createLocations(locationsData: InsertLocation[]): Promise<Location[]>;
}

export class DatabaseStorage implements IStorage {
  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async createLocations(locationsData: InsertLocation[]): Promise<Location[]> {
    if (locationsData.length === 0) return [];
    return await db.insert(locations).values(locationsData).returning();
  }

  async getCitizens(params: SearchParams): Promise<PaginatedResponse<Citizen>> {
    const { query, gender, ethnicity, province, page = 1, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (query) {
      const search = `%${query}%`;
      conditions.push(
        or(
          ilike(citizens.fullName, search),
          ilike(citizens.idCard, search),
          ilike(citizens.permanentAddress, search),
          ilike(citizens.currentAddress, search)
        )
      );
    }

    if (gender) {
      conditions.push(ilike(citizens.gender, gender));
    }

    if (ethnicity) {
      conditions.push(ilike(citizens.ethnicity, ethnicity));
    }

    if (province) {
      // Searching in address fields for province name
      const search = `%${province}%`;
      conditions.push(
        or(
          ilike(citizens.permanentAddress, search),
          ilike(citizens.currentAddress, search)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(citizens)
      .where(whereClause);
    
    const total = Number(countResult.count);

    const data = await db
      .select()
      .from(citizens)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async createCitizen(insertCitizen: InsertCitizen): Promise<Citizen> {
    const [citizen] = await db.insert(citizens).values(insertCitizen).returning();
    return citizen;
  }

  async createCitizens(citizensData: InsertCitizen[]): Promise<Citizen[]> {
    if (citizensData.length === 0) return [];
    return await db.insert(citizens).values(citizensData).returning();
  }
}

export const storage = new DatabaseStorage();

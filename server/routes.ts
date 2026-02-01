import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.citizens.list.path, async (req, res) => {
    try {
      const input = api.citizens.list.input.parse(req.query);
      const result = await storage.getCitizens(input);
      res.json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid query parameters" });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed Data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    const existing = await storage.getCitizens({ limit: 1 });
    if (existing.total > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database from Excel...");
    const excelPath = path.resolve(process.cwd(), 'attached_assets/MAU_DANH_SÁCH_1769954239312.xlsx');
    
    if (!fs.existsSync(excelPath)) {
      console.error("Excel file not found:", excelPath);
      return;
    }

    const buf = fs.readFileSync(excelPath);
    const wb = XLSX.read(buf);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

    // Based on inspection:
    // Row 5 is the first data row.
    // Indices:
    // 0: STT
    // 1: Name
    // 2: DOB
    // 3: Male (X)
    // 4: Female (X)
    // 5: ID
    // 7: Ethnicity
    // 8: Permanent Address
    // 9: Temporary Address
    // 10: Current Address
    // 11: Vote NA
    // 12: Vote Council Province
    // 13: Vote Council Commune (Maybe?)
    
    const citizensToInsert = [];

    for (let i = 5; i < data.length; i++) {
      const row = data[i];
      if (!row || !row[1]) continue; // Skip empty rows or rows without name

      // Parse DOB (Excel serial date)
      let dob = row[2];
      if (typeof dob === 'number') {
        // Convert Excel date to JS date string
        const date = new Date((dob - (25567 + 2)) * 86400 * 1000); 
        // Excel base date is usually 1900-01-01. 25569 is offset to 1970-01-01. 
        // 25567 + 2 is commonly used but let's stick to standard formula if possible or just use text if unsure.
        // Actually, let's keep it as text for now if it's complex, or try to format it.
        // Simple approximation:
        dob = new Date(Math.round((dob - 25569) * 86400 * 1000)).toISOString().split('T')[0];
      } else {
        dob = String(dob || "");
      }

      const gender = row[3] === 'X' ? 'Nam' : (row[4] === 'X' ? 'Nữ' : 'Unknown');

      citizensToInsert.push({
        stt: Number(row[0]) || 0,
        fullName: String(row[1] || ""),
        dob: dob,
        gender: gender,
        idCard: String(row[5] || ""),
        ethnicity: String(row[7] || ""),
        permanentAddress: String(row[8] || ""),
        temporaryAddress: String(row[9] || ""),
        currentAddress: String(row[10] || ""),
        voteNationalAssembly: String(row[11] || ""),
        votePeopleCouncilProvince: String(row[12] || ""),
        votePeopleCouncilCommune: String(row[13] || ""), // Assuming this index
        note: String(row[14] || ""), // Assuming last one
      });
    }

    if (citizensToInsert.length > 0) {
      await storage.createCitizens(citizensToInsert);
      console.log(`Seeded ${citizensToInsert.length} citizens`);
    }

  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

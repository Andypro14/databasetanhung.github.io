import * as XLSX from 'xlsx';
import * as fs from 'fs';

try {
  const buf = fs.readFileSync('attached_assets/MAU_DANH_SÁCH_1769954239312.xlsx');
  const wb = XLSX.read(buf);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  // Inspect rows 0-5
  console.log("Rows 0-5:");
  for (let i = 0; i < 6; i++) {
    console.log(`Row ${i}:`, data[i]);
  }
} catch (e) {
  console.error(e);
}

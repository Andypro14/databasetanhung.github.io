import * as XLSX from 'xlsx';
import * as fs from 'fs';

try {
  const buf = fs.readFileSync('attached_assets/MAU_DANH_SÁCH_1769954239312.xlsx');
  const wb = XLSX.read(buf);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  console.log("Columns:", data[0]);
  console.log("First row:", data[1]);
} catch (e) {
  console.error(e);
}

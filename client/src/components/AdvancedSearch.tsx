import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { type SearchParams } from "@shared/schema";

interface AdvancedSearchProps {
  onSearch: (params: Partial<SearchParams>) => void;
  currentParams: SearchParams;
}

export function AdvancedSearch({ onSearch, currentParams }: AdvancedSearchProps) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<Partial<SearchParams>>({
    ethnicity: currentParams.ethnicity || "",
    gender: currentParams.gender || "",
    province: currentParams.province || "",
  });

  const handleApply = () => {
    onSearch(params);
    setOpen(false);
  };

  const handleClear = () => {
    const cleared = { ethnicity: "", gender: "", province: "" };
    setParams(cleared);
    onSearch(cleared);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm">
          <SlidersHorizontal className="h-4 w-4" />
          Bộ lọc nâng cao
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-display text-primary">Tìm kiếm nâng cao</DialogTitle>
          <DialogDescription>
            Lọc kết quả theo các tiêu chí cụ thể để tìm kiếm chính xác hơn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Giới tính
            </Label>
            <div className="col-span-3">
              <Select 
                value={params.gender} 
                onValueChange={(val) => setParams({ ...params, gender: val === "ALL" ? "" : val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả</SelectItem>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ethnicity" className="text-right">
              Dân tộc
            </Label>
            <div className="col-span-3">
              <Select 
                value={params.ethnicity} 
                onValueChange={(val) => setParams({ ...params, ethnicity: val === "ALL" ? "" : val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dân tộc" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả</SelectItem>
                  <SelectItem value="Kinh">Kinh</SelectItem>
                  <SelectItem value="Tày">Tày</SelectItem>
                  <SelectItem value="Thái">Thái</SelectItem>
                  <SelectItem value="H'Mông">H'Mông</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="province" className="text-right">
              Tỉnh/TP
            </Label>
            <Input
              id="province"
              placeholder="Ví dụ: Hà Nội"
              className="col-span-3"
              value={params.province}
              onChange={(e) => setParams({ ...params, province: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClear}>Xóa bộ lọc</Button>
          <Button onClick={handleApply} className="bg-primary hover:bg-primary/90">Áp dụng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

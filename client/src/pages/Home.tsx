import { useState } from "react";
import { useCitizens } from "@/hooks/use-citizens";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import { HighlightText } from "@/components/HighlightText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Loader2, MapPin, Calendar, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    ethnicity: "",
    gender: "",
    province: "",
    page: 1,
    limit: 20
  });

  // Combine query and filters for the hook
  const { data, isLoading, isError } = useCitizens({
    query: searchQuery,
    ...filters
  });

  const handleSearch = () => {
    // The query is already in state, passed to hook. 
    // This button might just be for UX or triggering a specific effect if we weren't using live query params.
    // For this implementation, we will let the input drive the query but debounced if needed.
    // Here we're passing it directly.
  };

  const handleExternalSearch = () => {
    if (!searchQuery) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + " site:dichvucong.gov.vn")}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#a31621] py-16 sm:py-24 overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(#ffeb3b 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight drop-shadow-md">
            Tra cứu thông tin <br className="hidden sm:block" />
            <span className="text-[#ffeb3b]">Cử tri & Công dân</span>
          </h1>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Hệ thống dữ liệu tập trung phục vụ công tác bầu cử và quản lý dân cư.
            Nhập thông tin để tra cứu nhanh chóng và chính xác.
          </p>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-2xl border border-white/20">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  className="pl-10 h-12 bg-white border-none shadow-inner text-base"
                  placeholder="Nhập tên, số CMND/CCCD hoặc địa chỉ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <AdvancedSearch 
                onSearch={(params) => setFilters(prev => ({ ...prev, ...params, page: 1 }))} 
                currentParams={filters}
              />
              <Button 
                size="lg" 
                className="h-12 px-8 bg-[#ffeb3b] text-[#d93025] hover:bg-[#fff59d] font-bold shadow-lg"
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </div>
            
            {searchQuery && (
               <div className="mt-2 flex justify-end">
                 <button 
                   onClick={handleExternalSearch}
                   className="text-xs text-white/80 hover:text-white flex items-center gap-1 hover:underline underline-offset-2 transition-all"
                 >
                   Tìm kiếm trên Google <ExternalLink className="w-3 h-3" />
                 </button>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container-custom py-12 -mt-8 relative z-20">
        <Card className="shadow-xl border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-white p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                  Kết quả tra cứu
                  {data?.total !== undefined && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {data.total} kết quả
                    </Badge>
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Danh sách cử tri được cập nhật mới nhất</p>
              </div>
              
              <div className="flex gap-2">
                {/* Active Filters Display */}
                {(filters.gender || filters.ethnicity || filters.province) && (
                  <div className="hidden md:flex gap-2 items-center">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Đang lọc:</span>
                    {filters.gender && <Badge variant="outline">{filters.gender}</Badge>}
                    {filters.ethnicity && <Badge variant="outline">{filters.ethnicity}</Badge>}
                    {filters.province && <Badge variant="outline">{filters.province}</Badge>}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setFilters({ ethnicity: "", gender: "", province: "", page: 1, limit: 20 })}
                    >
                      Xóa lọc
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-20 text-red-500">
                  <p>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
                </div>
              ) : data?.data.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">Không tìm thấy kết quả nào</p>
                  <p className="text-sm mt-2">Vui lòng thử lại với từ khóa khác</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[60px] text-center font-bold text-gray-700">STT</TableHead>
                      <TableHead className="font-bold text-gray-700 min-w-[200px]">Họ và tên</TableHead>
                      <TableHead className="font-bold text-gray-700 w-[120px]">Ngày sinh</TableHead>
                      <TableHead className="font-bold text-gray-700 w-[100px]">Giới tính</TableHead>
                      <TableHead className="font-bold text-gray-700 min-w-[140px]">CCCD/CMND</TableHead>
                      <TableHead className="font-bold text-gray-700 w-[100px]">Dân tộc</TableHead>
                      <TableHead className="font-bold text-gray-700 min-w-[300px]">Địa chỉ thường trú</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((citizen) => (
                      <TableRow key={citizen.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="text-center font-medium text-gray-500">{citizen.stt}</TableCell>
                        <TableCell className="font-semibold text-primary">
                          <HighlightText text={citizen.fullName} highlight={searchQuery} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {citizen.dob}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={citizen.gender === "Nam" ? "default" : "secondary"} className={
                            citizen.gender === "Nam" 
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-none shadow-none" 
                              : "bg-pink-100 text-pink-700 hover:bg-pink-200 border-none shadow-none"
                          }>
                            {citizen.gender}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-gray-600">
                          <HighlightText text={citizen.idCard || ""} highlight={searchQuery} />
                        </TableCell>
                        <TableCell>{citizen.ethnicity}</TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                            <HighlightText text={citizen.permanentAddress || ""} highlight={searchQuery} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            {data && data.total > data.limit && (
              <div className="border-t p-4 bg-gray-50 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                        className={filters.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <span className="px-4 py-2 text-sm font-medium text-gray-600">
                        Trang {data.page} / {Math.ceil(data.total / data.limit)}
                      </span>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                        className={data.data.length < data.limit ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

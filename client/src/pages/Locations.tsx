import { useQuery } from "@tanstack/react-query";
import { Location } from "@shared/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Locations() {
  const { data: locations, isLoading, isError } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Header />

      <main className="flex-1 container-custom py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
            Địa điểm bỏ phiếu trên địa bàn phường Tân Hưng
          </h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Danh sách chi tiết khu vực bỏ phiếu, đơn vị bầu cử và địa bàn dân cư tại Quận 7, TP.HCM
          </p>
        </div>

        <Card className="shadow-xl border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                Danh sách chi tiết
                {locations?.length !== undefined && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {locations.length} địa điểm
                  </Badge>
                )}
              </h2>
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
              ) : (
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-bold text-gray-700 w-[150px]">Khu vực bỏ phiếu</TableHead>
                      <TableHead className="font-bold text-gray-700 w-[150px]">Đơn vị bầu cử</TableHead>
                      <TableHead className="font-bold text-gray-700 min-w-[250px]">Địa bàn dân cư</TableHead>
                      <TableHead className="font-bold text-gray-700 min-w-[300px]">Địa điểm bỏ phiếu</TableHead>
                      <TableHead className="font-bold text-gray-700 w-[100px] text-center">Bản đồ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations?.map((location) => (
                      <TableRow key={location.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-medium text-gray-900">
                          {location.khuVuc}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/20 text-primary">
                            {location.donViBauCu}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 leading-relaxed">
                          {location.diaBanDanCu}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#a31621] mt-0.5 shrink-0" />
                            <span className="text-sm font-semibold text-gray-900">{location.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="text-primary hover:text-primary/80"
                            data-testid={`btn-map-${location.id}`}
                          >
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                location.address + " Tân Hưng Quận 7 TP.HCM"
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

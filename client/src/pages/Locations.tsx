import { useQuery } from "@tanstack/react-query";
import { Location } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Locations() {
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Header />

      <main className="flex-1 container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-gray-900">Danh sách địa điểm</h1>
          <p className="text-gray-500 mt-2">Khu vực bỏ phiếu và địa điểm công cộng tại Phường Tân Hưng</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse border-none shadow-md">
                <CardHeader className="h-24 bg-muted rounded-t-xl" />
                <CardContent className="h-24 bg-muted/50 mt-4 rounded-b-xl" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations?.map((location) => (
              <Card key={location.id} className="hover-elevate border-none shadow-lg overflow-hidden group">
                <div className="h-2 bg-primary w-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-primary font-display">
                    <MapPin className="h-5 w-5 text-[#a31621]" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-500 shrink-0 mt-1">Địa chỉ:</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{location.address}</p>
                  </div>
                  {location.description && (
                    <div className="flex items-start gap-2 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-600 italic">"{location.description}"</p>
                    </div>
                  )}
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/10"
                    data-testid={`link-google-maps-${location.id}`}
                  >
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        location.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Xem trên Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

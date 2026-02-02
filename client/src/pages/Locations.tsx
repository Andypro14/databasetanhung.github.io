import { useQuery } from "@tanstack/react-query";
import { Location } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Locations() {
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">Trang chủ</Button>
          </Link>
          <Link href="/locations">
            <Button variant="secondary" size="sm">Địa điểm</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Danh sách địa điểm</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-24 bg-muted" />
                <CardContent className="h-24 bg-muted/50 mt-4" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations?.map((location) => (
              <Card key={location.id} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{location.address}</p>
                  {location.description && (
                    <p className="text-sm mb-4">{location.description}</p>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
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
    </div>
  );
}

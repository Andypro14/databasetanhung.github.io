import { Link } from "wouter";
import { Search, User, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Thông tin và dịch vụ", href: "/services" },
    { label: "Thanh toán trực tuyến", href: "/payment" },
    { label: "Phản ánh kiến nghị", href: "/feedback" },
    { label: "Hỗ trợ", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="bg-primary/5 py-1 text-xs text-center text-primary font-medium border-b border-primary/10">
        CỔNG THÔNG TIN CÔNG PHƯỜNG TÂN HƯNG - VIỆT NAM
      </div>
      
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
           <div className="relative w-12 h-12 flex items-center justify-center bg-primary rounded-full shadow-lg text-white font-bold text-xl border-4 border-yellow-400 group-hover:scale-105 transition-transform duration-300">
             <div className="absolute inset-0 rounded-full border border-white/50 m-1"></div>
             
           </div>
           <div className="flex flex-col">
             <span className="text-xl font-bold font-display text-primary leading-none uppercase tracking-wide">
               Cổng thông tin công
             </span>
             <span className="text-sm font-medium text-gray-500 tracking-wider">
               Phường Tân Hưng
             </span>
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-md transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50 font-medium">
            Đăng ký
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20">
            Đăng nhập
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-lg font-medium text-gray-900 hover:text-primary py-2 border-b border-gray-100">
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" className="w-full">Đăng ký</Button>
                <Button className="w-full bg-primary hover:bg-primary/90">Đăng nhập</Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

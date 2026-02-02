import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-secondary mt-auto">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg font-display uppercase tracking-wider">Cổng Thông tin công</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Hệ thống tra cứu thông tin đại biểu cử tri, cung cấp thông tin công trực tuyến.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase text-sm">Liên kết</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-secondary transition-colors">Chính phủ</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Các Bộ ngành</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Địa phương</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase text-sm">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-secondary transition-colors">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Hướng dẫn sử dụng</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Liên hệ</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase text-sm">Liên hệ</h4>
          <div className="text-sm space-y-2">
            <p>Tổng đài hỗ trợ: <span className="text-secondary font-bold">1800 1096</span></p>
            <p>Email: phuongtanhung@gov.vn</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; 2026 Cổng Thông tin công Phường Tân Hưng. Bản quyền thuộc về Đoàn Thanh niên Phường Tân Hưng.
      </div>
    </footer>
  );
}

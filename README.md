# 💌 Thiệp 20.10 – Hoa hồng nhung

Thiệp điện tử chúc mừng ngày Phụ nữ Việt Nam 20/10, tối ưu cho điện thoại.
Viết thuần HTML / CSS / JS, không cần build, chạy được ngay trên GitHub Pages.

## Tính năng
- Bìa thiệp màu hồng, bó hoa hồng nhung vẽ bằng SVG, có hiệu ứng lấp lánh
- Bấm **Mở thiệp** → bìa lật mở 3D, tim bung ra
- Nội dung bên trong hiện **từng chữ một** (chữ bay vào), chạm để hiện nhanh
- Vài cánh hoa rơi nhẹ trên màn hình
- Nút **Xem lại** để chạy lại lời chúc
- Nhạc nền tùy chọn

## Cấu trúc
```
index.html   – khung trang + SVG hoa hồng
style.css    – giao diện & hiệu ứng
script.js    – logic mở thiệp, chạy chữ, cánh hoa
config.js    – ✏️ NỘI DUNG THIỆP (sửa ở đây)
```

## Tùy chỉnh nội dung
Mở `config.js` và sửa các dòng chữ: tên người nhận/gửi, chữ trên bìa, lời chúc, chữ ký, tốc độ chạy chữ, số cánh hoa, nhạc nền.

Đổi tên nhanh bằng link, không cần sửa code:
```
https://<username>.github.io/<repo>/?to=Lan&from=Minh
```

## Chạy thử trên máy
Mở trực tiếp `index.html` bằng trình duyệt.

## Đăng lên GitHub Pages
1. Tạo repo mới trên GitHub (ví dụ `thiep-20-10`), để **Public**.
2. Đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "Thiep 20-10"
   git branch -M main
   git remote add origin https://github.com/<username>/thiep-20-10.git
   git push -u origin main
   ```
3. Vào repo → **Settings** → **Pages** → **Source: Deploy from a branch** → chọn `main` / `/ (root)` → **Save**.
4. Đợi 1–2 phút, thiệp sẽ có tại `https://<username>.github.io/thiep-20-10/`.

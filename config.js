/* =========================================================
   TÙY CHỈNH NỘI DUNG THIỆP Ở ĐÂY
   - {to}   sẽ được thay bằng tên đầy đủ người nhận
   - {nick} sẽ được thay bằng tên gọi thân mật
   - {from} sẽ được thay bằng tên người gửi
   - Xuống dòng trong message: chỉ cần Enter (dùng dấu ` ` bao quanh)
   ========================================================= */
window.CARD_CONFIG = {
  receiver: "Hoàng Hải Anh", // Tên đầy đủ người nhận
  nickname: "Hải Anh",       // Tên gọi trong lời chúc
  sender: "HiDongne",        // Tên người gửi (chữ ký)

  // Ảnh đại diện trong thiệp (để "" nếu không muốn hiện ảnh)
  avatar: "assets/avatar.jpg",

  // Mặt ngoài thiệp
  coverTop: "Happy Women's Day",
  coverBig: "20.10",
  coverSub: "Gửi tặng {to} 💗",
  openButton: "Mở thiệp 💌",

  // Nội dung bên trong (hiện từng chữ)
  title: "Gửi cô giáo\n{nick} ✨",
  message: `Chúc mừng 20/10 cô giáo chạy bộ dẻo dai nhất quả đất! 🏃‍♀️

Chúc {nick} lên lớp thì học trò ngoan, chấm bài toàn gặp điểm 10, ra đường chạy thì pace ngày càng nhanh mà không hụt hơi 😆

Giáo án, deadline hay đường chạy 21km, cái gì cũng về đích nhẹ nhàng và luôn cười thật tươi nhé.

Happy Women's Day! 🌷`,
  signature: "— {from} —",

  // Hiệu ứng
  typingSpeed: 55,   // ms cho mỗi ký tự (nhỏ hơn = nhanh hơn)
  petalCount: 12,    // số cánh hoa bay trên màn hình (để ít cho nhẹ nhàng)

  // Nhạc nền (tùy chọn): đặt file vào thư mục assets rồi ghi "assets/ten-file.mp3"
  music: ""
};

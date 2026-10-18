/* =========================================================
   TÙY CHỈNH NỘI DUNG THIỆP Ở ĐÂY
   - {to}   sẽ được thay bằng tên người nhận
   - {from} sẽ được thay bằng tên người gửi
   - Xuống dòng trong message: chỉ cần Enter (dùng dấu ` ` bao quanh)
   - Có thể ghi đè tên qua link:  index.html?to=Lan&from=Minh
   ========================================================= */
window.CARD_CONFIG = {
  receiver: "Em",            // Tên người nhận (mặc định)
  sender: "Anh",             // Tên người gửi (mặc định)

  // Mặt ngoài thiệp
  coverTop: "Happy Women's Day",
  coverBig: "20.10",
  coverSub: "Gửi tặng {to} 💗",
  openButton: "Mở thiệp 💌",

  // Nội dung bên trong (hiện từng chữ)
  title: "Gửi {to} thương mến,",
  message: `Nhân ngày 20 tháng 10, chúc {to} luôn xinh đẹp, rạng rỡ như những đóa hồng nhung 🌹

Mong mỗi ngày của {to} đều ngập tràn tiếng cười, thật nhiều niềm vui và thật ít muộn phiền.

Cảm ơn vì đã luôn là một phần thật đặc biệt. Hôm nay và mãi mãi, hãy thật hạnh phúc nhé! 💕`,
  signature: "— {from} —",

  // Hiệu ứng
  typingSpeed: 55,   // ms cho mỗi ký tự (nhỏ hơn = nhanh hơn)
  petalCount: 12,    // số cánh hoa bay trên màn hình (để ít cho nhẹ nhàng)

  // Nhạc nền (tùy chọn): đặt file vào thư mục assets rồi ghi "assets/ten-file.mp3"
  music: ""
};

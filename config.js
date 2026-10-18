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
  sender: "Anh",             // Tên người gửi

  // Ảnh đại diện trong thiệp (để "" nếu không muốn hiện ảnh)
  avatar: "assets/avatar.jpg",

  // Mặt ngoài thiệp
  coverTop: "Happy Women's Day",
  coverBig: "20.10",
  coverSub: "Gửi tặng {to} 💗",
  openButton: "Mở thiệp 💌",

  // Nội dung bên trong (hiện từng chữ)
  title: "Gửi {nick} ✨",
  message: `20/10 rồi đó! Chúc {nick} lúc nào cũng cười tươi như tấm ảnh này nha 📸

Mong công việc suôn sẻ, deadline nhẹ nhàng, ăn gì cũng ngon mà không lo tăng cân 😆

Cứ vui vẻ, tự tin và là chính mình nhé. Happy Women's Day! 🌷`,
  signature: "— {from} —",

  // Hiệu ứng
  typingSpeed: 55,   // ms cho mỗi ký tự (nhỏ hơn = nhanh hơn)
  petalCount: 12,    // số cánh hoa bay trên màn hình (để ít cho nhẹ nhàng)

  // Nhạc nền (tùy chọn): đặt file vào thư mục assets rồi ghi "assets/ten-file.mp3"
  music: ""
};

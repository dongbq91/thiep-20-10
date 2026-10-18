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
  // {blank} là chỗ "...." để cô điền ở câu đố bên dưới
  title: "Chào cô giáo\n{nick} ✨",
  message: `20/10 rồi đó. Chúc cô giáo lúc nào cũng cười tươi xinh đẹp, nụ cười luôn ở trên môi.
Thật nhiều sức khỏe để thực hiện ước mơ của mình. Nhiều hạnh phúc bên người mình yêu thương, đặc biệt là {blank}

Happy Women's Day! 🌷`,
  signature: "— {from} —",

  // Câu đố nhỏ cuối thư
  quiz: {
    question: "Câu hỏi nhỏ 🤔\nĐố Em điền đúng chỗ .... trong thư!",
    openButton: "Trả lời ✍️",      // nút dưới thiệp để mở ô nhập
    solvedButton: "Xem lại ảnh 🎁", // nút sau khi đã trả lời đúng
    placeholder: "Em nhập câu trả lời...",
    button: "Trả lời",
    keyword: "đông", // câu trả lời phải có chữ này (không phân biệt hoa thường)
    wrong: ["Sai rồi!", "Sai tiếp!", "Vẫn sai 😤", "SAI!!", "Nhìn kỹ chữ ký đi 👀", "SAI TO LUÔN!!!"],
    successTitle: "Chuẩn không cần chỉnh! 🎉",
    successText: "Đặc biệt là {answer} chứ còn ai vào đây nữa 😎🌹",
    photo: "assets/dong.jpg",
    closeButton: "Đóng 💕"
  },

  // Hiệu ứng
  typingSpeed: 55,   // ms cho mỗi ký tự (nhỏ hơn = nhanh hơn)
  petalCount: 12,    // số cánh hoa bay trên màn hình (để ít cho nhẹ nhàng)

  // Nhạc nền (tùy chọn): đặt file vào thư mục assets rồi ghi "assets/ten-file.mp3"
  music: ""
};

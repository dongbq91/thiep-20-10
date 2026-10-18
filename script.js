(() => {
  const cfg = Object.assign({
    receiver: "Em",
    nickname: "",
    sender: "Anh",
    avatar: "",
    coverTop: "Happy Women's Day",
    coverBig: "20.10",
    coverSub: "Gửi tặng {to}",
    openButton: "Mở thiệp 💌",
    title: "",
    message: "",
    signature: "",
    typingSpeed: 55,
    petalCount: 12,
    music: ""
  }, window.CARD_CONFIG || {});

  // Cho phép đổi tên qua link: ?to=Lan&from=Minh
  const params = new URLSearchParams(location.search);
  const to = params.get("to") || cfg.receiver;
  const from = params.get("from") || cfg.sender;
  const nick = params.get("nick") || cfg.nickname || to;
  const fill = (s) =>
    String(s || "").replace(/\{to\}/g, to).replace(/\{nick\}/g, nick).replace(/\{from\}/g, from);

  const $ = (id) => document.getElementById(id);
  const card = $("card");
  const cardWrap = $("cardWrap");
  const cover = $("cover");
  const openBtn = $("openBtn");
  const titleEl = $("title");
  const messageEl = $("message");
  const signatureEl = $("signature");
  const replayBtn = $("replayBtn");
  const scroller = $("insideScroll");

  $("coverTop").textContent = fill(cfg.coverTop);
  $("coverBig").textContent = fill(cfg.coverBig);
  $("coverSub").textContent = fill(cfg.coverSub);
  openBtn.textContent = fill(cfg.openButton);
  signatureEl.textContent = fill(cfg.signature);

  // Gắn phiên bản vào link ảnh để điện thoại không dùng ảnh cũ trong cache
  const build = window.BUILD && window.BUILD.indexOf("__") !== 0 ? window.BUILD : "";
  const bust = (url) => (build ? url + (url.includes("?") ? "&" : "?") + "v=" + build : url);

  if (cfg.avatar) {
    $("avatarImg").src = bust(cfg.avatar);
    $("avatarImg").alt = to;
    $("avatar").hidden = false;
  }

  /* ---------- Cánh hoa rơi (ít, nhẹ nhàng) ---------- */
  const petalColors = [
    "linear-gradient(135deg, #ff8fab, #c9184a)",
    "linear-gradient(135deg, #ffc2d4, #ff7aa2)",
    "linear-gradient(135deg, #d1234f, #6a040f)",
    "linear-gradient(135deg, #ffe3ec, #ffa3bd)"
  ];
  const rand = (a, b) => a + Math.random() * (b - a);
  const petals = $("petals");
  for (let i = 0; i < cfg.petalCount; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const dur = rand(10, 18);
    p.style.left = rand(-5, 100) + "vw";
    p.style.animationDuration = dur + "s";
    p.style.animationDelay = -rand(0, dur) + "s";
    p.style.setProperty("--dx", rand(-80, 80) + "px");
    const leaf = document.createElement("i");
    leaf.style.setProperty("--s", rand(10, 20) + "px");
    leaf.style.setProperty("--c", petalColors[i % petalColors.length]);
    leaf.style.animationDuration = rand(2.2, 4) + "s";
    p.appendChild(leaf);
    petals.appendChild(p);
  }

  /* ---------- Tim bung ra ---------- */
  function burstHearts() {
    const box = $("burst");
    const icons = ["❤", "💗", "🌹", "💕", "✨"];
    for (let i = 0; i < 18; i++) {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = icons[i % icons.length];
      const angle = (Math.PI * 2 * i) / 18 + rand(-0.2, 0.2);
      const dist = rand(110, 190);
      h.style.setProperty("--x", Math.cos(angle) * dist + "px");
      h.style.setProperty("--y", Math.sin(angle) * dist + "px");
      h.style.setProperty("--r", rand(-40, 40) + "deg");
      h.style.setProperty("--fs", rand(14, 24) + "px");
      box.appendChild(h);
      setTimeout(() => h.remove(), 1700);
    }
  }

  /* ---------- Hiện từng chữ ---------- */
  let skip = false;
  let runId = 0;
  const caret = document.createElement("span");
  caret.className = "caret";

  const segmenter = window.Intl && Intl.Segmenter ? new Intl.Segmenter("vi", { granularity: "grapheme" }) : null;
  const splitChars = (text) =>
    segmenter ? Array.from(segmenter.segment(text), (s) => s.segment) : Array.from(text);

  const wait = (ms) => new Promise((r) => setTimeout(r, skip ? 0 : ms));

  async function typeInto(el, text, speed, id) {
    el.appendChild(caret);
    let word = null; // gom chữ trong 1 từ để không bị ngắt dòng giữa từ
    for (const ch of splitChars(text)) {
      if (id !== runId) return false;
      if (ch === "\n") {
        word = null;
        el.insertBefore(document.createElement("br"), caret);
      } else if (ch === " ") {
        word = null;
        el.insertBefore(document.createTextNode(" "), caret);
      } else {
        if (!word) {
          word = document.createElement("span");
          word.className = "word";
          el.insertBefore(word, caret);
        }
        const span = document.createElement("span");
        span.className = "ch";
        span.textContent = ch;
        word.appendChild(span);
      }
      if (scroller.scrollHeight > scroller.clientHeight) {
        scroller.scrollTop = scroller.scrollHeight;
      }
      let delay = speed;
      if (/[.!?]/.test(ch)) delay = speed * 8;
      else if (/[,;:]/.test(ch)) delay = speed * 4;
      else if (ch === "\n") delay = speed * 5;
      await wait(delay);
    }
    return true;
  }

  /* ---------- Câu đố điền chỗ trống ---------- */
  const quiz = Object.assign({
    question: "Đố cô điền đúng chỗ .... trong thư!",
    openButton: "Trả lời ✍️",
    solvedButton: "Xem lại ảnh 🎁",
    placeholder: "Nhập câu trả lời...",
    button: "Trả lời",
    keyword: "đông",
    wrong: ["Sai rồi!"],
    successTitle: "Chính xác! 🎉",
    successText: "",
    photo: "",
    closeButton: "Đóng"
  }, cfg.quiz || {});

  const quizEl = $("quiz");
  const quizInput = $("quizInput");
  const quizCount = $("quizCount");
  const wrongPop = $("wrongPop");
  const win = $("win");
  const ask = $("ask");
  const quizOpen = $("quizOpen");
  const quizOpenCta = $("quizOpenCta");
  $("quizQ").textContent = fill(quiz.question);
  $("quizOpenQ").textContent = fill(quiz.question);
  quizInput.placeholder = fill(quiz.placeholder);
  $("quizBtn").textContent = fill(quiz.button);
  $("winTitle").textContent = fill(quiz.successTitle);
  $("winClose").textContent = fill(quiz.closeButton);
  if (quiz.photo) $("winPhoto").src = bust(quiz.photo);
  else $("winPhoto").hidden = true;

  let blankEl = null;
  let wrongCount = 0;
  let solved = false;

  function makeBlank() {
    blankEl = document.createElement("span");
    blankEl.className = "blank";
    blankEl.textContent = "....";
    return blankEl;
  }

  function resetQuiz() {
    wrongCount = 0;
    solved = false;
    quizInput.value = "";
    quizCount.textContent = "";
    closeAsk();
    quizOpen.classList.remove("show", "solved");
    quizOpenCta.textContent = fill(quiz.openButton);
  }

  function openAsk() {
    ask.hidden = false;
    quizInput.focus(); // gọi ngay trong lúc chạm để điện thoại bật bàn phím
    requestAnimationFrame(() => ask.classList.add("show"));
  }

  function closeAsk() {
    quizInput.blur();
    ask.classList.remove("show");
    setTimeout(() => {
      if (!ask.classList.contains("show")) ask.hidden = true;
    }, 300);
  }

  function openWin() {
    win.hidden = false;
    requestAnimationFrame(() => win.classList.add("show"));
    burstHearts();
  }

  // Đúng nếu có chữ "đông" hoặc "dong" ở bất kỳ đâu (anh Đông, Dong, ĐÔNG...)
  // Chữ có dấu khác như "đồng", "dòng" thì sai
  function isCorrect(answer) {
    const a = answer.normalize("NFC").toLowerCase();
    const key = quiz.keyword.normalize("NFC").toLowerCase();
    const plain = key.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
    return a.includes(key) || a.includes(plain);
  }

  let popTimer = null;
  function showWrong() {
    wrongCount++;
    const list = quiz.wrong.length ? quiz.wrong : ["Sai rồi!"];
    wrongPop.textContent = list[Math.min(wrongCount - 1, list.length - 1)];
    wrongPop.style.fontSize = Math.min(22 + (wrongCount - 1) * 12, 110) + "px";
    wrongPop.classList.remove("show");
    void wrongPop.offsetWidth; // chạy lại animation
    wrongPop.classList.add("show");
    clearTimeout(popTimer);
    popTimer = setTimeout(() => wrongPop.classList.remove("show"), 1500);

    quizEl.classList.remove("shake");
    void quizEl.offsetWidth;
    quizEl.classList.add("shake");
    quizCount.textContent = "Sai " + wrongCount + " lần rồi đó 🙈";
    if (navigator.vibrate) navigator.vibrate(120);
  }

  function showWin(raw) {
    // viết hoa chữ Đông: "anh đông" / "dong" -> "anh Đông" / "Đông"
    const answer = raw.normalize("NFC").replace(/đông|dong/gi, "Đông");
    solved = true;
    closeAsk();
    quizOpen.classList.add("solved");
    quizOpenCta.textContent = fill(quiz.solvedButton);
    if (blankEl) {
      blankEl.textContent = answer;
      blankEl.classList.add("filled");
      // câu trả lời dài có thể làm xuống dòng -> nới thiệp cho vừa
      scroller.style.height = "auto";
      card.style.setProperty("--open-h", scroller.offsetHeight + "px");
      scroller.style.height = "";
    }
    $("winText").textContent = fill(quiz.successText).replace(/\{answer\}/g, answer);
    // đợi bàn phím đóng lại rồi mới hiện ảnh
    setTimeout(() => {
      openWin();
      setTimeout(burstHearts, 500);
    }, 250);
  }

  quizOpen.addEventListener("click", () => (solved ? openWin() : openAsk()));
  $("askClose").addEventListener("click", closeAsk);
  ask.addEventListener("click", (e) => {
    if (e.target === ask) closeAsk();
  });

  quizEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (solved) return;
    const answer = quizInput.value.trim();
    if (!answer) {
      quizInput.focus();
      return;
    }
    if (isCorrect(answer)) {
      showWin(answer);
    } else {
      showWrong();
      quizInput.select();
    }
  });

  $("winClose").addEventListener("click", () => {
    win.classList.remove("show");
    setTimeout(() => (win.hidden = true), 400);
    if (blankEl) blankEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  async function playContent() {
    const id = ++runId;
    skip = false;
    titleEl.textContent = "";
    messageEl.textContent = "";
    blankEl = null;
    signatureEl.classList.remove("show");
    replayBtn.classList.remove("show");
    resetQuiz();
    scroller.scrollTop = 0;

    const speed = Math.max(10, Number(cfg.typingSpeed) || 55);
    if (!(await typeInto(titleEl, fill(cfg.title), speed * 1.3, id))) return;
    await wait(400);
    const parts = fill(cfg.message).split("{blank}");
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        messageEl.insertBefore(makeBlank(), caret);
        await wait(speed * 8);
      }
      if (!(await typeInto(messageEl, parts[i], speed, id))) return;
    }
    caret.remove();
    await wait(300);
    signatureEl.classList.add("show");
    await wait(900);
    if (blankEl) quizOpen.classList.add("show");
    replayBtn.classList.add("show");
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    // kéo trang xuống để thấy câu hỏi nhỏ dưới thiệp
    if (blankEl) setTimeout(() => quizOpen.scrollIntoView({ behavior: "smooth", block: "end" }), 400);
  }

  // Đo chiều cao nội dung khi đã hiện đủ chữ, để thiệp mở ra vừa khít
  function measureOpenHeight() {
    const t = titleEl.innerHTML;
    const m = messageEl.innerHTML;
    titleEl.style.whiteSpace = messageEl.style.whiteSpace = "pre-line";
    titleEl.textContent = fill(cfg.title);
    messageEl.textContent = fill(cfg.message).replace(/\{blank\}/g, "....");
    scroller.style.height = "auto";
    const h = scroller.offsetHeight;
    scroller.style.height = "";
    titleEl.style.whiteSpace = messageEl.style.whiteSpace = "";
    titleEl.innerHTML = t;
    messageEl.innerHTML = m;
    return h;
  }

  // Chạm vào thiệp khi đang chạy chữ để hiện nhanh
  scroller.addEventListener("click", (e) => {
    if (e.target !== replayBtn) skip = true;
  });
  replayBtn.addEventListener("click", playContent);

  /* ---------- Nhạc nền (tùy chọn) ---------- */
  let audio = null;
  if (cfg.music) {
    audio = new Audio(cfg.music);
    audio.loop = true;
    audio.volume = 0.6;
  }

  /* ---------- Mở thiệp ---------- */
  let opened = false;
  function openCard() {
    if (opened) return;
    opened = true;
    card.style.setProperty("--open-h", measureOpenHeight() + "px");
    card.classList.add("open");
    cardWrap.classList.add("opened");
    openBtn.classList.add("hide");
    if (audio) audio.play().catch(() => {});
    setTimeout(burstHearts, 700);
    setTimeout(playContent, 1500);
  }

  openBtn.addEventListener("click", openCard);
  cover.addEventListener("click", openCard);
  cover.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCard();
    }
  });
})();

const confirmBtn = document.getElementById("confirmBtn");
const napBtn = document.getElementById("napBtn");
const loadingBox = document.getElementById("loadingBox");
const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");

let allowClick = false;
let loading = false;
let progress = 0;
let stuckMode = true;

// Nút xác nhận chạy trốn nếu chưa nạp tiền lần 1
confirmBtn.addEventListener("mouseover", () => {
  if (!allowClick && !loading) {
    confirmBtn.style.position = "absolute";

    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;

    confirmBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Nạp tiền lần 1 → nút đứng yên
napBtn.addEventListener("click", () => {
  if (!allowClick) {
    allowClick = true;
    confirmBtn.style.transform = "translate(0,0)";
    confirmBtn.style.position = "static";
    alert("Nạp tiền thành công! Bạn có thể xác nhận.");
  } else {
    // Nạp tiền lần 2 → cho loading chạy tiếp
    stuckMode = false;
    alert("Nạp thêm thành công! Loading sẽ tiếp tục.");
  }
});

// Bấm xác nhận → bắt đầu loading
confirmBtn.addEventListener("click", () => {
  if (!allowClick) return;

  loading = true;
  loadingBox.style.display = "block";
  runLoading();
});

// Loading troll
function runLoading() {
  const interval = setInterval(() => {
    if (!stuckMode) {
      progress += 2;
      if (progress >= 100) {
        progress = 100;
        updateLoading();
        clearInterval(interval);
        alert("Đăng ký thành công!");
      }
    } else {
      if (progress < 67) {
        progress += 1.5;
      } else {
        progress -= 1.2;
        if (progress < 40) progress = 40;
      }
    }

    updateLoading();
  }, 80);
}

function updateLoading() {
  loadingBar.style.width = progress + "%";
  loadingText.textContent = Math.floor(progress) + "%";
}

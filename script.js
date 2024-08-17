const orderForm = document.getElementById('orderForm');
const submitButton = document.querySelector('button[type="submit"]');
const quantityInput = document.getElementById('quantity');
const milkTypeInput = document.getElementById('milkType');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const milkType = milkTypeInput.value;
  const quantity = quantityInput.value;
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    alert("reCAPTCHA 인증을 완료해주세요.");
    return;
  }

  const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
  const currentTime = Date.now();

  if (lastSubmissionTime && (currentTime - lastSubmissionTime) < 1800000) { // 30분 = 1800000ms
    alert("30분 후에 다시 요청할 수 있습니다.");
    return;
  }

  emailjs.send("service_nikw1fg", "template_n735ves", {
    to_email: "ordermilktojiho@gmail.com",
    milk_type: milkType,
    quantity: quantity,
    "g-recaptcha-response": recaptchaResponse
  })
  .then(function(response) {
    alert("요청 완료했습니다.");
    localStorage.setItem('lastSubmissionTime', currentTime);
    disableForm();
  }, function(error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
  });
});

function disableForm() {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#ccc';
  milkTypeInput.disabled = true;
  quantityInput.disabled = true;
}

// 초기화 시 이전 제출 시간 검사
document.addEventListener('DOMContentLoaded', () => {
  const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
  const currentTime = Date.now();

  if (lastSubmissionTime && (currentTime - lastSubmissionTime) < 1800000) {
    disableForm();
  }
});

const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const milkType = document.getElementById('milkType').value;
  const quantity = document.getElementById('quantity').value;

  const emailBody = `
    새로운 우유 주문이 들어왔습니다!\n
    우유 종류: ${milkType}\n
    수량: ${quantity}개
  `;

  emailjs.send("service_nikw1fg", "template_n735ves", {
    to_email: "ordermilktojiho@gmail.com",
    milk_type: milkType,
    quantity: quantity
  })
  .then(function(response) {
     alert("요청 완료했어요. 보는 순서대로 빠르게 팔로우할게요!");
  }, function(error) {
     alert("알 수 없는 오류가 발생했어요 <에러코드 12>");
  });
});

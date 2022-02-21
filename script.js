const totalBillEL = document.querySelector(".input-bill");
const totalCustomerEL = document.querySelector(".input-customer");
const tipPercentEL = document.querySelectorAll(".tip-percent");
const customPercentEL = document.querySelector(".custom-input");
const totalperPersonEL = document.querySelector(".total-per-person");
const tipPerPersonEL = document.querySelector(".tip-per-person");
const reset = document.querySelector(".reset");
// VALUES

let bill = 0;
let tip = 0;
let person = 0;

const updateTotalAmount = function (bill, tip, person) {
  if (bill > 0 && person > 0) {
    console.log(`updated`, bill, person, tip);
    totalperPersonEL.innerHTML = `$${parseFloat(
      (bill + (bill * tip) / 100) / person
    ).toFixed(2)}`;
  } else {
    totalperPersonEL.innerHTML = `$0.00`;
  }
};

const updateTipAmount = function (bill, tip, person) {
  if (bill > 0 && person > 0) {
    console.log("update bill", bill, tip, person);
    tipPerPersonEL.innerHTML = `$${parseFloat(
      (bill * tip) / 100 / person
    ).toFixed(2)}`;
  }
};

totalBillEL.addEventListener("input", function () {
  reset.classList.add("active");
  bill = +totalBillEL.value;
  updateTotalAmount(bill, tip, person);
});

tipPercentEL.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const parentEl = e.target.closest(".tip-percentages");

    parentEl.classList.toggle("selected");
    tipPercentEL.forEach((btn) => {
      btn.classList.remove("open");
    });

    btn.classList.add("open");
    tip = +btn.innerHTML.slice(0, -1);

    updateTotalAmount(bill, tip, person);
    updateTipAmount(bill, tip, person);
  });
});

totalCustomerEL.addEventListener("input", function (e) {
  person = +totalCustomerEL.value;
  const parentEl = e.target.closest(".total-customer");
  if (person > 0) {
    parentEl.classList.remove("error");
    updateTotalAmount(bill, tip, person);
    updateTipAmount(bill, tip, person);
  }
  if (person == 0) {
    parentEl.classList.add("error");
  }
});

customPercentEL.addEventListener("input", function () {
  tip = customPercentEL.value;
  tipPercentEL.forEach((btn) => {
    btn.classList.remove("open");
  });
  updateTotalAmount(bill, tip, person);
  updateTipAmount(bill, tip, person);
});

reset.addEventListener("click", function () {
  reset.classList.remove("active");
  totalperPersonEL.innerHTML = `$0.00`;
  tipPerPersonEL.innerHTML = `$0.00`;
  totalBillEL.value = totalCustomerEL.value = customPercentEL.value = "";
  tipPercentEL.forEach((btn) => {
    btn.classList.remove("open");
  });
});

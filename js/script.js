const feedSelect = document.querySelector("#feedSelect");
const quantity = document.querySelector("#quantity");
const basePrice = document.querySelector("#basePrice");

const updatePrices = () => {
  if (quantity.value === "" || quantity.value === 0) {
    console.log("quantity.value", quantity.value);

    basePrice.value = "";
  } else {
    let feedPrice = parseFloat(feedSelect.value) * parseFloat(quantity.value);
    basePrice.value = feedPrice.toFixed(2) + " Kč";
    console.log("feedPrice", feedPrice);
  }

  const bio = document.querySelector("#bio").checked;
  const premium = document.querySelector("#premium").checked;
  const lowQuality = document.querySelector("#lowQuality").checked;
  const giftBoxing = document.querySelector("#giftBoxing").checked;

  const shipping = document.querySelector(
    'input[name="shipping"]:checked'
  ).value;

  let finalPrice = parseFloat(basePrice.value.replace(" Kč", ""));
  let basePriceValue = parseFloat(basePrice.value.replace(" Kč", ""));
  console.log("finalPrice", finalPrice);

  if (bio) {
    finalPrice += basePriceValue * 0.3;
  }
  if (premium) {
    finalPrice += basePriceValue * 0.5;
  }
  if (lowQuality) {
    finalPrice -= basePriceValue * 0.15;
  }
  if (giftBoxing) {
    finalPrice += 500;
  }

  switch (shipping) {
    case "kuryr":
      finalPrice += finalPrice * 0.1;
      break;
    case "ceskaPosta":
      finalPrice += 250;
      break;
    default:
      break;
  }

  document.querySelector("#finalPrice").value = finalPrice.toFixed(2) + " Kč";
};

feedSelect.addEventListener("change", updatePrices);
quantity.addEventListener("change", updatePrices);
basePrice.addEventListener("change", updatePrices);

const optionalProps = document.querySelectorAll(
  "fieldset input[type=checkbox]"
);
optionalProps.forEach((prop) => {
  prop.addEventListener("change", updatePrices);
});

const shippingMethods = document.querySelectorAll('input[name="shipping"]');
shippingMethods.forEach((method) => {
  method.addEventListener("change", updatePrices);
});

const checkBudget = () => {
  const finalPrice = parseFloat(
    document.querySelector("#finalPrice").value.replace(" Kč", "") || 0
  );
  const availableAmount = parseFloat(
    document.querySelector("#availableAmount").value
  );

  const resultMessage = document.querySelector("#resultMessageLess");
  const resultMessageMore = document.querySelector("#resultMessageMore");
  if (availableAmount >= finalPrice) {
    resultMessage.classList.add("hidden");
    resultMessageMore.classList.remove("hidden");
  } else {
    resultMessage.classList.remove("hidden");
    resultMessageMore.classList.add("hidden");
  }
};

const checkButton = document.querySelector("#checkButton");
checkButton.addEventListener("click", checkBudget);

let email = document.querySelector("#email");
email.addEventListener("blur", (e) => {
  const regex = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$";
  const emailError = document.querySelector("#emailError");
  if (!e.target.value.match(regex)) {
    emailError.classList.remove("hidden");
  } else {
    emailError.classList.add("hidden");
  }
});
email.addEventListener("input", (e) => {
  const regex = /[^a-zA-Z0-9._@\-]/g;
  e.target.value = e.target.value.replace(regex, "");
});

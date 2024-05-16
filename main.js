var numberOfPeople = 0;
var tip = 0;
var bill = 0;
document.addEventListener("DOMContentLoaded", function () {
    var billInput = document.getElementById("bill");
    var tipInput = document.getElementById("tip");
    var peopleInput = document.getElementById("people");
    var tipAmount = document.getElementById("tip-amount");
    var totalAmount = document.getElementById("total-amount");
    var resetButton = document.getElementById("reset-button");
    var errorElement = document.getElementById("error");
    var keyDownValidator = function (event, type) {
        var isReal = false;
        if (type === "bill")
            isReal = true;
        if (event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Tab") {
            return;
        }
        if (!/^\d$/.test(event.key) && event.key !== ".") {
            event.preventDefault();
        }
        var currentValue = event.target.value;
        if (event.key === ".")
            if ((isReal && currentValue.includes(".")) || !isReal) {
                event.preventDefault();
            }
    };
    var alertToInputNumberOfPeople = function () {
        if (numberOfPeople === 0) {
            peopleInput.classList.add("error-input");
            errorElement.style.display = "block";
        }
        else {
            peopleInput.classList.remove("error-input");
            errorElement.style.display = "none";
        }
    };
    var calculatorShareBill = function () {
        if (numberOfPeople === 0) {
            alertToInputNumberOfPeople();
            return;
        }
        var total = bill + (bill * tip) / 100;
        var totalShare = total / numberOfPeople;
        var tipPerPeople = (total - bill) / numberOfPeople;
        var billPerPeople = totalShare - tipPerPeople;
        tipAmount.innerHTML = "".concat(tipPerPeople.toFixed(2));
        totalAmount.innerHTML = "".concat(billPerPeople.toFixed(2));
    };
    resetButton.addEventListener("click", function () {
        bill = 0;
        tip = 0;
        numberOfPeople = 0;
        billInput.value = "";
        tipInput.value = "";
        peopleInput.value = "";
        tipAmount.innerHTML = "0.00";
        totalAmount.innerHTML = "0.00";
    });
    var setTip = function (element) {
        element.addEventListener("click", function () {
            var currentActiveButton = document.getElementsByClassName("tip-option--active")[0];
            if (currentActiveButton)
                currentActiveButton.classList.remove("tip-option--active");
            element.classList.add("tip-option--active");
            tip = parseFloat(element.innerHTML);
            tipInput.value = "";
            calculatorShareBill();
        });
    };
    var tipButtons = document.getElementsByClassName("tip-select");
    Array.from(tipButtons).forEach(function (element) {
        setTip(element);
    });
    var watchInput = function (input, type) {
        input.addEventListener("keydown", function (event) {
            keyDownValidator(event, type);
        });
        input.addEventListener("paste", function (event) {
            event.preventDefault();
        });
        input.addEventListener("input", function () {
            switch (type) {
                case "bill":
                    if (billInput.value)
                        bill = parseFloat(billInput.value);
                    else
                        bill = 0;
                    calculatorShareBill();
                    break;
                case "tip":
                    var currentActiveButton = document.getElementsByClassName("tip-option--active")[0];
                    if (currentActiveButton)
                        currentActiveButton.classList.remove("tip-option--active");
                    tipInput.classList.add("tip-option--active");
                    if (tipInput.value)
                        tip = parseInt(tipInput.value);
                    else
                        tip = 0;
                    calculatorShareBill();
                    break;
                case "people":
                    if (peopleInput.value)
                        numberOfPeople = parseInt(peopleInput.value);
                    else
                        numberOfPeople = 0;
                    calculatorShareBill();
                    break;
            }
            alertToInputNumberOfPeople();
        });
    };
    watchInput(billInput, "bill");
    watchInput(tipInput, "tip");
    watchInput(peopleInput, "people");
});

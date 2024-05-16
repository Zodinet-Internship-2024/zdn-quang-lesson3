var numberOfPeople: number = 0;
var tip: number = 0;
var bill: number = 0;

document.addEventListener("DOMContentLoaded", () => {
    const billInput = document.getElementById("bill") as HTMLInputElement;
    const tipInput = document.getElementById("tip") as HTMLInputElement;
    const peopleInput = document.getElementById("people") as HTMLInputElement;
    const tipAmount = document.getElementById("tip-amount") as HTMLElement;
    const totalAmount = document.getElementById("total-amount") as HTMLElement;
    const resetButton = document.getElementById("reset-button") as HTMLElement;
    const errorElement = document.getElementById("error") as HTMLElement;

    const keyDownValidator = (event: KeyboardEvent, type: string) => {
        let isReal: boolean = false;
        if (type === "bill") isReal = true;

        if (
            event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Tab"
        ) {
            return;
        }

        if (!/^\d$/.test(event.key) && event.key !== ".") {
            event.preventDefault();
        }

        const currentValue = (event.target as HTMLInputElement).value;
        if (event.key === ".")
            if ((isReal && currentValue.includes(".")) || !isReal) {
                event.preventDefault();
            }
    };

    const alertToInputNumberOfPeople = () => {
        if (numberOfPeople === 0) {
            peopleInput.classList.add("error-input");
            errorElement.style.display = "block";
        } else {
            peopleInput.classList.remove("error-input");
            errorElement.style.display = "none";
        }
    };

    const calculatorShareBill = () => {
        if (numberOfPeople === 0) {
            alertToInputNumberOfPeople();
            return;
        }
        const total = bill + (bill * tip) / 100;
        const totalShare = total / numberOfPeople;
        const tipPerPeople = (total - bill) / numberOfPeople;
        const billPerPeople = totalShare - tipPerPeople;
        tipAmount.innerHTML = `${tipPerPeople.toFixed(2)}`;
        totalAmount.innerHTML = `${billPerPeople.toFixed(2)}`;
    };

    resetButton.addEventListener("click", () => {
        bill = 0;
        tip = 0;
        numberOfPeople = 0;
        billInput.value = "";
        tipInput.value = "";
        peopleInput.value = "";
        tipAmount.innerHTML = "0.00";
        totalAmount.innerHTML = "0.00";
    });

    const setTip = (element: Element) => {
        element.addEventListener("click", () => {
            const currentActiveButton = document.getElementsByClassName(
                "tip-option--active"
            )[0] as HTMLElement;
            if (currentActiveButton)
                currentActiveButton.classList.remove("tip-option--active");
            element.classList.add("tip-option--active");
            tip = parseFloat(element.innerHTML);
            tipInput.value = "";
            calculatorShareBill();
        });
    };
    const tipButtons = document.getElementsByClassName("tip-select");
    Array.from(tipButtons).forEach((element: Element) => {
        setTip(element);
    });

    const watchInput = (input: HTMLInputElement, type: string) => {
        input.addEventListener("keydown", (event: KeyboardEvent) => {
            keyDownValidator(event, type);
        });
        input.addEventListener("paste", (event: ClipboardEvent) => {
            event.preventDefault();
        });

        input.addEventListener("input", () => {
            switch (type) {
                case "bill":
                    if (billInput.value) bill = parseFloat(billInput.value);
                    else bill = 0;
                    calculatorShareBill();
                    break;
                case "tip":
                    const currentActiveButton = document.getElementsByClassName(
                        "tip-option--active"
                    )[0] as HTMLElement;
                    if (currentActiveButton)
                        currentActiveButton.classList.remove(
                            "tip-option--active"
                        );
                    tipInput.classList.add("tip-option--active");
                    if (tipInput.value) tip = parseInt(tipInput.value);
                    else tip = 0;
                    calculatorShareBill();
                    break;
                case "people":
                    if (peopleInput.value)
                        numberOfPeople = parseInt(peopleInput.value);
                    else numberOfPeople = 0;
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

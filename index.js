var numberOfPeople = 0;
var discount = 0;
const bill = document.getElementById("bill").value;

const setNumberOfPeople = (e) => {
    numberOfPeople = e.target.value;
    // console.log(bill);
    console.log(numberOfPeople);
};

const setDiscount = (e) => {
    discount = e.target.value;
    console.log(discount);
};

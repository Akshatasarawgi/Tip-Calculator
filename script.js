const totalBill = document.getElementById('total-bill-amount');
const tipButtons = document.querySelectorAll('.tip-button');
const customTip = document.getElementById('custom');
const people = document.getElementById('number-of-people');
const tipPerPerson = document.querySelector('.tip-per-person');
const totalPerPerson = document.querySelector('.total-per-person');
const resetButton = document.querySelector('.reset-btn');
const error = document.getElementById('error-message');

let amount = 0;
let tip = 0;
let numberOfPeople = 0;

function removeSelectedButton() {
    tipButtons.forEach((button) => {
        button.classList.remove('selectedButton');
    })
}

function removeCustomTip() {
    customTip.value = "";
}

function updateDisplay({ totalTipPerPerson , totalSplitPerPerson}) {
    tipPerPerson.value = totalTipPerPerson.toFixed(2);
    totalPerPerson.value = totalSplitPerPerson.toFixed(2);
    resetButton.disabled = false;
}

let reset = function() {
    amount = 0;
    tip = 0;
    numberOfPeople = 0;
    document.querySelectorAll('input').forEach(input => input.value = '');
    tipPerPerson.value = '0.00';
    totalPerPerson.value = '0.00';
    tipButtons.forEach((button) => {
    button.classList.remove('selectedButton');
    people.classList.remove('input-error');
    error.style.display = "none";
 } )
} 

function calculate(billAmount, tipValue, people) {
  
    if(!billAmount || !tipValue || !people) 
        return  { totalTipPerPerson: 0 , totalSplitPerPerson: 0}

    let totalTip = billAmount * tipValue / 100;
    let total = billAmount + totalTip ;

return {
    totalTipPerPerson: totalTip / people, 
    totalSplitPerPerson: total/ people,
}
}

function setInputValue(type, value) {
    if ( type == 'totalBill') {
      amount = value;
    }
    if ( type == 'button') {
       tip = value;
    }
    if ( type == 'customTip') {
       tip = value;
    }
    if ( type == 'people') {
        numberOfPeople = value ; 
    } 

   const result = calculate( amount, tip, numberOfPeople );
    updateDisplay(result);
}

people.addEventListener('input', () => {
    let numberOfPeople = parseFloat(people.value);
    if (numberOfPeople == 0) {
        people.classList.add('input-error');
        error.style.display = "block";
    }
    else {
        people.classList.remove('input-error');
        error.style.display = "none";
    }
    setInputValue('people', numberOfPeople);
 
})

totalBill.addEventListener('input', () => {
    let amount = parseFloat(totalBill.value);
    setInputValue('totalBill', amount);
 
})

tipButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      removeCustomTip();
      removeSelectedButton();
      let tip = parseFloat(e.target.value);
      button.classList.add('selectedButton');
      setInputValue('button', tip);
    })   
});

customTip.addEventListener('input', () => {
    removeSelectedButton();
    let tip = parseFloat(customTip.value);
    setInputValue('customTip', tip);
})
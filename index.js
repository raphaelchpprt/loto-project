let form  = document.getElementsByTagName('form')[0];
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let emailAdress = document.getElementById('email-adress');
let numbers = document.getElementById('numbers');
let winningNumbers = [];
let codeSize = 6;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function getArrayOfSixRandomNumbers() {
  winningNumbers = []
  for (var i = 0; i < codeSize; i++){
    winningNumbers.push(getRandomIntInclusive(0, 9));
  }
}

function removeAlertMessages(){
  document.getElementById("alert-message").innerHTML = ""
  if(firstName.parentNode.childNodes[2]){firstName.parentNode.childNodes[2].remove()}
  if(lastName.parentNode.childNodes[2]){lastName.parentNode.childNodes[2].remove()}
  if(numbers.parentNode.childNodes[2]) {numbers.parentNode.childNodes[2].remove()}
  if(emailAdress.parentNode.childNodes[2]){emailAdress.parentNode.childNodes[2].remove()}
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkIfGoodNumbers(nums, winningNums) {
	if (nums.length !== winningNums.length){
    numbers.insertAdjacentHTML('afterend', `<small class="text-danger">Le nombre de numéros saisis doit être égale à ${codeSize}.</small>`)
  }
  else {
    for (var i = 0; i < nums.length; i++) {
      if (nums[i] != winningNums[i]){
        document.getElementById("alert-message").innerHTML = `<div class="alert alert-danger mt-3 mb-1" role="alert">
          Désolé vous avez perdu, les numéros gagnants étaient : <br>
            <h5 class="mt-2"><strong><span class="badge badge-pill badge-success">${winningNumbers[0]}</span> 
            <span class="badge badge-pill badge-success">${winningNumbers[1]}</span> 
            <span class="badge badge-pill badge-success">${winningNumbers[2]}</span> 
            <span class="badge badge-pill badge-success">${winningNumbers[3]}</span> 
            <span class="badge badge-pill badge-success">${winningNumbers[4]}</span> 
            <span class="badge badge-pill badge-success">${winningNumbers[5]}</span></strong></h5>
        </div>`;
        return false;
      }
    }
    document.getElementById("alert-message").innerHTML = `<div class="alert alert-success mt-3 mb-1" role="alert">
      Félicitations vous avez gagné 1 million !!!!!
    </div>`;
    return true;
  }
}


function validateField(){
  const firstNameValue = firstName.value;
  if (firstNameValue == ""){
    firstName.insertAdjacentHTML('afterend', '<small class="text-danger">Veuillez fournir un prénom</small>')
  }
  else {
    const lastNameValue = lastName.value;
    if (lastNameValue == ""){
      lastName.insertAdjacentHTML('afterend', '<small class="text-danger">Veuillez fournir un nom</small>')
    }
    else {
      const emailAdressValue = emailAdress.value
      if(emailAdressValue == "") {
        emailAdress.insertAdjacentHTML('afterend', '<small class="text-danger">Veuillez fournir un email</small>')
      }
      else {
        if (!validateEmail(emailAdressValue)) {
          emailAdress.insertAdjacentHTML('afterend', `<small class="text-danger">Votre email n'est pas valide</small>`)
        }
        else{
          const numbersValue = numbers.value.split("")
          checkIfGoodNumbers(numbersValue, winningNumbers)
        }
      }
    }
  }
}


const checkLoto = (firstname, lastname, email, lotoNumbers) => {
  window.addEventListener("DOMContentLoaded", () => {
    form.addEventListener('submit', e => {
      e.preventDefault()
      getArrayOfSixRandomNumbers()
      removeAlertMessages()
      validateField()
    })
  })
}


checkLoto()
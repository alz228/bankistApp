'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//my code 

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date"></div>
    <div class="movements__value">${mov}€</div>
  </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })

}



const rwj = 'ray william johnson jackson peter as qw'
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(item => item[0]).join('');
  })
}

createUsernames(accounts)
console.log(accounts)


// работает но нужна стрелочная
// const calcDisplayBalance = function (movements) {
//   const balance = movements.reduce(function (acc, item) {
//    return acc += item


//   }, 0)
//   console.log(balance)
//   labelBalance.textContent = balance
// }


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, item) => acc += item, 0)
  labelBalance.textContent = `${acc.balance} EUR`
}



const maxMonumets = movements.reduce((acc, item) => item > acc ? acc = item : acc, movements[0])
console.log(maxMonumets + ' was max movement')


const calcDisplaySummary = function (acc) {

  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, item) => acc += item)
  labelSumIn.textContent = incomes

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, item) => acc += item)
  labelSumOut.textContent = out

  const interests = acc.movements.filter(mov => mov > 0).map(deposites => deposites * acc.interestRate / 100).filter(int => { return int > 1 }).reduce((acc, summ) => acc += summ, 0)
  labelSumInterest.textContent = interests



}


const updateUI = function (acc) {
  displayMovements(currentAccount.movements)
  calcDisplayBalance(currentAccount)
  calcDisplaySummary(currentAccount)
}





let currentAccount


// ЛОГИН 
btnLogin.addEventListener('click', function (e) {
  e.preventDefault()

  currentAccount = accounts.find(item => item.userName === inputLoginUsername.value)


  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('ololo')
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 100

    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()

    updateUI(currentAccount)

  }

})
// TRANSACTIONS

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const recieverAcc = accounts.find(acc => acc.userName === inputTransferTo.value)
  console.log(amount, recieverAcc)

  inputTransferAmount.value = ''
  inputTransferTo.value = ''
  if (amount > 0 && recieverAcc && amount <= currentAccount.balance && recieverAcc !== currentAccount) {
    console.log('success')
    currentAccount.movements.push(-amount)
    recieverAcc.movements.push(amount)
    updateUI(currentAccount)
  }

})

btnClose.addEventListener('click', function (e) {
  e.preventDefault()
  if (inputCloseUsername.value === currentAccount.userName && currentAccount.pin ===Number(inputClosePin.value)) {
    const index = accounts.find(acc => acc.username === currentAccount.userName)
    console.log('delete')
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
    labelWelcome.textContent = `Log in to get started`
  }
  inputCloseUsername.value = inputClosePin.value =''
  

})


btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)

  if(amount >0 && currentAccount.movements.some(mov => mov >= amount *0.1) ){
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }
  inputLoanAmount.value =''
})






// formula age< 2 => x2 else 16+ age x4 aa


// coding challenges
// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate 's
// da ta 14,1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's
// data [10, 5, 6, 1, 4]

const julia = [3, 5, 2, 12, 7]
const kate = [4, 1, 15, 8, 3]



// function age(arr, arr2){
//   const newJulia = julia.slice()
//   const newNewJulia = newJulia.splice(-2)
//   console.log(newJulia)

//   const arrBoth = newJulia.concat(arr2)
//   console.log(arrBoth)
//   arrBoth.forEach(function(el){
//    const newAge =  el > 3 ? 'adult': 'puppy'
//    console.log(`dog nubber ${el+1} is ${newAge}`)
//   })
// } 

// age(julia, kate)

// function ageToHuman(arr){
//   const humanAges = arr.map(function(dog){
//     if (dog <=2){
//       dog = dog*2
//       console.log(dog)
//     }
//     else{
//       dog = 16+dog*4
//       console.log(dog)
//     }
//     return dog
//   })
//   console.log(humanAges)
// }
// ageToHuman(julia)



// function averageHumanAge(arr){
//   const humanAges = arr.map(dog => dog<=2 ? dog*2: dog = 16+dog*4)
//   .filter(items => items>=18)
//   .reduce((acc,item) => acc+=item,0)
//   return  humanAges/arr.length
// }

// console.log('average dogs age = ' + averageHumanAge(julia))
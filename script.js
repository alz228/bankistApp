'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-09-08T23:36:17.929Z',
    '2022-09-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', 
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// элементы 
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//форматирование даты
const formatMovementDate = function (date, locale) {
  const calcDisplayPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))

  const passedDays = calcDisplayPassed(new Date(), date)
  if (passedDays === 0) return `Today`
  if (passedDays === 1) return `Yeasterday`
  if (passedDays <= 7) return `${passedDays} days ago`
  else {

    return new Intl.DateTimeFormat(locale).format(date)
  }
}

//форматирование валюты
const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value)

}
// вывод тразакций
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i])
    const displayDate = formatMovementDate(date, acc.locale)
    const formattedMov = formatCurr(mov, acc.locale, acc.currency)


    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

// короткие никнеймы 
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(item => item[0]).join('');
  })
}

createUsernames(accounts)

// расчет баланса
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, item) => acc += item, 0)

  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency)
}


//  три нижних поля
const calcDisplaySummary = function (acc) {

  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, item) => acc += item, 0)
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency)

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, item) => acc += item, 0)
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locate, acc.currency)

  const interests = acc.movements.filter(mov => mov > 0).map(deposites => deposites * acc.interestRate / 100).filter(int => { return int > 1 }).reduce((acc, summ) => acc += summ, 0)
  labelSumInterest.textContent = formatCurr(interests, acc.locale, acc.currency)
}

// обновление данных
const updateUI = function (acc) {
  displayMovements(acc)
  calcDisplayBalance(acc)
  calcDisplaySummary(acc)
}

// таймер 
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(Math.trunc(time % 60)).padStart(2, 0)

    labelTimer.textContent = `${min}.${sec}`

    if (time === 0) {
      containerApp.style.opacity = 0
      labelWelcome.textContent = 'Log in to get started'
      clearTimeout(timer)
    }
    time--
  }
  let time = 120
  const timer = setInterval(tick, 1000)
  tick()
  return timer
}

let currentAccount, timer

// ЛОГИН 
btnLogin.addEventListener('click', function (e) {
  e.preventDefault()
  currentAccount = accounts.find(item => item.userName === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('ololo')
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 100

    const now = new Date()

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    if (timer) clearInterval(timer)
    timer = startLogoutTimer()
    updateUI(currentAccount)
  }
})

// транзакции 
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
    currentAccount.movementsDates.push(new Date().toISOString())
    recieverAcc.movementsDates.push(new Date().toISOString())
    updateUI(currentAccount)
    clearInterval(timer)
    timer = startLogoutTimer()
  }
})

// удаление аккаунта
btnClose.addEventListener('click', function (e) {
  e.preventDefault()
  if (inputCloseUsername.value === currentAccount.userName && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.find(acc => acc.username === currentAccount.userName)
    console.log('delete')
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
    labelWelcome.textContent = `Log in to get started`
  }
  inputCloseUsername.value = inputClosePin.value = ''
})

// кнопка запроса денег
btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Math.floor(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount)
      currentAccount.movementsDates.push(new Date().toISOString())
      updateUI(currentAccount)
      clearInterval(timer)
      timer = startLogoutTimer()
    }, 2500)
  }
  inputLoanAmount.value = ''
})

// кнопка сортировки
let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})
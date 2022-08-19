let actualYear = document.getElementById("actualYear")
const today =  new Date
actualYear.innerHTML = today.getFullYear();

const navbar = document.getElementById("navbar")

/* CHANGE NAVBAR STYLE ON SCROLL */
window.addEventListener("scroll", function(){
  const scrollHeight = window.pageYOffset
  const navbarHeight = navbar.clientHeight

  if (scrollHeight >= navbarHeight)
    navbar.classList.add('scrolling')
  else 
    navbar.classList.remove('scrolling')
})

today.setHours(23)
today.setMinutes(59)
today.setSeconds(59)

const timeInMiliseconds = [
  86400000, // Days
  3600000, // Hours
  60000,  // Minutes
  1000   // Seconds
];

const timer = document.querySelectorAll(".time-end")

function changeTime() {
  let weekday = today.getDay()

  let futureDate = today

  // ñ tem promo na segunda nem na terça
  if (weekday == 1 || weekday == 2) {
    const containerVipBuy = document.querySelectorAll(".container-vip-buy-link")
    const countdownTimer = document.querySelector(".container-timer")
    countdownTimer.remove()

    containerVipBuy[0].innerHTML = `<h2 class="new-price end-timer">R$ 15,99</h2>`
    containerVipBuy[1].innerHTML = `<h2 class="new-price end-timer">R$ 39,99</h2>`

    clearInterval(intervalId)
    return;
  } else {
    while (weekday != 0) { // zero é domingo
      futureDate.setDate(futureDate.getDate() + 1);
      weekday = futureDate.getDay()
    }
  }

  let timeDiff = futureDate - new Date()
  let timeToEnd = [0,0,0,0]

  // how much time it needs to End
  for (let i=0; i<timeInMiliseconds.length; i++) {
    timeToEnd[i] = Math.floor(timeDiff/timeInMiliseconds[i])
    timeDiff %= timeInMiliseconds[i]

    // format the numbers (eg. 1 to 01)
    if (timeToEnd[i] < 10)
      timeToEnd[i] = `0${timeToEnd[i]}`
    
    // change the HTML
    timer[i].innerHTML = `${timeToEnd[i]}`
  }
}

navHeader = document.getElementById('navbar')
toSections = document.querySelectorAll('.section-navigation')
/* FIX SCROLL THROUGHT WEBSITE */
toSections.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()

    // get the href atribute and remove the '#'
    let href = link.getAttribute("href").slice(1)

    // get the refered section Y start offset
    const referedSection_Y = document.getElementById(href).offsetTop

    const navbarHeight = navHeader.clientHeight

    // console.log(referedSection_Y + ' - ' + navbarHeight + ' = ' + (referedSection_Y - navbarHeight))
    scroll(0, (referedSection_Y - navbarHeight))
  })
});

/* To stop the loop: clearInterval(intervalId) */
// Run the function every 1000ms
var intervalId = window.setInterval(function(){
  changeTime()
}, 1000);


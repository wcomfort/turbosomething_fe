document.addEventListener("DOMContentLoaded", () =>{
    console.log('connected')
    getCars()
    const form = document.getElementById('car-form')
    form.addEventListener('submit', submitCar)

    const hp = document.querySelector('#sort-by-hp')
    const tq = document.querySelector('#sort-by-tq')
    const price = document.querySelector('#sort-by-price')
    hp.addEventListener('click', sortByHp)
    tq.addEventListener('click', sortByTq)
    price.addEventListener('click', sortByPrice)
})

function getCars(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(car => {
        // debugger 
        car.forEach((car) =>{
            renderCar(car)})
    })
}

function renderCar(car){
    let container = document.getElementById('car-container')
    let card = document.createElement('div')
    card.classList.add('card', 'col-7')
    container.appendChild(card)
    // card.addEventListener('click', console.log('clicked!'))
    let img = document.createElement('img')
    img.classList.add('img')
    img.src=car.picture 
    let make = document.createElement('h2')
    make.innerText=car.make
    let model = document.createElement('h4')
    model.innerText=car.model
    let price = document.createElement('h4')
    price.innerText=car.price
    let hp = document.createElement('h4')
    hp.innerText= `Horsepower: ${car.hp}`
    let tq = document.createElement('h4')
    tq.innerText= `Torque: ${car.tq}`
    let des = document.createElement('p')
    des.innerText=car.des
    let link = document.createElement('a')
    link.href=car.link
    link.innerText= "Manufacturer"
    card.append(img, make, model, price, hp, tq, des, link)
}

function submitCar(event){
    event.preventDefault()
    const picture = document.getElementById("carpicture").value
    const make = document.getElementById("carmake").value
    const model = document.getElementById("carmodel").value
    const price = document.getElementById("carprice").value
    const hp = document.getElementById("carhp").value
    const tq = document.getElementById("cartq").value
    const des = document.getElementById("cardes").value
    const link = document.getElementById("carlink").value
    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({picture: picture, make: make, model: model, price: price, hp: hp, tq: tq, des: des, link: link})
    })
    .then(res => res.json())
      .then(car => {
    // debugger
              renderCar(car)
          })
          document.getElementById("car-form").reset()
  }

    function sortByHp(event) {
        console.log(event.target)
    }
    function sortByTq(event) {
        console.log(event.target)
    }

    function sortByPrice(event){
        console.log(event.target)
    }
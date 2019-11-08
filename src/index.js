document.addEventListener("DOMContentLoaded", () =>{
    getCars()
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
    card.classList.add('car-card')
    container.appendChild(card)
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
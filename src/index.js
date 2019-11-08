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
    console.log(car)
    let card = document.getElementById('car-card')
    let make = document.createElement('h2')
    make.innerText=car.make
    let model = document.createElement('h4')
    model.innerText=car.model
    let price = document.createElement('h4')
    price.innerText=car.price
    let hp = document.createElement('h4')
    hp.innerText=car.hp
    let tq = document.createElement('h4')
    tq.innerText=car.tq
    let des = document.createElement('p')
    des.innerText=car.des
    let link = document.createElement('a')
    link.href=car.link
    card.append(make, model, price, hp, tq, des, link)
}
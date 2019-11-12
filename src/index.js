let user = "";


document.addEventListener("DOMContentLoaded", () =>{
    console.log('connected')

    let nav = document.getElementById('nav')
    let favBtn = document.createElement('button')
    favBtn.addEventListener('click', myFavs)
    favBtn.innerText = "My Favorites"
    nav.appendChild(favBtn)

    const homeButton = document.querySelector('#home')

    const hp = document.querySelector('#sort-by-hp')
    const tq = document.querySelector('#sort-by-tq')
    const price = document.querySelector('#sort-by-price')
    hp.addEventListener('click', sortByHp)
    tq.addEventListener('click', sortByTq)
    price.addEventListener('click', sortByPrice)

    // getCars()
    welcome()
})



function welcome(){
    const welcome = document.getElementById('welcome')
    let welcomeText = document.createElement('h1')
    welcomeText.innerText = "Welcome to Turbosomething"
    let login = document.createElement("button")
    login.innerText = "Login"
    login.addEventListener('click', userLogin)
    let create = document.createElement("button")
    create.innerText = "Create Account"
    create.addEventListener('click', userCreateAccount)
    welcome.append(welcomeText, login, create)
}

function userLogin() {
    let welcome = document.getElementById('welcome')
    welcome.remove()
    let text = document.createElement('h1')
    text.innerText="Login"
   let form = document.getElementById('login')
   let user = document.createElement('input')
   user.placeholder="email"
   user.id = 'u-email'
   let password = document.createElement('input')
   password.setAttribute('type', 'password')
   password.placeholder="password"
   password.id = 'u-password'
   let submit = document.createElement('button')
   submit.id = "login-btn"
   submit.innerText="Login"
   form.append(text, user, password, submit)
   form.addEventListener('submit', login)
}

function login(event){
    event.preventDefault()
    let form = document.getElementById('login')
    let email = document.getElementById('u-email').value
    let password = document.getElementById('u-password').value
    

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
      .then(userObj => {
         if (userObj){
             user = userObj
            getCars()
            form.remove()
         } else{
             alert("Not a Valid Login. Enter Credentials or Create Account")
         }
        })
}

function userCreateAccount(){
    console.log('new account')
    let welcome = document.getElementById('welcome')
    welcome.remove()
    let text = document.createElement('h1')
    text.innerText="Create An Account"
   let div = document.getElementById('newacct')
    let form = document.createElement('form')
   let firstName = document.createElement('input')
   firstName.placeholder="First Name"
    firstName.id = 'firstName'
   let lastName = document.createElement('input')
   lastName.placeholder="Last Name"
    lastName.id = 'lastName'
   let email = document.createElement('input')
   email.placeholder="Email"
    email.id = 'email'
   let password = document.createElement('input')
   password.placeholder="Password"
    password.id = 'password'
   let submit = document.createElement('button')
    submit.id = 'submit'
    form.id = 'create-user-form'
   submit.innerText="Create Account"
    div.appendChild(form)
   form.append(text, firstName, lastName, email, password, submit)
    form.addEventListener('submit', createUser)
}

function createUser(event){

    event.preventDefault()

    console.log('event')
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({user:{'firstName': firstName, 'lastName': lastName, 'email': email, 'password': password}})
    })
        .then(res => res.json())
        .then(user => {

            if (user.id == null){
                alert("Please enter all fields in form!")
            } else{
                getCars()
            }
        })
      document.querySelector("#create-user-form").innerHTML = ' '
}

function getCars(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(car => {
        // debugger 
        car.forEach((car) =>{
            renderCar(car)})
    })
}

function createCar(){
    let form = document.getElementById('form')
    form.innerHTML= `<form id="car-form">
    <h4>Add A Car:</h4><br>
    <input type="text" id="carpicture" name="picture" placeholder="Enter Image URL">
    <input type="text" id="carmake" name="make" placeholder="Make">
    <input type="text" id="carmodel" name="model" placeholder="Model">
    <input type="integer" id="carprice" name="price" placeholder="Price">
    <input type="integer" id="carhp" name="hp" placeholder="Horsepower">
    <input type="integer" id="cartq" name="tq" placeholder="Torque">
    <input type="text" id="cardes" name="des" placeholder="Description">
    <input type="text" id="carlink" name="link" placeholder="Manufacturer Website">
    <input type="submit" name="submit" value="Add Car">
</form>`
let car = document.getElementById('car-form')
 car.addEventListener('submit', submitCar)
}

function renderCar(car){
    createCar()
    let container = document.getElementById('car-container')
    // body.append(form, container)
    let card = document.createElement('div')
    card.classList.add('card', 'col-7')
    container.appendChild(card)
    card.id = car.id 
    let img = document.createElement('img')
    img.classList.add('img')
    img.addEventListener('click', favorite)
    img.src=car.picture 
    let make = document.createElement('h2')
    make.innerText=car.make
    let model = document.createElement('h4')
    model.innerText=car.model
    let price = document.createElement('h4')
    price.innerText=`$${car.price}`
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
    console.log('submitting')
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
      body: JSON.stringify({car:{'picture': picture, 'make': make, 'model': model, 'price': price, 'hp': hp, 'tq': tq, 'des': des, 'link': link}})
    })
    .then(res => res.json())
      .then(car => {
          if (car.id == null){
              alert("Please enter all fields in form!")
          } else{
            renderCar(car)
        }
          })
          document.getElementById("car-form").reset()
  }
    function clearCards(){
        const cardList = document.querySelectorAll('.card')
        cardList.forEach(card => card.remove())
        document.querySelector('#descending-ascending').innerHTML = ""
    }
    function sortByHp(event) {
        clearCards()
        //Ascending HP
        const div = document.querySelector('#descending-ascending')
        const descendingBtn = document.createElement('button')
        div.appendChild(descendingBtn)
        descendingBtn.innerText = 'Sort by Descending'
        descendingBtn.addEventListener('click', sortByHpDescend)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => current.hp - next.hp)
                sortedArray.forEach(car => renderCar(car))
            })

    }
    function sortByHpDescend(event) {
        console.log('hp descending order')
        clearCards()
        //Ascending tq
        const div = document.querySelector('#descending-ascending')
        const ascendingBtn = document.createElement('button')
        div.appendChild(ascendingBtn)
        ascendingBtn.innerText = 'Sort by Ascending'
        ascendingBtn.addEventListener('click', sortByHp)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.hp - current.hp)
                sortedArray.forEach(car => renderCar(car))
            })
    }

    function sortByTq(event) {
        clearCards()
        //Ascending tq
        const div = document.querySelector('#descending-ascending')
        const descendingBtn = document.createElement('button')
        div.appendChild(descendingBtn)
        descendingBtn.innerText = 'Sort by Descending'
        descendingBtn.addEventListener('click', sortByTqDescend)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => current.tq - next.tq)
                sortedArray.forEach(car => renderCar(car))
            })
    }
    function sortByTqDescend(event) {
        console.log('tq descending')
        clearCards()
        //Ascending tq
        const div = document.querySelector('#descending-ascending')
        const ascendingBtn = document.createElement('button')
        div.appendChild(ascendingBtn)
        ascendingBtn.innerText = 'Sort by Ascending'
        ascendingBtn.addEventListener('click', sortByTq)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.tq - current.tq)
                sortedArray.forEach(car => renderCar(car))
            })
    }

    function sortByPrice(event){
        clearCards()
        //Ascending price
        const div = document.querySelector('#descending-ascending')
        const descendingBtn = document.createElement('button')
        div.appendChild(descendingBtn)
        descendingBtn.innerText = 'Sort by Descending'
        descendingBtn.addEventListener('click', sortByPriceDescend)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {

                const sortedArray = dataArray.sort((current,next) =>  current.price - next.price)

                sortedArray.forEach(car => renderCar(car))
            })
        // console.log(event.target)
    }

    function sortByPriceDescend(){
        console.log('price descending')
        clearCards()
        //Ascending tq
        const div = document.querySelector('#descending-ascending')
        const ascendingBtn = document.createElement('button')
        div.appendChild(ascendingBtn)
        ascendingBtn.innerText = 'Sort by Ascending'
        ascendingBtn.addEventListener('click', sortByPrice)
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.price - current.price)
                sortedArray.forEach(car => renderCar(car))
            })
    }

function favorite(event){
    console.log('clicked')
    let carId = parseInt(event.target.parentElement.id)
    let userId = user.id

    fetch("http://localhost:3000/user_cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_car:{user_id: userId, car_id: carId}})
      })
      .then(res => res.json())
        .then(fav => {
            alert('Added to Favorites!')
        })
}

function myFavs(event){
    console.log('fetching favs')
    clearCards()
    fetch('http://localhost:3000/user_cars')
    .then(res => res.json())
    .then(favs => {
        favs.forEach(fav =>{
            if (fav.user_id == user.id){
                let myCar = fav.car
                renderCar(myCar)
                let card = document.getElementById(`${fav.car.id}`)
                let remove = document.createElement('button')
                remove.innerText="Remove from Favorites"
                remove.addEventListener('click', deleteFav)
                card.appendChild(remove)
            }
        })
    })

    // function deleteFav(event){
    //     console.log('deleting')
    //     debugger
    // //    let carId = parseInt(event.target.parentElement.id)
    // }  
}


// function releasePokemon(event) {
//     let pokemonId = event.target.dataset.pokemonId
  
//     fetch(`${POKEMONS_URL}/${pokemonId}`, {
//       method: "DELETE"
//     }).then(() => {
//      event.target.parentElement.remove()
//     })
//   }
let user = "";
let formDisplay = false
document.addEventListener("DOMContentLoaded", () =>{

    console.log('connected');
    let createCarBtn = document.querySelector('#createCarBtn');
    // createCarBtn.addEventListener('click',createCar);
   let carForm = document.querySelector('#form')
    createCarBtn.addEventListener('click', () => {
        // hide & seek with the form
        formDisplay = !formDisplay
        if (formDisplay) {
            createCar()
        } else {
            carForm.innerHTML = ''
        }
    })
    let nav = document.getElementById('nav');
    let home = document.querySelector('#homeBtn');
    home.addEventListener('click', getCars);
    home.innerText = 'Home';
//     let filter = document.createElement('div')
//     filter.innerHTML = `   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Sort-By
// </button>
// <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//     <a class="dropdown-item" id='sort-by-hp'>HP</a>
//     <a class="dropdown-item" id='sort-by-tq'>Torque</a>
//     <a class="dropdown-item" id='sort-by-price'>Price</a>
// </div>`
    let favBtn = document.querySelector('#faveBtn');
    favBtn.addEventListener('click', myFavs);

    const homeButton = document.querySelector('#home');

    const hp = document.querySelector('#sort-by-hp');
    const tq = document.querySelector('#sort-by-tq');
    const price = document.querySelector('#sort-by-price');
    hp.addEventListener('click', sortByHp);
    tq.addEventListener('click', sortByTq);
    price.addEventListener('click', sortByPrice);

    // getCars()
    welcome()
});



function welcome(){
    document.getElementById("navbar").style.visibility = "hidden";


    const welcome = document.getElementById('welcome');
    let welcomeText = document.createElement('h1');
    welcomeText.innerText = "Welcome to Turbosomething";
    let login = document.createElement("button");
    login.innerText = "Login";
    login.addEventListener('click', userLogin);
    let create = document.createElement("button");
    create.innerText = "Create Account";
    create.addEventListener('click', userCreateAccount);
    welcome.append(welcomeText, login, create)
}

function userLogin() {

    let welcome = document.getElementById('welcome');
    welcome.remove();
    let text = document.createElement('h1');
    text.innerText="Login";
   let form = document.getElementById('login');
    form.className = "form-inline";
   let user = document.createElement('input');
   user.placeholder="email";
   user.id = 'u-email';
    user.className = 'form-control mb-2 mr-sm-2';

    let password = document.createElement('input');
   password.setAttribute('type', 'password');
   password.placeholder="password";
   password.id = 'u-password';
    password.className = 'form-control mb-2 mr-sm-2';

    let submit = document.createElement('button');
   submit.id = "login-btn";
   submit.innerText="Login";
    submit.className = 'btn btn-primary';

    form.append(text, user, password, submit);
   form.addEventListener('submit', login)
}

function login(event){
    event.preventDefault();
    let form = document.getElementById('login');

    let email = document.getElementById('u-email').value;
    let password = document.getElementById('u-password').value;


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
             user = userObj;
            getCars();
            form.remove()
         } else{
             alert("Not a Valid Login. Enter Credentials or Create Account")
         }
        })
}

function userCreateAccount(){
    console.log('new account');
    let welcome = document.getElementById('welcome');
    welcome.remove();
    let text = document.createElement('h1');
    text.innerText="Create An Account";
   let div = document.getElementById('newacct');

    let form = document.createElement('form');
   let firstName = document.createElement('input');
   firstName.placeholder="First Name";
    firstName.id = 'firstName';
    firstName.className = 'form-control mb-2 mr-sm-2';
   let lastName = document.createElement('input');
   lastName.placeholder="Last Name";
    lastName.id = 'lastName';
    lastName.className = 'form-control mb-2 mr-sm-2';
   let email = document.createElement('input');
   email.placeholder="Email";
    email.id = 'email';
    email.className = 'form-control mb-2 mr-sm-2';
   let password = document.createElement('input');
   password.placeholder="Password";
    password.id = 'password';
    password.className = 'form-control mb-2 mr-sm-2';
   let submit = document.createElement('button');
    submit.id = 'submit';
    form.id = 'create-user-form';
   submit.innerText="Create Account";
    submit.className = 'btn btn-primary';
    div.appendChild(form);
   form.append(text, firstName, lastName, email, password, submit);
    form.addEventListener('submit', createUser)
}

function createUser(event){

    event.preventDefault();

    console.log('event');
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

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
        });
      document.querySelector("#create-user-form").innerHTML = ' '
}

function getCars(){
    clearCards();
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(car => {
        // debugger 
        car.forEach((car) =>{
            renderCar(car)})
    })
}

function createCar(){
    let createCarBtn = document.querySelector('#createCarBtn');
    let form = document.getElementById('form');

    form.innerHTML= `<form id="car-form">
  
    <h4>Add A Car:</h4><br>
   <div class="form-inline">
   
    <input type="text"  class="form-control mb-2 mr-sm-2" id="carpicture" name="picture" placeholder="Enter Image URL">
    <input type="text"  class="form-control mb-2 mr-sm-2" id="carmake" name="make" placeholder="Make">
 
   
    <input type="text"  class="form-control mb-2 mr-sm-2" id="carmodel" name="model" placeholder="Model">

    <input type="integer"  class="form-control mb-2 mr-sm-2" id="carprice" name="price" placeholder="Price">
    <input type="integer"  class="form-control mb-2 mr-sm-2" id="carhp" name="hp" placeholder="Horsepower">
    <input type="integer"  class="form-control mb-2 mr-sm-2" id="cartq" name="tq" placeholder="Torque">
    <input type="text"  class="form-control mb-2 mr-sm-2" id="cardes" name="des" placeholder="Description">
    <input type="text"  class="form-control mb-2 mr-sm-2" id="carlink" name="link" placeholder="Manufacturer Website">
    <input type="submit" class="btn btn-primary" name="submit" value="Add Car">
        </div>

</form>`;
let car = document.getElementById('car-form');
    // car.className = 'form-group'

    car.addEventListener('submit', submitCar)
}
// function createNavBar() {
// `<nav class="navbar navbar-expand-lg navbar-light bg-light">
//         <header class="masthead">
//         <div class="container d-flex h-100 align-items-center">
//         <div class="mx-auto text-center">
//         <h1 class="mx-auto my-0 text-uppercase">Grayscale</h1>
//         <h2 class="text-white-50 mx-auto mt-2 mb-5">A free, responsive, one page Bootstrap theme created by Start Bootstrap.</h2>
//     <a href="#about" class="btn btn-primary js-scroll-trigger">Get Started</a>
//     </div>
//     </div>
//     </header>
//     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNavDropdown">
//         <ul class="navbar-nav">
//         <li class="nav-item active">
//         <a class="nav-link" id="homeBtn" href="#">Home <span class="sr-only">(current)</span></a>
//     </li>
//     <li class="home">
//         <a class="nav-link" id="createCarBtn" href="#">Create Car</a>
//     </li>
//     <li class="nav-item">
//         <a class="nav-link" id="faveBtn" href="#">My Favorites</a>
//     </li>
//     <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle" href="#" id="sortByDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//         Sort By
//     </a>
//     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//         <a class="dropdown-item" id='sort-by-hp'>HP</a>
//         <a class="dropdown-item" id='sort-by-tq'>Torque</a>
//         <a class="dropdown-item" id='sort-by-price'>Price</a>
//         </div>
//         </li>
//         </ul>
//         </div>
//         </nav>`
// }
function renderCar(car){
    // createCar()

    document.getElementById("navbar").style.visibility = "visible";
    let createCarBtn = document.querySelector('#createCarBtn')
    let carForm = document.querySelector('.form-inline')

    let container = document.getElementById('car-container');
    let card = document.createElement('div');
    let img = document.createElement('img');
    img.src=car.picture;
    img.classList.add("card-img-top")

    img.addEventListener('click', favorite);
    card.classList.add('card', 'col-7');
    card.id = car.id;

    let make = document.createElement('h2');
    make.classList.add("card-title")
    make.innerText=car.make;
    let model = document.createElement('h4');
    model.innerText=car.model;
    model.classList.add("card-title")
    let price = document.createElement('h4');
    price.innerText=`$${car.price}`;
    price.classList.add("card-text")
    let hp = document.createElement('h4');
    hp.innerText= `Horsepower: ${car.hp}`;
    hp.classList.add("card-text")
    let tq = document.createElement('h4');
    tq.innerText= `Torque: ${car.tq}`;
    tq.classList.add("card-text")
    let des = document.createElement('p');
    des.innerText=car.des;
    des.classList.add("card-text")
    let link = document.createElement('a');
    link.href=car.link;
    link.innerText= "Manufacturer";
    card.append(img, make, model, price, hp, tq, des, link);

    container.appendChild(card)
}
function submitCar(event){

    console.log('submitting');
    event.preventDefault();
    const picture = document.getElementById("carpicture").value;
    const make = document.getElementById("carmake").value;
    const model = document.getElementById("carmodel").value;
    const price = document.getElementById("carprice").value;
    const hp = document.getElementById("carhp").value;
    const tq = document.getElementById("cartq").value;
    const des = document.getElementById("cardes").value;
    const link = document.getElementById("carlink").value;
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
          });
          document.getElementById("car-form").reset()
  }
    function clearCards(){
        const cardList = document.querySelectorAll('.card');
        cardList.forEach(card => card.remove());
        document.querySelector('#descending-ascending').innerHTML = ""
    }
    function sortByHp(event) {
        clearCards();
        //Ascending HP
        const div = document.querySelector('#descending-ascending');
        const descendingBtn = document.createElement('button');
        div.appendChild(descendingBtn);
        descendingBtn.className ='btn btn-dark';

        descendingBtn.innerText = 'Sort by Descending';
        descendingBtn.addEventListener('click', sortByHpDescend);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => current.hp - next.hp);
                sortedArray.forEach(car => renderCar(car))
            })

    }
    function sortByHpDescend(event) {
        console.log('hp descending order');
        clearCards();
        //Ascending tq
        const div = document.querySelector('#descending-ascending');
        const ascendingBtn = document.createElement('button');
        div.appendChild(ascendingBtn);
        ascendingBtn.className ='btn btn-dark';

        ascendingBtn.innerText = 'Sort by Ascending';
        ascendingBtn.addEventListener('click', sortByHp);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.hp - current.hp);
                sortedArray.forEach(car => renderCar(car))
            })
    }

    function sortByTq(event) {
        clearCards();
        //Ascending tq
        const div = document.querySelector('#descending-ascending');
        const descendingBtn = document.createElement('button');
        div.appendChild(descendingBtn);
        descendingBtn.className ='btn btn-dark';
        descendingBtn.innerText = 'Sort by Descending';
        descendingBtn.addEventListener('click', sortByTqDescend);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => current.tq - next.tq);
                sortedArray.forEach(car => renderCar(car))
            })
    }
    function sortByTqDescend(event) {
        console.log('tq descending');
        clearCards();
        //Ascending tq
        const div = document.querySelector('#descending-ascending');
        const ascendingBtn = document.createElement('button');
        div.appendChild(ascendingBtn);
        ascendingBtn.className ='btn btn-dark';

        ascendingBtn.innerText = 'Sort by Ascending';
        ascendingBtn.addEventListener('click', sortByTq);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.tq - current.tq);
                sortedArray.forEach(car => renderCar(car))
            })
    }

    function sortByPrice(event){
        clearCards();
        //Ascending price
        const div = document.querySelector('#descending-ascending');
        const descendingBtn = document.createElement('button');
        div.appendChild(descendingBtn);
        descendingBtn.innerText = 'Sort by Descending';
        descendingBtn.className ='btn btn-dark';

        descendingBtn.addEventListener('click', sortByPriceDescend);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {

                const sortedArray = dataArray.sort((current,next) =>  current.price - next.price);

                sortedArray.forEach(car => renderCar(car))
            })
        // console.log(event.target)
    }

    function sortByPriceDescend(){
        console.log('price descending');
        clearCards();
        //Ascending tq
        const div = document.querySelector('#descending-ascending');
        const ascendingBtn = document.createElement('button');
        ascendingBtn.className ='btn btn-dark';
        div.appendChild(ascendingBtn);
        ascendingBtn.innerText = 'Sort by Ascending';
        ascendingBtn.addEventListener('click', sortByPrice);
        fetch('http://localhost:3000/cars')
            .then(result => result.json())
            .then(dataArray => {
                const sortedArray = dataArray.sort((current,next) => next.price - current.price);
                sortedArray.forEach(car => renderCar(car))
            })
    }

function favorite(event){
    console.log('clicked');
    let carId = parseInt(event.target.parentElement.id);
    let userId = user.id;

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
    console.log('fetching favs');
    clearCards();
    fetch('http://localhost:3000/user_cars')
    .then(res => res.json())
    .then(favs => {
        favs.forEach(fav =>{
            if (fav.user_id == user.id){
                let myCar = fav.car;
                renderCar(myCar);
                let card = document.getElementById(`${fav.car.id}`);
                card.dataset.favId = fav.id;
                let remove = document.createElement('button');
                remove.innerText="Remove from Favorites";
                remove.addEventListener('click', deleteFav);
                card.appendChild(remove)
            }
        })
    });

    function deleteFav(event){
        let target = event.target;
       let favoriteId = parseInt(event.target.parentElement.dataset.favId);

       fetch(`http://localhost:3000/user_cars/${favoriteId}`,{
           method: "DELETE"
       })
       .then(() => {
         target.parentElement.remove()
       })
    }  
}


// function releasePokemon(event) {
//     let pokemonId = event.target.dataset.pokemonId
  
//     fetch(`${POKEMONS_URL}/${pokemonId}`, {
//       method: "DELETE"
//     }).then(() => {
//      event.target.parentElement.remove()
//     })
//   }
let user = "";
let formDisplay = false
let power = new Audio("POWER.mp3");

document.addEventListener("DOMContentLoaded", () =>{

    console.log('connected');
    let createCarBtn = document.querySelector('#createCarBtn');
    let carForm = document.querySelector('#form')
    createCarBtn.addEventListener('click', () => {
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
    let favBtn = document.querySelector('#faveBtn');
    favBtn.addEventListener('click', myFavs);

    const homeButton = document.querySelector('#home');

    const hp = document.querySelector('#sort-by-hp');
    const tq = document.querySelector('#sort-by-tq');
    const price = document.querySelector('#sort-by-price');
    hp.addEventListener('click', sortByHp);
    tq.addEventListener('click', sortByTq);
    price.addEventListener('click', sortByPrice);

    welcome()
});

function welcome(){

    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('centerBtn')
    document.getElementById("navbar").style.visibility = "hidden";
    let page = document.querySelector('.page')
    page.classList.add('masthead')
    const welcome = document.getElementById('welcome');
    let welcomeText = document.createElement('h1');
    welcomeText.innerHTML = `<p>Welcome to <b><i>POWAH!!</i></b></p>`
    welcomeText.classList.add('jumbotron','.text-center')
    let login = document.createElement("button");
    login.innerText = "Login";
    login.classList.add('btn')
    login.addEventListener('click', userLogin);
    let create = document.createElement("button");
    create.innerText = "Create Account";
    create.classList.add('btn')
    create.addEventListener('click', userCreateAccount);
    buttonContainer.append(login,create)
    welcome.append(welcomeText, buttonContainer)
}

function userLogin() {
    let welcome = document.getElementById('welcome');
    welcome.remove();
    let formContainer = document.createElement('div')
    formContainer.classList.add('centerBtn')
    document.body.append(formContainer)
    let text = document.createElement('h1');
    text.innerText="Login";
    text.classList.add('card-title')
    text.id = 'loginTxt'
    let form = document.getElementById('login');
    form.className = "form-check form-check-inline";
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
    submit.id = "loginSubmit";
    submit.innerText="Login";
    submit.className = 'btn-dark btn-sm';
    formContainer.append(text, form)
    form.append(user, password, submit);
    form.addEventListener('submit', login)
}

function login(event){
    event.preventDefault();
    document.body.classList.remove('masthead')

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
             power.play()
         } else{
             alert("Not a Valid Login. Enter Credentials or Create Account")
             welcome()
         }
        })
}

function userCreateAccount(){
    console.log('new account');
    let welcome = document.getElementById('welcome');
    welcome.remove();
    let textDiv = document.getElementById('textDiv')
    let text = document.createElement('h1');
    text.innerText="Create An Account";
    let div = document.getElementById('newacct');
    let br2 = document.createElement('br')

    textDiv.append(text, br2, div)
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
    submit.className = 'btn-dark btn-sm';
    let br = document.createElement('br')
    div.appendChild(form);
    form.append( firstName, lastName, email, password, br, submit);
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
                welcome()
            } else{
                document.querySelector("#create-user-form").innerHTML = ' '
                getCars()
            }
        });
}

function getCars(){

    clearCards();
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(car => { 
        car.forEach((car) =>{
            renderCar(car)})
    })
    let logoImg = document.getElementById('logoImg')
    logoImg.src = 'src/black_trasparent_text.png'
    logoImg.id = 'mainPageLogo'
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
    <input type="submit" class="btn-dark btn-sm" name="submit" value="Add Car">
        </div>

    </form>`;
    let car = document.getElementById('car-form');
    car.addEventListener('submit', submitCar)
}

function renderCar(car){

    document.getElementById('logo').innerHTML = ''
    document.getElementById("navbar").style.visibility = "visible";
    document.getElementById("loginTxt").style.visibility = "hidden";

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
    model.innerHTML=`${car.model}<br>`;
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
    link.classList.add('link')
    link.innerHTML= `<br><h5><b>Manufacturer Site</b></h5>`;
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
    }

    function sortByPriceDescend(){
        console.log('price descending');
        clearCards();
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
                remove.classList.add('btn')
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


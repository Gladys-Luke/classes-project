let render = document.querySelector(".User")
let renderPage = document.querySelector(".Display")
async function getUser(){
    let response = await fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    let users = response.results
     users.forEach(item => {
      render.innerHTML = `
        <div>
        <img src=${item.picture?.large}  />
        <h3> ${item.name?.title} ${item.name?.first} ${item.name?.last}</h3>
        <p> ${item.phone}</p>
        <p>${item.email}</P>
        </div>
        `
        console.log(item)
     });
}
getUser()

class User {
    constructor(title,name, email, phone, gender) {
      this.title = title;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.gender = gender;
    }
  }

  function submitForm(e){
    e.preventDefault();
  let title = document.getElementById('title').value
  let name = document.getElementById('name').value
  let email = document.getElementById('email').value
  let phone = document.getElementById('phone').value
  let gender = document.getElementById('gender').value
 let userData = new User("Miss", "Gladys", "gladys@gmail.com", 08123455677, "female")
   let newUser = new User(title, name, email, phone, gender);
   const user = window.localStorage.getItem('users')
   if(!user){
    window.localStorage.setItem('users', JSON.stringify([userData]))
   }else{
    const getCurrentUser = window.localStorage.getItem('users')
    let currentUser = JSON.parse(getCurrentUser)
    currentUser.push(newUser)
    window.localStorage.setItem('users', JSON.stringify(currentUser))
   }

  }

  function displayUser(){  
   const allUsers = window.localStorage.getItem('users')
   const users = JSON.parse(allUsers)

   console.log(users)

    // users.map(user => )
   return users.map(item => {
      // console.log(item)
      return  `
    <tr>
      <td>${item.title} ${item.name}</td>
      <td>${item.gender}</td>
      <td>${item.phone}</td>
      <td>${item.email}</td>
      <td class="actions">
        <a class="edit" href="http://">Edit</a>
        <a class="delete" href="http://">Delete</a>
      </td>


    </tr>
        `
    
    });
  }
  renderPage.innerHTML = displayUser()
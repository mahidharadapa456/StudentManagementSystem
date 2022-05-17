const url = "http://localhost:3003"
// * GET elements by queryselectorall
const getQrAll = (parent, target) => {
  if(parent) return parent.querySelectorAll(target);
  return []

};
// * GET element by queryselector
const getQr = (parent, target) => {
  if(parent) return parent.querySelector(target);
};

const setUserToStore = (user) => {
  if(user) JSON.stringify(localStorage.setItem("user", user))
}

const getUserFromStore = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const removeFromStore = () => {
  localStorage.removeItem("user")
}




const navList = getQr(document, "#nav-list");
const navLink = getQrAll(navList, ".nav-link");
const sidebarLabel = getQr(document, "#sidebar-label");



navLink.forEach((link) => {
  if (link.href == window.location.href) {
    link.classList.add("active");
    const icon = getQr(link, "i");
    sidebarLabel.textContent = null;
    sidebarLabel.append(icon);
    sidebarLabel.append(link.innerText);
  }
});
const error = getQr(document, "#error_container")
const signup_form = getQr(document, "#signup_form")
console.log(signup_form)
if(signup_form) {
  signup_form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = {
      userName: signup_form["username"].value,
      email: signup_form["email"].value,
      password: signup_form["password"].value
    }

    await fetch("/signUp", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      if(!data.ok) {
        error.textContent = data.message
        return setTimeout(() => error.textContent = "", 2000)
      }
      // window.location.href = "/signIn"
    }).catch((err) => console.log(err))
  })
}

const login_form = getQr(document, "#login_form")
if(login_form){
  console.log(login_form)
  login_form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = {
      email: login_form["email"].value,
      password: login_form["password"].value
    }


    await fetch("/signIn", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      if(!data.ok) {
         error.textContent  = data.message
         return setTimeout(() => error.textContent = "", 2000)
      }
        setUserToStore(data.user)
        window.location.href = "/"
    }).catch((err) => console.log(err))


  })
}
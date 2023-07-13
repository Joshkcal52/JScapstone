const email = "josh@devpipeline.com";
const pass = "One2threesf@1";

const userData = {
  email: email,
  password: pass,
};

async function auth() {
  try {
    const res = await fetch("https://api.devpipeline.org/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resObject = await res.json();
    const authToken = resObject.auth_info.auth_token;
    return authToken;
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function getAll() {
  let users = [];
  let firstName = [];

  try {
    const getAuth = await auth();
    const res = await fetch("https://api.devpipeline.org/users", {
      headers: { auth_token: getAuth },
    });
    const response = await res.json();
    users = response.users;
  } catch (error) {
    console.error("Error: ", error);
  }

  const getNames = () => {
    users.map((user) => {
      firstName.push(user.first_name);
    });
  };
  getNames();
  console.log(firstName);

  function renderUsers() {
    const renderLocation = document.getElementById("students-container");
    firstName.map((person) => {
      const studentContainer = document.createElement("div");
      studentContainer.classList.add("outerDiv");
      const name = document.createTextNode(`${person}`);

      // let btnMinus = document.createElement("button");

      studentContainer.appendChild(name);
      renderLocation.appendChild(studentContainer);

      const btnContainer = document.createElement("div");
      btnContainer.id = "btnContainer";
      let btnPlus = document.createElement("button");
      btnPlus.innerHTML = "+";
      btnPlus.classList.add("btnPlus");
      btnPlus.id = "plusBtn";
      btnPlus.onclick = function () {
        alert("Button Clicked!");
      };
      btnContainer.appendChild(btnPlus);
      renderLocation.appendChild(btnContainer);

      let btnMinus = document.createElement("button");
      btnMinus.innerHTML = "-";
      btnMinus.classList.add("btnMinus");
      btnMinus.id = "plusBtn";
      btnMinus.onclick = function () {
        alert("Button Clicked!");
      };
      btnContainer.appendChild(btnMinus);
      renderLocation.appendChild(btnContainer);
      studentContainer.appendChild(btnContainer);
    });
  }
  renderUsers();
}

getAll();

// const scrollableDiv = document.getElementById("scrollableDiv");
// scrollableDiv.style.overflow = "scroll";
// scrollableDiv.style.height = "100vh";

// object.addEventListener("click", myScript);

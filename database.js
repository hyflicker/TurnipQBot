// DATABASE

async function sendData(url = '', data = {}, method = "POST") {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  async function addPerson(TwitchUser) {
    return await sendData("https://jsonbox.io/box_19bd3f6c39d970c91a82", TwitchUser)
  }
  
  async function removePerson(id) {
    return await sendData(`https://jsonbox.io/box_19bd3f6c39d970c91a82/${id}`, {}, "DELETE")
  }
  
  async function getPeople() {
    let res = await fetch("https://jsonbox.io/box_19bd3f6c39d970c91a82cc?sort=_createdOn");
    let jsonRes = await res.json();
    return jsonRes;
  }
  
  
  
  // app code
  let formElem = document.querySelector("form");
  let personsNameInput = document.querySelector(".persons-name");
  let queueElem = document.querySelector(".queue");
  
  document.addEventListener("click", async function (event) {
    if (event.target.closest(".delete-person")) {
      event.preventDefault();
      let personElem = event.target.closest("[data-id]");
      let id = personElem.getAttribute("data-id");
      await removePerson(id);
      render();
    }
  });
  
  formElem.addEventListener("submit", async function (event) {
    event.preventDefault();
    let personsName = personsNameInput.value;
    
    await addPerson({name: personsName});
  
    personsNameInput.value = "";
    render();
  });
  
  async function render () {
    let peopleArray = await getPeople();
    let peopleHtml = peopleArray.map(person => {
      return `<div data-id="${person._id}"><a class="delete-person"href="#">X</a> ${person.name}</div>`;
    }).join("");
    
    queueElem.innerHTML = peopleHtml;
  }
  
  render();
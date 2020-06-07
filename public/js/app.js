//constants variables
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const countryCode = "us";
const API_KEY = "8f7cbed79da90b05f11154cea523af7a";

// function to get data from OpenWeatherMap API.
const getOpenWeatherMap = async (zipCode) => {
  const URL = `${baseURL}zip=${zipCode},${countryCode}&appid=${API_KEY}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("getOpenWeatherMap Error: ", error);
  }
};

// function to get the value of one element by id.
const getElementValueById = (id) => {
  return document.getElementById(id).value;
};

// function to clean all form inputs.
const cleanForm = () => {
  document.getElementById("zip").value = "";
  document.getElementById("feelings").value = "";
};

// function to clean all form inputs.
const cleanTable = () => {
  const dateDiv = document.getElementById("date");
  dateDiv.innerHTML = "";
  const tempDiv = document.getElementById("temp");
  tempDiv.innerHTML = "";
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  dateDiv.innerHTML = '<h3 class="title">Date</h3>';
  tempDiv.innerHTML = '<h3 class="title">Temp</h3>';
  contentDiv.innerHTML = '<h3 class="title">Content</h3>';
};

// function to update the UI.
const updateUI = () => {
  fetch("api/weatherUser")
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        cleanTable();
        const dateDiv = document.getElementById("date");
        const tempDiv = document.getElementById("temp");
        const contentDiv = document.getElementById("content");

        for (const item of res.respond) {
          const newDateP = document.createElement("p");
          newDateP.classList.add("text-medium");
          newDateP.textContent = item.date;
          dateDiv.appendChild(newDateP);

          const newTempP = document.createElement("p");
          newTempP.classList.add("text-medium");
          newTempP.textContent = item.temperature;
          tempDiv.appendChild(newTempP);

          const newContentP = document.createElement("p");
          newContentP.classList.add("text-medium");
          newContentP.textContent = item.userResponse;
          contentDiv.appendChild(newContentP);
        }
      }
    })
    .catch((err) => console.log("updateUI Error:", err));
};

updateUI();

//Add click event for generate Button.
const generateBtn = document.getElementById("generate");

const generateMethod = (evt) => {
  const zipInput = getElementValueById("zip");
  const feelingsInput = getElementValueById("feelings");
  if (zipInput === "" || feelingsInput === "") {
    alert("all fields should be completed");
    evt.preventDefault();
    return;
  }
  getOpenWeatherMap(zipInput).then((res) => {
    if (res.main) {
      const dataObject = {
        temperature: res.main.temp,
        date: new Date().toLocaleDateString(),
        userResponse: `zip code: ${zipInput} - feelings: ${feelingsInput}`,
      };
      fetch("api/weatherUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            cleanForm();
            updateUI();
          }
        })
        .catch((err) => console.log("generateMethod Error:", err));
    }
  });
  evt.preventDefault();
};

generateBtn.addEventListener("click", generateMethod);

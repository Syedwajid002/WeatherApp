const API = 'cba1c20147b7e7adf0d919389159924b'
const weatheraform = document.querySelector(".InputForm")
const cityInput = document.querySelector(".city")
const card = document.querySelector(".card")

weatheraform.addEventListener("submit",async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        const weatherData= await getWeatherData(city)
        display(weatherData);
    } 
    else {
        errors("please enter a valid city")
    }
})
async function getWeatherData(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new error("Could not fetch weather data")
        card.style.display="none";
    }
    else{
        return await response.json();
    }
}
function display(data) {
    const {name:city,
            main:{temp,humidity},
            weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const citydispaly=document.createElement("h1")
    const tempDisplay=document.createElement("p")
    const HumidityDisplay=document.createElement("p")
    const desc=document.createElement("p")
    
    citydispaly.textContent=city +"'s Weather";
    card.appendChild(citydispaly);

    tempDisplay.textContent="Temparature : "+`${(temp-273.15).toFixed(1)}`+" Degrees";
    card.appendChild(tempDisplay);

    HumidityDisplay.textContent="Humidity : "+humidity;
    card.appendChild(HumidityDisplay);

    desc.textContent=description;
    card.appendChild(desc);

    // tempDisplay.textContent=


}
function errors(message) {
    const display = document.createElement("p");
    display.textContent = message;
    display.classList.add("errorDisplay")
    card.textContent = ""
    card.style.display = 'flex';
    card.appendChild(display);
}
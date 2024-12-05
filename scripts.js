const apikey="77da0b61f45a07dcceb1a5a878b847dd";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchbox= document.querySelector(".search input");
const searchbtn= document.querySelector(".search button");
const weathericon=document.querySelector(".weather-icon");


async function checkweather(city) {
    const response= await fetch(url+ city+ `&appid=${apikey}`);
    
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }

    else{
    var data=await response.json();
    console.log(data) ;
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=data.main.temp + "C" ;
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + "km/hr";
    
   if(data.weather[0].main=="Clouds"){
    weathericon.src="weather-app-img/images/clouds.png";
   }
   else if(data.weather[0].main=="Clear"){
    weathericon.src="weather-app-img/images/clear.png";
   }
   else if(data.weather[0].main=="Rain"){
   weathericon.src="weather-app-img/images/rain.png";
  }
   else if(data.weather[0].main=="Drizzle"){
    weathericon.src="weather-app-img/images/drizzle.png";
   }
   else if(data.weather[0].main=="Mist" ||  data.weather[0].main=="Haze"){

    weathericon.src="weather-app-img/images/mist.png";
   }
   document.querySelector(".error").style.display="none";
   document.querySelector(".weather").style.display="block";
}
}


searchbtn.addEventListener("click",function(){
    checkweather(searchbox.value);
})


function countryToCode (country){
    var xHR = new XMLHttpRequest();
    xHR.open("GET","https://restcountries.eu/rest/v1/name/" + country +"?fullText=true",false)
    xHR.send();
    var parsedXhr = JSON.parse(xHR.response)
    return parsedXhr[0].alpha2Code;

}
function callWeather(location){

var http = new XMLHttpRequest();
http.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+location+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys" ,false);
http.send();

console.log(http.status);
console.log(http.statusText);
var httpme = JSON.parse(http.responseText)
var locationObj = httpme.query.results.channel.location
window.celcius =  Math.round((JSON.parse(httpme.query.results.channel.item.condition.temp) -  32) *  5/9)
window.f = JSON.parse(httpme.query.results.channel.item.condition.temp);
document.querySelector("#con1").innerHTML= "<h1 id='loc'>" + locationObj.city + " " + locationObj.region + ", " + countryToCode(locationObj.country) + " </h1>" + "<p id='date'> " + window.theDateToday + "</p> <br> " +  "<p id='descp'> " +  httpme.query.results.channel.item.condition.text + " <br> </p>" + "<div id='temp' style=''> " + changeTemp() + "  \n </div> <br/> <button class= 'mdl-button mdl-js-button mdl-js-ripple-effecdt' onclick='convertTo()'> Change Units </button>"
var descp = document.getElementById("descp").innerHTML
var temp = document.getElementById("temp").innerHTML
console.log(descp)
if (httpme.query.results.channel.item.condition.text == "Cloudy"){
    window.img == "<img src='https://ssl.gstatic.com/onebox/weather/64/cloudy.png'/>"
}
else if (descp.indexOf("Rain") >= 0 || descp.indexOf("Shower") >=0 ){
    window.img = "<img src='https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png'/>"
}
else if (descp.indexOf("Cloudy") >= 0){
    window.img = "<img src='https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png'/>"
}
else if (descp.indexOf("Fair") >= 0 || descp.indexOf("Sunny")>=0 || descp.indexOf("Clear")>=0){
    window.img = "<img src='https://ssl.gstatic.com/onebox/weather/64/sunny.png'/>"
}
else if (descp.indexOf("Haze") >=0 || descp.indexOf("Fog") >=0 || descp.indexOf("Smoke")>=0){
    window.img = "<img src = 'https://ssl.gstatic.com/onebox/weather/64/fog.png'/>"
}
else {

}
document.getElementById("temp").innerHTML = window.img  + "<span>" +temp + '</span>' ;

}
    function changeTemp(){
     if (getCookie("unit") == ""){
        createCookie("unit","F",365)
    }

    window.unit = getCookie("unit")

    if (window.unit == "F"){
        return window.f + " &#176F";
    }
    else {

        return window.celcius + " &#176C";
    }
}
function convertTo(){

    if (window.unit == "F"){
    window.unit = "C"
    document.getElementById("temp").innerHTML = window.img +" " + "<span style='margin-top:-4px'>" + window.celcius + " &#176C";
    }
    else if (window.unit=="C") {
    window.unit = "F"
    document.getElementById("temp").innerHTML = window.img + " "+ "<span style='margin-top:-4px'>" +  window.f + " &#176F </span>"
    }
         createCookie("unit",unit,365)

}
    function promptLocation (){
        alertify
  .defaultValue(xhrme.city+", "+xhrme.region_code + ", " +  xhrme.country)
  .prompt("Enter Location of Weather",
    function (val, ev) {

      // The click event is in the event variable, so you can use it here.
      ev.preventDefault();

      // The value entered is availble in the val variable.
      alertify.success("Your location is set to " + val);
        callWeather(val);
    }, function(ev) {

      // The click event is in the event variable, so you can use it here.
      ev.preventDefault();

      alertify.error("You've clicked Cancel");

    }
  );
    }
  function getTheDateToday() {
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var d = new Date();
    window.theDateToday = weekday[d.getDay()] + ", "+ month[d.getMonth()] + " " + d.getDate() + ", "+ d.getFullYear();
}
getTheDateToday()
function alerfI(){
    alertify.alert("This function is not available yet, but is coming soon!");
}
function test()
{
    window.searchEngine=document.getElementById("website").value;
    createCookie("searchEngine",window.searchEngine,365)
    window.searchEngine = getCookie('searchEngine')
    if (window.searchEngine == "")
        {
            window.searchEngine ="google.com"
        }
    console.log(window.searchEngine);
    document.getElementById("currentEngine").innerHTML = "Your current search engine url is: "+ window.searchEngine;

}
function urlReplaceText(){
    hello = replaceText("\\%","%25");
    hello = replaceText("\\#","%23");
    hello = replaceText("\\&","%26");
    hello = replaceText("\\+","%2B");
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
var createCookie = function(cName,cValue,amountDays)
{
    amountDays *= 60*60*24;
    document.cookie = cName + "=" + cValue +"; " + "max-age=" + amountDays;
}

function returnFals(){
    return false;
}
function replaceText(a,b){
    var re = new RegExp (a,"gi");

        window.hello=window.hello.replace(re,b);
        console.log(window.hello);
        return window.hello;

}
function ValidUrl (url){
    var yes = url.match(/^(https?:\/\/)?\w*[^\s]+\.?\w+[^\s]+\.[A-z]+\/?[a-z\.\\?\=0-9\;\\\/\-\_\&\%\#]+$/ig);
    //                    (https://)?(subdomain.)?(domain.)(domainextension)/
    if (!yes){
        return false;
    }
    else {
        return true;
    }
}


if (getCookie('searchEngine') == "")
{
    createCookie("searchEngine","google.com",365)
    window.searchEngine = getCookie('searchEngine')
}
else
{
    window.searchEngine = getCookie('searchEngine')
}

var searchFunc = function()
{
var hello = document.getElementById("goTo").value;
window.searchEngine = window.searchEngine.toLowerCase();
if (window.searchEngine === "random")
{
    var hellowo = Math.random() *10;
    console.log(hellowo);
    if (hellowo<=3){
        window.searchEngine = "search.yahoo.com";
    }
    else if (hellowo>3){
        window.searchEngine = "duckduckgo.com"
    }
    else {
        window.searchEngine = "google.com";
    }
}
if(window.searchEngine.indexOf('.') >= 0 ){
if(window.searchEngine === 'search.yahoo.com' || window.searchEngine  === "search.aol.com" || window.searchEngine == "google.com"){

if (hello != "" && hello !==null && ValidUrl(hello) !=true)
{
    window.hello = document.getElementById("goTo").value;

    urlReplaceText();
	window.open("http://"+window.searchEngine+"/search?q=" +hello) ;
}
else if (hello.substring(0,8) == "https://" ||  hello.substring(0,7) == "http://")
{
    window.open(hello);
}
else if (ValidUrl(hello) ===true)
{
    window.open("http://" + hello);
}
  else {}
}
else if(window.searchEngine.indexOf('youtube') >=0){
    if (hello != "" && hello !==null && ValidUrl(hello) !=true)
{
     window.hello = document.getElementById("goTo").value;
     urlReplaceText();
	window.open("https://www.youtube.com/results?search_query=" +hello) ;
}
else if (hello.substring(0,8) == "https://" ||  hello.substring(0,7) == "http://")
{
    window.open(hello)
}
else if (ValidUrl(hello) ===true)
{
    window.open("http://" + hello);
}
  else {}
}
else{


if  (hello != "" && hello !==null && ValidUrl(hello) !=true)
{
    window.hello = document.getElementById("goTo").value;
    urlReplaceText();
	window.open("http://"+window.searchEngine+"?q=" +hello) ;
}
else if (hello.substring(0,8) == "https://" ||  hello.substring(0,7) == "http://")
{
    window.open(hello)
}
else if (ValidUrl(hello) ===true)
{
    window.open("http://" + hello);
}
  else {}

}
}
else {
    alert("Error: Invalid Format of Search Engine URL. Please use the format: example.com or if that doesn't work, use the format: search.example.com.")

}
}

window.onload = function()
{
    $(document).ready(function(){
    $(".clickMeToChangeURL").click(function(){
        $("#changeUrl").slideToggle("fast")
    })
  $("input").focus(function(){
      $(this).css("outline-color","#B105FA")
  })
})

document.getElementById("currentEngine").innerHTML = "Your current search engine url is: "+ window.searchEngine;
window.unit = "F"
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://freegeoip.net/json/", false)
xhr.send()
console.log(xhr.status);
console.log(xhr.statusText);
xhrme = JSON.parse(xhr.responseText)

callWeather(xhrme.city+"%2C%20"+xhrme.region_code)
}


// str.slice(-1);

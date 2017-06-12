function xhr(URL){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",URL,false);
    xhr.send();
    console.log(xhr.responseText);
    return xhr.responseText;
}
function get (URL){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","https://crossorigin.me/"+ URL,false);
    xhr.send();
    return xhr.responseText;
  }
  function curl(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://allow-any-origin.appspot.com/' + url, false);
    xhr.send();
    return xhr.responseText;
}
function gret(UrL){
  xhr(UrL);
  get(UrL);
  curl(UrL);
}
  gret("http://api.urbandictionary.com/v0/vote?defid=8005323&amp;direction=up");

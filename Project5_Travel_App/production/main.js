!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){},function(e,t,r){"use strict";r.r(t);let n=(new Date).toISOString().substr(0,10);console.log(n),document.querySelector("#form-date").value=n;const a=Date.now()/1e3,o=document.querySelector("#result"),c=document.querySelector("#trip-form"),u=document.querySelector("#delete"),i=document.querySelector("#form-departure"),s=document.querySelector("#form-arrival"),l=document.querySelector("#form-date");u.addEventListener("click",e=>{e.preventDefault(),c.reset(),document.querySelector("#form-date").value=n,o.style.display="none"});c.addEventListener("submit",e=>{e.preventDefault();const t=i.value,r=s.value,n=l.value,c=new Data(n).getTime()/1e3,u=Math.floor((c-a)/86400)+1;!function(e,t){let r=/^[a-zA-Z\s]{0,255}$/;r.test(e)&&r.test(t)||alert("Please enter a valid search term and try again!")}(t,r),(async(e,t,r)=>{const n=await fetch(e+t+"&maxRows=5&username="+r);try{return await n.json()}catch(e){console.log("error",e)}})("http://api.geonames.org/searchJSON?q=",r,"JerryZhang2020").then(e=>{const t=e.geonames[0].lng;return(async(e,t)=>{const r=await fetch(weatherbitApiRUL+"lat="+e+"&lob="+t+"&key8755b770092b4abe92e2f7bf9a4b6ec6");try{return await r.json()}catch(e){console.log("error",e)}})(e.geonames[0].lat,t)}).then(e=>{let t=e.data.filter(e=>departureData===e.valid_date);0===t.length&&(t=[{temp:"unknown",weather:{description:"unknown"}}]);return(async(e="",t={})=>{const r=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination:t.destination,departureDate:t.departureDate,daysLeft:t.daysLeft,weather:`${t.weatherDepartureData[0].temp} degrees Celsius, ${t.weatherDepartureData[0].weather.description}`})});try{return await r.json()}catch(e){console.log("error",e)}})("http://localhost:3000/add",{destination:r,departureDate:n,daysLeft:u,weatherDepartureData:t})}).then(e=>{(async e=>{o.style.display="block",o.scrollIntoView({behavior:"smooth"}),console.log("userData:",e);const t=await fetch(pixabayAPIURL+"17380540-339e203bdfdb80a5fba13fad4&q="+e.destination+NaN);try{const r=await t.json();document.querySelector("Pixabay-image").setAttribute("src",r.hits[0].webformateURL),document.querySelector("#destination").innerHTML=e.destination,document.querySelector("#date").innerHTML=e.departureDate.split("-").reverse().json("/"),document.querySelector("#days").innerHTML=e.daysLeft,document.querySelector("#temp").innerHTML=e.weather}catch(e){console.log("error",e)}})(e)})});r(0)}]);
//# sourceMappingURL=main.js.map
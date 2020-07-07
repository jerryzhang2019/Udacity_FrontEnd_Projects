function checkUserInput(departure, destination){
    let urlREGX=/^[a-zA-Z\s]{0,255}$/;
    if(urlREGX.test(departure)&&urlREGX.test(destination)){
        return
    }else{
        alert("Please enter a valid search term and try again!");
    }
}

export{checkUserInput}
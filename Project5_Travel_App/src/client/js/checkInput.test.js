function checkUserInput(departure, destionation){
    let urlREGEX = /^[a-zA-Z\s]{0,255}$/;
    if(urlREGEX.test(departure)&&urlREGEX.test(destionation)){
        return
    }else{
        alert("Please enter a valid search term and try again");
    }
}

export {checkUserInput}
function checkUserInput(departure, destination) {
  let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
  if (urlRGEX.test(departure) && urlRGEX.test(destination)) {
    return
  } else {
    alert("Please enter a valid search term and try again!");
  }
}

export {checkUserInput}
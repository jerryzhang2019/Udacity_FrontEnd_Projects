var validUrl = require('valid-url')
function handleSubmit(event) {
    event.preventDefault()

    console.log("::: Form Submitted :::")
    //get the URL From input faild 
    let inputUrl = document.getElementById('name').value
    console.log("Input URL=:", inputUrl)

    //check the  url validation
    if (validUrl.isUri(inputUrl)){
      postData('http://localhost:8080/article', inputUrl)
    } else {
      document.getElementById('error').innerHTML = "Sorry, this is not a valid URL."
    }
}

const postData = async (path, input_url) => {
    await fetch(path, {
      method: "POST",
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({text: input_url})
        })
        .then(res => {
          console.log("The search result is: ",res)
          return res.json()
        })

        //Update the UI 
        .then(function(res) {
          console.log(res);
          document.getElementById('polarity').innerHTML = JSON.stringify(res.polarity);
          document.getElementById('subjectivity').innerHTML = JSON.stringify(res.subjectivity);
          document.getElementById('polarity_confidence').innerHTML = JSON.stringify(res.polarity_confidence);
          document.getElementById('subjectivity_confidence').innerHTML = JSON.stringify(res.subjectivity_confidence);
          document.getElementById('quote').innerHTML = JSON.stringify(res.text);
  }
)}

export { handleSubmit }
var breed;
var breeds = [];
var searcherButton = document.getElementById("searchButton");
var saveButton =document.getElementById("saveButton")
var favButtons = $("#favButtons")
var errorModal = $(".modal")
var modalButton = $("#modalButton")
var original = $("#dogImageBox").html();

if(localStorage.getItem("breeds")){ 
  breeds = JSON.parse(localStorage.getItem("breeds"));
  renderBreeds();
}

function getBreed(dogBreed) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dogs?name=' + dogBreed,
        headers: { 'X-Api-Key': 'iqP+bCQF+F1cPnw9y5EfDQ==Xfnu1gSs4QvrJu79'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            handleStats(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            errorModal.attr("class", "is-active")
        }
    });
}

function handleStats(result) {
  if(result.length < 1){
    errorModal.attr("class", "is-active")
  }
  
  document.getElementById("name").textContent = result[0].name;
  document.getElementById("friendly").textContent = "Friendliness: " + result[0].good_with_strangers;
  document.getElementById("barking").textContent = "Barking: " + result[0].barking;
  document.getElementById("kids").textContent = "Kid Friendly: " + result[0].good_with_children;
  document.getElementById("playful").textContent = "Playful: " + result[0].playfulness;
  
  var imgbox = $("#dogImageBox");
  var imgel =$("<img>");
  var dogimg = result[0].image_link;
  imgel.attr("src", dogimg);
  $('#dogImageBox').html(original);
  imgbox.append(imgel);
}

function getfunfact() {
    var url = "https://dogapi.dog/api/v2/facts?limit=1"
    fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //create
    var funFact = document.querySelector('#randomDogFacts')
    var pel = document.createElement('p')
    var fact = data.data[0].attributes.body
    //text/attr
    pel.textContent = fact;
    //append
    funFact.appendChild(pel)
  });
}

getfunfact();
searcherButton.addEventListener("click", function() {
  breed = document.getElementById('breedInput').value;
  getBreed(breed);
})

saveButton.addEventListener("click", function() {
  breed = document.getElementById('breedInput').value;
  breeds.push(breed);

  if(breeds.length > 3){
    breeds.shift();
  }

  localStorage.setItem("breeds", JSON.stringify(breeds))
  renderBreeds();
})

function renderBreeds(){

  favButtons.html("");

  for(var i = 0; i < breeds.length; i++){
    var breed = breeds[i];
    // create
    var buttonEl = document.createElement("button");
    //attr/text
    buttonEl.setAttribute("data-breed", breed);
    buttonEl.setAttribute("class", "button");
    buttonEl.textContent = breed;
    //append
    favButtons.append(buttonEl);
  }
}

favButtons.on("click", ".button", function(){
  breed = this.textContent;
  getBreed(breed);
})

modalButton.on("click", function(){
  errorModal.attr("class", "is-hidden")
})
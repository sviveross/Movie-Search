var searchButton= document.querySelector("#searchButton")
var searchBar= document.querySelector("#searchBar")
console.log (searchButton)
async function viewPlot(id){
  const getPlot = await fetch('http://www.omdbapi.com/?apikey=4619adc4&i=' + id)
  const movieData = await getPlot.json();
  return movieData;
}

searchButton.addEventListener("click",function(event){
  event.preventDefault();
  var searchBox = searchBar.value 
  console.log(searchBox)
 //FETCH REQUEST FOR GETTING DATA FROM API
  fetch('http://www.omdbapi.com/?apikey=4619adc4&s=' + searchBox)
  .then(response => {
  //console.log(response)
  //Javascript Object Notation {JSON}
   return response.json()
  })
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.Search.length; i++) {
      const movie = data.Search[i];
      console.log(movie);
      const columnDiv = document.createElement("div")
      columnDiv.classList.add("col-sm-12","col-md-6","col-lg-4")
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      const moviePoster = document.querySelector("#moviePoster");
      console.log (moviePoster);
      const newImage = document.createElement("img");
      //setAttribute adds additional attributes
      newImage.setAttribute("src",movie.Poster);
      newImage.classList.add("card-img-top");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = movie.Title 
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = movie.Year
      const plotbutton = document.createElement("button");
      plotbutton.innerText = "Plot Summary";
      plotbutton.classList.add("btn", "btn-primary");// bootstrap style
      plotbutton.setAttribute("data-bs-toggle","modal");
      plotbutton.setAttribute("data-bs-target","#movieModal");
      plotbutton.addEventListener("click",async ()=>{
        const movieIdSearch = await viewPlot(movie.imdbID);
        const newModalTitle= document.querySelector("#movieModalLabel");
        const plotText = document.querySelector("#Plot")
        plotText.innerText = movieIdSearch.Plot
        newModalTitle.innerText = movieIdSearch.Title
      } )
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(plotbutton);
      newCard.appendChild(newImage);
      newCard.appendChild(cardBody);
      columnDiv.appendChild(newCard);
      moviePoster.appendChild(columnDiv);

    
      //Appending a child element to a parent element
      
    }
  

  })
  .catch(error => console.log(error));
});

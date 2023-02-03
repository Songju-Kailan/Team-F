(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
   function getMovieCard() {


       getMovies().then((movies) => {


           console.log(movies);
           let moviesList = '';

           for (let i = 0; i < movies.length; i++) {
               moviesList += (`
            <div class="movieCard card mb-1">
                <img src="./images/postman.jpg" class="card-img-top" alt="...">  
                <div class="card-body bg-black text-light">
                    <div class="card-text" id="title"> title: ${movies[i].title} </div>
                    <div class="card-text" id="year">year: ${movies[i].year}</div>
                    <div class="card-text" id="director">director: ${movies[i].director}</div>
                    <div class="card-text" id="rating">rating: ${movies[i].rating}</div>
                    <div class="card-text" id="runtime">runtime: ${movies[i].runtime}</div>
                    <div class="card-text" id="genre">genre: ${movies[i].genre}</div>
                    <div class="card-text" id="actors">actors: ${movies[i].actors}</div>
                </div>
            </div>
            `)
           }

           $('.movieList').html(moviesList)

       })
   }

   getMovieCard();


    $('#addButton').on('click',function (){
        openModal();
    })


    // OPEN MODAL
    function openModal(e) {
        // e.preventDefault();
        modal.style.display = "block";
        $('#input').html(
        `
            <div class="modalCard card mb-1">
                <div class="card-body bg-black text-light">
                    <div class="card-text fs-7" id="title"> title: <input></div>
                    <div class="card-text fs-7" id="year">year:<input></div>
                    <div class="card-text fs-7" id="director">director:<input></div>
                    <div class="card-text fs-7" id="rating">rating:<input></div>
                    <div class="card-text fs-7" id="runtime">runtime:<input></div>
                    <div class="card-text fs-7" id="genre">genre:<input></div>
                    <div class="card-text fs-7" id="actors">actors:<input></div>
                </div>
                <button id="addMovieSubmitBtn">Submit</button>
            </div>`)
    }

    $('.close').on('click',function (){
        closeModal()
    })

    // CLOSE MODAL
    function closeModal() {
        modalContent.classList.add("slide-up");
        setTimeout(() => {
            modal.style.display = "none";
            modalContent.classList.remove("slide-up");
        }, 500)
    }

// //addMovie
//     const newMovie = {
//         title: 'The Goddessfather',
//         year: 1992,
//         director: 'Francis Ford Coppola',
//         rating: 4.2,
//         runtime: 175,
//         genre: 'Crime, Drama',
//         actors: 'Marlon Brando, Al Pacino, James Caan, Diane Keaton',
//     }
//
//     addMovie(newMovie).then(()=>{
//         return getMovies()
//     }).then (movies=>{
//         console.log(movies)
//     });


//    Delete movie
    await deleteMovie({
        id: "zV6ycBJ9sNLdOfM8BkDH"
    })


    const modal = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal-content"),
    btn = document.querySelector(".btn"),
    close = document.querySelector(".close");

})();
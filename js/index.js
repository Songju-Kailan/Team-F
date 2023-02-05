"use strict";

(async () => {

    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.

// Movie data into a variable

    let movieData = getMovies().then((data)=>{
        return data;
    })
    let movieList = await movieData;
    // console.log(movieList)



//  Load movie into screen
    function showMovies() {
        getMovies().then((movies) => {
            console.log(movies);
            let moviesList = '';
            for (let i = 0; i < movies.length; i++) {
                moviesList += (`
            <div class="movieCard card mb-1">
                <img src="./images/postman.jpg" class="card-img-top" alt="...">  
                <div class="movieInfoGrp card-body bg-black text-light" id="${movies[i]}">
                    <div class="card-text" id="title"> title: ${movies[i].title} </div>
                    <div class="card-text" id="year">year: ${movies[i].year} </div>
                    <div class="card-text" id="director">director: ${movies[i].director} </div>
                    <div class="card-text" id="rating">rating: ${movies[i].rating} </div>
                    <div class="card-text" id="runtime">runtime: ${movies[i].runtime} </div>
                    <div class="card-text" id="genre">genre: ${movies[i].genre} </div>
                    <div class="card-text" id="actors">actors: ${movies[i].actors} </div>
                </div>
                <div class="buttonGrp d-flex flex-row justify-content-center mt-1 ">
                <button id="updateBtn"  data-id="${movies[i].id}" type="button" class="update-btn btn btn-primary">Update</button>
                <button id="deleteBtn"  data-id="${movies[i].id}" type="button" class="delete-btn btn btn-danger">Delete</button>
                </div>
            </div>
            `)
            }
            $('#movieList').html(moviesList)
        })
    }
    showMovies();



//  OPEN MODAL Add function
    function openModalAdd(e) {
        // e.preventDefault();
        $('#modal-add').css({
            display : "block"
        })
    }


//  CLOSE MODAL function
    function closeModalAdd() {
        modalContentA.classList.add("slide-up");
        setTimeout(() => {
            modalA.style.display = "none";
            modalContentA.classList.remove("slide-up");
        }, 500)
    }


//  Close Modal on click of close icon
    $('#closeBtn-add').on('click',function (e){
        closeModalAdd()
    })


// Open Modal on click
    $('#addButton').on('click',function (){
        openModalAdd();
    })

// Update on click
    $('#movieList').on('click','.update-btn', function(e){
        e.preventDefault();
        const thisID= $(this).data("id");
        console.log('update button clicked')
        console.log(thisID)

        let movieInfo = ''
        movieList.forEach((movie)=>{
            if (movie.id === thisID)
            movieInfo +=`
                <div class=" card-text" id="title"> title: <input class="input-update form-control-sm" id="title-input" value=" ${movie.title} "></div>
                <div class=" card-text" id="year">year: <input class="input-update form-control-sm" id="year-input" value=" ${movie.year} "></div>
                <div class=" card-text" id="director">director: <input class="input-update form-control-sm" id="director-input" value=" ${movie.director} "></div>
                <div class=" card-text" id="rating">rating: <input class="input-update form-control-sm" id="rating-input" value=" ${movie.rating} "></div>
                <div class=" card-text" id="runtime">runtime: <input class="input-update form-control-sm" id="runtime-input" value=" ${movie.runtime} "></div>
                <div class=" card-text" id="genre">genre: <input class="input-update form-control-sm" id="genre-input" value=" ${movie.genre} "></div>
                <div class=" card-text" id="actors">actors: <input class="input-update form-control-sm" id="actors-input" value=" ${movie.actors} "></div>
                <button id="updateConfirmBtn"  data-id="${movie.id}" type="button" class="update-confirm-btn btn btn-primary mt-1">Update</button>
        `})
        $(this).parent().parent().children('.movieInfoGrp').html(movieInfo);
    })

// Confirm Update on click
    $('#movieList').on('click','.update-confirm-btn', function(e){
        e.preventDefault()
        console.log('confirm update button clicked');

        // console.log($(this).data("id"))
        movieList.forEach((movie)=>{
            if(movie.id=== $(this).data("id")) {
                console.log(movie.id)
                console.log($(this).data("id"))

                const newMovie = {
                    id: $(this).data("id"),
                    title: $('#title-input').val(),
                    year: $('#year-input').val(),
                    director: $('#director-input').val(),
                    rating: $('#rating-input').val(),
                    runtime: $('#runtime-input').val(),
                    genre: $('#genre-input').val(),
                    actors: $('#actors-input').val(),
                }
               updateMovie(newMovie).then(()=>{
                   return getMovies()
               }).then(()=>{
                   location.reload()
               });
            }
        })
    })


//Add Movie on click
    $('#addMovieSubmitBtn').on('click', function(e){
            e.preventDefault()
            console.log('button clicked')
            const newMovie = {
                title: $('#titleA').val(),
                year: $('#yearA').val(),
                director: $('#directorA').val(),
                rating: $('#ratingA').val(),
                runtime: $('#runtimeA').val(),
                genre: $('#genreA').val(),
                actors: $('#actorsA').val(),
            }

            addMovie(newMovie).then(()=>{
                return getMovies()
            }).then (movies=>{
                console.log(movies)
            }).then (closeModalAdd)
                .then(()=>{
                    location.reload()
                });
        })


//Delete movie on click
    $('#movieList').on('click','.delete-btn',function(e){
        // alert($(this).data('id'))
        // e.preventDefault()
        console.log('clicked')

        const thisID= $(this).data("id");
        console.log('clicked')
        console.log(thisID)
        deleteMovie({
            id: `${thisID}`
        }).then(()=>{
            return getMovies()
        }).then(()=>{
            location.reload()
        });
    })

    $('#search-btn').on('click', function(e){
        e.preventDefault()
        const searchResult = $('#search-input').val();

        console.log("Searching for: " + $('#search-input').val());
        console.log(searchResult);
        let movieSearch = '';
        movieList.forEach((movie)=>{
            if(searchResult.includes(movie)){
                movieSearch+= movie;
            }
        })
        return movieSearch;
    })

    // const searchInput = document.querySelector(‘#search-input’);
    // const searchBtn = document.querySelector(‘#search-btn’);
    // searchBtn.addEventListener(“click”, function(e) {
    //     e.preventDefault()
    //     const searchResult = searchInput.value;
    //     // console.log(“Searching for: ” + searchInput);
    //     console.log(‘click’)
    // });



    const modalA = document.querySelector(".modalAdd"),
        modalContentA = document.querySelector(".modalA-content");



    // setTimeout(function() {
    //     const html = `
    //         <div>
    //             <button class="delete-btn" data-id="1">Delete</button>
    //         </div>
    //         <div>
    //             <button class="delete-btn" data-id="2">Delete</button>
    //         </div>
    //         <div>
    //             <button class="delete-btn" data-id="3">Delete</button>
    //         </div>
    //         <button>Something Else</button>
    //     `;
    //     $('#things').html(html);
    // }, 1000);

})();
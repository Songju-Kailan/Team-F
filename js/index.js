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





    // $('#search-input').focus(function(){
    //     let full = $("#poster").has("img").length ? true : false;
    //     if(full == false){
    //         $('#poster').empty();
    //     }
    // });




// Load Movie info from search
    let getPosterFromSearch = function(e){
        e.preventDefault()
        const query = $('#search-input').val();
        if(query===''){
            $('.text').html ('<div class="text"><strong>Oops!</strong> Try adding something into the search field.</div>');
        }else{
            $('.text').html('<div class="alert"><strong>Loading...</strong></div>');
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.theMovieDb}&query=${query}`)
                .then(response => response.json())
                .then(data => {
                    const posterURL = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
                    console.log(data.results[0]);
                    // console.log(data.results[0].release_date.slice(0,4))
                    $('.box').css({
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${posterURL})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    })

                    $('.text')
                        .html(`<div class="text"><strong>${data.results[0].title}</strong> <br> ${data.results[0].release_date.slice(0,4)} <br><button id="addToListBtn" type="button" class="btn btn-sm btn-dark mt-2">+</button></div> `)


                    function getMovieInformation (){
                        let movieInformation = {};
                        $.ajax({
                            url: `https://api.themoviedb.org/3/movie/${data.results[0].id}`,
                            data: {
                                api_key: keys.theMovieDb,
                            },
                            success: function(data) {
                                console.log(data.runtime); // get the runtime of the movie
                                console.log(data.genres)
                                let genresAll = ''
                                for (var i = 0; i < data.genres.length; i++) {
                                    // console.log(data.genres[i].name + " as " + data.genres[i].character)
                                    if (i === data.genres.length - 1) {
                                        genresAll += `${data.genres[i].name}.`;
                                    } else {
                                        genresAll += `${data.genres[i].name}, `;
                                    }
                                }
                                console.log(genresAll);
                                movieInformation.runtime = data.runtime;
                                movieInformation.genres = genresAll;
                            }
                        });

                        $.ajax({
                            url: `https://api.themoviedb.org/3/movie/${data.results[0].id}/credits`,
                            data: {
                                api_key: keys.theMovieDb,
                            },
                            success: function(data) {

                                console.log(data.cast); // get the list of actors in the movie
                                let actors = ''
                                for (var i = 0; i < data.cast.length; i++) {
                                    // console.log(data.cast[i].name + " as " + data.cast[i].character)
                                    if (i === data.cast.length - 1) {
                                        actors += `${data.cast[i].name}.`;
                                    } else {
                                        actors += `${data.cast[i].name}, `;
                                    }
                                }
                                // console.log(actors)
                                const actorsFiltered = actors.split(',').slice(0, 3).join(', ')
                                console.log(actorsFiltered)
                                movieInformation.actors = actorsFiltered;
                            }
                        });
                    }
                    getMovieInformation()
                    $('#addToListBtn').on('click',  (e)=>{
                        e.preventDefault()
                        console.log('add button clicked')
                        const newMovie = {
                            title: `${data.results[0].title}`,
                            year: `${data.results[0].release_date.slice(0,4)}`,
                            // director: `${data.results[0].crew.filter(({job})=> job ==='Director')}`,
                            rating: `${data.results[0].vote_average}`,
                            // runtime: `${data.results[0].runtime}`,
                            // genre: `${data.results[0].genre.name}`,
                            // actors: `${actorsFiltered}`
                        }

                        addMovie(newMovie).then(()=>{
                            return getMovies()
                        }).then (movies=>{
                            console.log(movies)
                        }).then(()=>{
                            location.reload()
                        });
                    })
                });
        }
    }






                    // fetch(`https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${keys.theMovieDb}`)
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         console.log(data.runtime); // get the runtime of the movie
                    //         console.log(data.credits.cast); // get the list of actors in the movie
                    //     });


                    // fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${keys.theMovieDb}`)
                    //         .then(response => response.json())
                    //         .then(actors =>{
                    //             let movieActors='';
                    //             for (var i = 0; i < actors.cast.length; i++) {
                    //                 // console.log(actors.cast[i].name + " as " + actors.cast[i].character)
                    //                 if (i === actors.cast.length - 1) {
                    //                     movieActors += `${actors.cast[i].name}.`;
                    //                 } else {
                    //                     movieActors += `${actors.cast[i].name}, `;
                    //                 }
                    //             }
                    //             const actorsFiltered = movieActors.split(', ').slice(0, 3).join(', ')
                    //             console.log(actorsFiltered)
                    //
                    //         }).catch(error => console.error(error));





    // const getActors = function (){
    //     $.ajax({
    //         type: "GET",
    //         url: "https://api.themoviedb.org/3/movie/" + data.results[0].id + "/credits?api_key=" + keys.theMovieDb,
    //         dataType: "json",
    //         success: function (movie_credits) {
    //             let actors = ''
    //             for (var i = 0; i < movie_credits.cast.length; i++) {
    //                 // console.log(movie_credits.cast[i].name + " as " + movie_credits.cast[i].character)
    //                 if (i === movie_credits.cast.length - 1) {
    //                     actors += `${movie_credits.cast[i].name}.`;
    //                 } else {
    //                     actors += `${movie_credits.cast[i].name}, `;
    //                 }
    //             }
    //             const actorsFiltered = actors.split(',').slice(0, 3).join(', ')
    //             console.log(actorsFiltered)
    //             // return actorsFiltered
    //             console.log('hello')
    //         }
    //     });
    // }


    $('#search-btn').click(getPosterFromSearch);
    $('#search-input').keyup(function(event){
        if(event.keyCode == 13){
            getPosterFromSearch();
        }
    });


// Vanilla JS version of search function
    // const searchButton = document.querySelector("#search-btn");
    // const searchInput = document.querySelector("#search-input");
    // const bgElement = document.querySelector(".box");
    // searchButton.addEventListener("click", function() {
    //     const query = searchInput.value;
    //     if(query===''){
    //         bgElement.innerHTML = '<div class="text"><strong>Oops!</strong> Try adding something into the search field.</div>';
    //     }else{
    //         $('#poster').html('<div class="alert"><strong>Loading...</strong></div>');
    //         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.theMovieDb}&query=${query}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 const posterURL = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
    //                 console.log(data.results[0].release_date.slice(0,4))
    //
    //                 bgElement.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${posterURL})`;
    //                 bgElement.style.backgroundSize ="contain";
    //                 bgElement.style.backgroundRepeat ="no-repeat";
    //                 bgElement.style.backgroundPosition ="center";
    //                 bgElement.innerHTML = `<div class="text"><strong>${data.results[0].title}</strong> <br> ${data.results[0].release_date.slice(0,4)}  </div>`;
    //             });
    //     }
    // });



//  Load movie into screen
    function showMovies() {
        getMovies().then((movies) => {
            console.log(movies);

            movieList.forEach((movie)=>{
                console.log(movie.title)




                $('#movieList').html('<div class="alert"><strong>Loading...</strong></div>');
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.theMovieDb}&query=${movie.title}`)
                    .then(response => response.json())
                    .then(data => {

                        let moviesList = '', movieImage='';
                        for (let i = 0; i < movies.length; i++) {
                            let posterURL = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
                            // if(data.results[i].title === movieList.title){
                            //     movieImage+= (`<img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" class="card-img-top" id="movieImage2" alt="...">`)
                            // }else{
                            //     movieImage+= (`<img src="../images/postman.jpg" class="card-img-top" id="movieImage2" alt="...">`)
                            // }

                            moviesList += (`
                                <div class="movieCard card mb-1">
                                    <img src="${posterURL}" class="card-img-top" id="movieImage" alt="...">
                    
                                    <div class="movieInfoGrp card-body bg-black text-light" id="${movies[i]}">
                    
                                        <div class="card-text text-center" id="title">  ${movies[i].title} <span class="card-text" id="year"> ${movies[i].year} </span> </div>
                                        <div class="card-text text-center" id="rating"><span class="stars">${movies[i].rating}</span> </div>
                                        <div class="card-text" id="genre">${movies[i].genre} </div>
                                        <div class="card-text" id="director">director: ${movies[i].director} </div>
                                        <div class="card-text" id="runtime">runtime: ${movies[i].runtime} hours </div>
                                        <div class="card-text" id="actors">actors: ${movies[i].actors} </div>
                                    </div>
                                    <div class="buttonGrp d-flex flex-row justify-content-center mt-1 ">
                                    <button id="updateBtn"  data-id="${movies[i].id}" type="button" class="update-btn hidden-btn btn btn-primary">Update</button>
                                    <button id="deleteBtn"  data-id="${movies[i].id}" type="button" class="delete-btn hidden-btn btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            `)
                        }
                        $('#movieList').html(moviesList)

                    })
            })
        })
    }
    showMovies();


    const modalA = document.querySelector(".modalAdd"),
        modalContentA = document.querySelector(".modalA-content");

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

//  Close MODAL on click of close icon for Add
    $('#closeBtn-add').on('click',function (e){
        closeModalAdd()
    })

//  Open MODAL on click for Add
    $('#addButton').on('click',function (){
        openModalAdd();
    })


    $('.dropEdit').on('click',function(e){
        e.preventDefault()
        $('.hidden-btn').toggleClass('hidden-btn')


        console.log('click')
    })






// load update input on click
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
                <div class=" card-text" id="rating">rating: <input class="input-update form-control-sm " id="rating-input" value=" ${movie.rating} "></div>
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


//Search from movie data on click
    $('#savedMovieSearchBtn').on('click', function(e){
        e.preventDefault()
        getMovies().then((movies) => {

            const searchValue = $('#savedMovieSearchInput').val();
            console.log("Searching for: " + searchValue);
            let moviesList = '';

            for (let i = 0; i < movies.length; i++) {
                if (movies[i].title.toLowerCase().includes(searchValue)) {
                    moviesList += (`
                    <div class="movieCard card mb-1">
                        <img src="./images/postman.jpg" class="card-img-top" id="movieImage" alt="...">
        
                        <div class="movieInfoGrp card-body bg-black text-light" id="${movies[i]}">
        
                            <div class="card-text text-center" id="title">  ${movies[i].title} <span class="card-text" id="year"> ${movies[i].year} </span> </div>
                            <div class="card-text text-center" id="rating"><span class="stars">${movies[i].rating}</span> </div>
                            <div class="card-text" id="genre">${movies[i].genre} </div>
                            <div class="card-text" id="director">director: ${movies[i].director} </div>
                            <div class="card-text" id="runtime">runtime: ${movies[i].runtime} hours </div>
                            <div class="card-text" id="actors">actors: ${movies[i].actors} </div>
                        </div>
                        <div class="buttonGrp d-flex flex-row justify-content-center mt-1 ">
                        <button id="updateBtn"  data-id="${movies[i].id}" type="button" class="update-btn btn btn-primary">Update</button>
                        <button id="deleteBtn"  data-id="${movies[i].id}" type="button" class="delete-btn btn btn-danger">Delete</button>
                        </div>
                    </div>
            `)
                    // loadPoster(movies[i])
                }
            }
            $('#movieList').html(moviesList)
        })
    })











    function getStars(rating) {

        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        let output = [];

        // Append all the filled whole stars
        for (let i = rating; i >= 1; i--){
            output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

            // If there is a half a star, append it
            if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
        }

        // If there is a half a star, append it

        // Fill the empty stars
        for (let i = (5 - rating); i >= 1; i--)
            output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return output.join('');
    }




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
"use strict";

(async () => {

    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object
    // with your team name in the "js/movies-api.js" file.


    // Movie data into a variable

    const movieData = await getMovies();

    // const movieData = getMovies().then((data)=>{
    //     return data;
    // })
    console.log(movieData)

    const movieTitles = movieData.map((movie) => {
        return movie.title;
    })

    console.log(movieTitles)


    let movieList = await movieData;
    // console.log(movieList)


// Load Movie info from search
    let getPosterFromSearch = function (e) {
        e.preventDefault()
        const query = $('#search-input').val();
        if (query === '') {
            $('.text').html('<div class="text"><strong>Oops!</strong> Try adding something into the search field.</div>');
        } else {
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
                        .html(`<div class="text"><strong>${data.results[0].title}</strong> <br> ${data.results[0].release_date.slice(0, 4)} <br><button id="addToListBtn" type="button" class="btn btn-sm btn-dark mt-2">+</button></div> `)


                    $('#addToListBtn').on('click', (e) => {
                        const movie_id = data.results[0].id; // Replace with the ID of the movie you want to retrieve information for
                        const api_key = keys.theMovieDb; // Replace with your actual API key
                        const moviePromise = fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
                            .then(response => response.json());
                        const creditsPromise = fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${api_key}`)
                            .then(response => response.json());

                        Promise.all([moviePromise, creditsPromise])
                            .then(results => {
                                const movie = results[0];
                                const credits = results[1];
                                // RUNTIME
                                console.log(movie.runtime); // get the runtime of the movie
                                console.log(credits.cast); // get the list of actors in the movie
                                // ACTORS
                                let movieActors = '';
                                console.log()
                                for (let i = 0; i < credits.cast.length; i++) {
                                    // console.log(credits.cast[i].name + " as " + credits.cast[i].character)
                                    if (i === credits.cast.length - 1) {
                                        movieActors += `${credits.cast[i].name}.`;
                                    } else {
                                        movieActors += `${credits.cast[i].name}, `;
                                    }
                                }
                                const actorsFiltered = movieActors.split(', ').slice(0, 3).join(', ')
                                console.log(actorsFiltered)

                                const director = credits.crew.find(member => member.job === "Director").name
                                console.log(director)

                                // GENRES
                                let genresAll = ''
                                for (let i = 0; i < movie.genres.length; i++) {
                                    // console.log(movie.genres[i].name + " as " + movie.genres[i].character)
                                    if (i === movie.genres.length - 1) {
                                        genresAll += `${movie.genres[i].name}.`;
                                    } else {
                                        genresAll += `${movie.genres[i].name}, `;
                                    }
                                }
                                console.log(genresAll);

                                // IMAGE PATH
                                console.log(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`); // get the poster URL of the movie


                                console.log('add button clicked')
                                const newMovie = {
                                    title: `${data.results[0].title}`,
                                    year: `${data.results[0].release_date.slice(0, 4)}`,
                                    director: `${director}`,
                                    rating: `${data.results[0].vote_average}`,
                                    runtime: `${movie.runtime}`,
                                    genre: `${genresAll}`,
                                    actors: `${actorsFiltered}`
                                }

                                addMovie(newMovie).then(() => {
                                    return getMovies()
                                }).then(movies => {
                                    console.log(movies)
                                }).then(() => {
                                    location.reload()
                                });

                            })

                    })
                });
        }
    }


    $('#search-btn').click(getPosterFromSearch);
    $('#search-input').keyup(function (event) {
        if (event.keyCode == 13) {
            getPosterFromSearch();
        }
    });


//  Load movie into screen
    function showMovies() {
        getMovies().then((movies) => {
            console.log(movies);

            let movieURLArray = [];
            const getMovieURL = function () {

                for (let i = 0; i < movies.length; i++) {
                    const movie_title = movies[i].title; // Replace with the title of the movie you want to retrieve information for
                    const api_key = keys.theMovieDb; // Replace with your actual API key

                    const searchPromise = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie_title}`)
                        .then(response => response.json());

                    searchPromise
                        .then(searchResults => {
                            if (searchResults.total_results > 0) {
                                const movie_id = searchResults.results[0].id;
                                const moviePromise = fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
                                    .then(response => response.json());


                                Promise.all([moviePromise])
                                    .then(results => {
                                        const movie = results[0];
                                        // console.log(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`); // get the poster URL of the movie
                                        movieURLArray.push(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
                                    })
                            }
                        })
                }
                return movieURLArray;
            }
            console.log(getMovieURL())
            console.log(movieURLArray);


            function makeMovieURL(key, title) {
                return `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${title}`
            }

            Promise.all(movieList.map(movie => {
                return fetch(makeMovieURL(keys.theMovieDb, movie.title)).then(res => res.json())
            })).then(movies => {
                console.log(movies);
            });

            // let movieImageArray = [];
            // const getPosters = async () => {
            //     for (let i = 0; i < movieTitles.length; i++) {
            //         const api_key = keys.theMovieDb; // Replace with your actual API key
            //         let data = await (`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieTitles[i]}`);
            //         console.log(data);
            //         movieImageArray.push(data);
            //     }
            // }
            // getPosters();
            // console.log(movieImageArray)

            const movie_title = movies[2].title; // Replace with the title of the movie you want to retrieve information for
            const api_key = keys.theMovieDb; // Replace with your actual API key

            const searchPromise = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie_title}`)
                .then(response => response.json());

            searchPromise
                .then(searchResults => {
                    if (searchResults.total_results > 0) {
                        const movie_id = searchResults.results[0].id;
                        const moviePromise = fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
                            .then(response => response.json());


                        // ${cloudImages[data.list[i].weather[0].main]}


                        Promise.all([moviePromise])
                            .then(movieData => {
                                // const movieURL = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`; // get the poster URL of the movie


                                let moviesList = '';
                                for (let i = 0; i < movies.length; i++) {
                                    let posterURL = `https://image.tmdb.org/t/p/w500/${movieData[0].poster_path}`;


                                    moviesList += (`
                                <div class="movieCard card mb-1">
                                    <img src="${movieURLArray[i]}" class="card-img-top" id="movieImage" alt="...">
                    
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
                                $('#movieList').append(moviesList)
                            })
                    }
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
            display: "block"
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


//  Toggle Edit Mode
    $('.dropEdit').on('click', function (e) {
        e.preventDefault()
        $('.hidden-btn').toggleClass('hidden-btn')


        console.log('click')
    })


//  Close MODAL on click of close icon for Add
    $('#closeBtn-add').on('click', function (e) {
        closeModalAdd()
    })


//  Open MODAL on click for Add
    $('#addButton').on('click', function () {
        openModalAdd();
    })


// load update input on click
    $('#movieList').on('click', '.update-btn', function (e) {
        e.preventDefault();
        const thisID = $(this).data("id");
        console.log('update button clicked')
        console.log(thisID)

        let movieInfo = ''
        movieList.forEach((movie) => {
            if (movie.id === thisID)
                movieInfo += `
                <div class=" card-text" id="title"> title: <input class="input-update form-control-sm" id="title-input" value=" ${movie.title} "></div>
                <div class=" card-text" id="year">year: <input class="input-update form-control-sm" id="year-input" value=" ${movie.year} "></div>
                <div class=" card-text" id="director">director: <input class="input-update form-control-sm" id="director-input" value=" ${movie.director} "></div>
                <div class=" card-text" id="rating">rating: <input class="input-update form-control-sm " id="rating-input" value=" ${movie.rating} "></div>
                <div class=" card-text" id="runtime">runtime: <input class="input-update form-control-sm" id="runtime-input" value=" ${movie.runtime} "></div>
                <div class=" card-text" id="genre">genre: <input class="input-update form-control-sm" id="genre-input" value=" ${movie.genre} "></div>
                <div class=" card-text" id="actors">actors: <input class="input-update form-control-sm" id="actors-input" value=" ${movie.actors} "></div>
                <button id="updateConfirmBtn"  data-id="${movie.id}" type="button" class="update-confirm-btn btn btn-primary mt-1">Update</button>
        `
        })
        $(this).parent().parent().children('.movieInfoGrp').html(movieInfo);
    })


// Confirm Update on click
    $('#movieList').on('click', '.update-confirm-btn', function (e) {
        e.preventDefault()
        console.log('confirm update button clicked');

        // console.log($(this).data("id"))
        movieList.forEach((movie) => {
            if (movie.id === $(this).data("id")) {
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
                updateMovie(newMovie).then(() => {
                    return getMovies()
                }).then(() => {
                    location.reload()
                });
            }
        })
    })


//Add Movie on click
    $('#addMovieSubmitBtn').on('click', function (e) {
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

        addMovie(newMovie).then(() => {
            return getMovies()
        }).then(movies => {
            console.log(movies)
        }).then(closeModalAdd)
            .then(() => {
                location.reload()
            });
    })


//Delete movie on click
    $('#movieList').on('click', '.delete-btn', function (e) {
        // alert($(this).data('id'))
        // e.preventDefault()
        console.log('clicked')

        const thisID = $(this).data("id");
        console.log('clicked')
        console.log(thisID)
        deleteMovie({
            id: `${thisID}`
        }).then(() => {
            return getMovies()
        }).then(() => {
            location.reload()
        });
    })


//Search from movie data on click
    $('#savedMovieSearchBtn').on('click', async function (e) {
        e.preventDefault()
        await getMovies().then((movies) => {

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
        location.reload();
    })


    function getStars(rating) {

        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        let output = [];

        // Append all the filled whole stars
        for (let i = rating; i >= 1; i--) {
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

})();
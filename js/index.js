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
                <div class="card-body bg-black text-light" id="${movies[i]}">
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
   getMovieCard();





    // OPEN MODAL Add function
    function openModalA(e) {
        // e.preventDefault();
        $('#modal-add').css({
            display : "block"
        })
    }

    // OPEN MODAL Update function
    function openModalU(e) {
        // e.preventDefault();
        $('#modal-update').css({
            display : "block"
        })
    }


    // CLOSE MODAL function
    function closeModalA() {
        modalContentA.classList.add("slide-up");
        setTimeout(() => {
            modalA.style.display = "none";
            modalContentA.classList.remove("slide-up");
        }, 500)
    }

    function closeModalU() {
        modalContentU.classList.add("slide-up");
        setTimeout(() => {
            modalU.style.display = "none";
            modalContentU.classList.remove("slide-up");
        }, 500)
    }


    // // Close Modal on click of close icon
    $('#closeBtn-add').on('click',function (e){
        closeModalA()
    })

    $('#closeBtn-update').on('click',function (e){
        closeModalU()
    })


    $('#addButton').on('click',function (){
        openModalA();
    })

    $('#movieList').on('click','.update-btn', function(e){
        openModalU()
    })

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
            }).then (closeModalA)
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




        // $('#updateMovieSubmitBtn').on('click', function(e){
        //     e.preventDefault()
        //     console.log('button clicked')
        //     const newMovie = {
        //         title: $('#titleU').val(),
        //         year: $('#yearU').val(),
        //         director: $('#directorU').val(),
        //         rating: $('#ratingU').val(),
        //         runtime: $('#runtimeU').val(),
        //         genre: $('#genreU').val(),
        //         actors: $('#actorsU').val(),
        //     }
        //     updateMovie (newMovie).then(()=>{
        //         return getMovies()
        //     }).then (movies=>{
        //         console.log(movies)
        //     })
        //     // .then (closeModalU)
        //     // .then(()=>{
        //     //     // window.location.reload()
        //     // });
        // })


    // function updateMovie(){
        $('#updateMovieSubmitBtn').on('click', function(e){
            e.preventDefault()
            console.log('button clicked');


            const newMovie = {
                title: $('#titleU').val(),
                year: $('#yearU').val(),
                director: $('#directorU').val(),
                rating: $('#ratingU').val(),
                runtime: $('#runtimeU').val(),
                genre: $('#genreU').val(),
                actors: $('#actorsU').val(),
            }
            updateMovie (newMovie).then(()=>{
                return getMovies()
            }).then (movies=>{
                console.log(movies)
            })
            // .then (closeModalU)
            // .then(()=>{
            //     // window.location.reload()
            // });
        })
    // }




    const modalA = document.querySelector(".modalAdd"),
        modalU = document.querySelector(".modalUpdate"),
        modalContentA = document.querySelector(".modalA-content"),
        modalContentU = document.querySelector(".modalU-content")

    // btn = document.querySelector(".btn"),
    // close = document.querySelector(".close");


    "use strict";

    setTimeout(function() {
        const html = `
            <div>
                <button class="delete-btn" data-id="1">Delete</button>
            </div>
            <div>
                <button class="delete-btn" data-id="2">Delete</button>
            </div>
            <div>
                <button class="delete-btn" data-id="3">Delete</button>
            </div>
            <button>Something Else</button>
        `;
        $('#things').html(html);
    }, 1000);

})();
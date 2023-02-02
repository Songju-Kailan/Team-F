(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    getMovies().then((movies) =>{

        let moviesList = ''
        console.log(movies);

        for(let i=0; i<movies.length; i++){
            moviesList +=(`
            <div class="card">
                <div id="title"> title: ${movies[0].title} </div>
                <div id="year">year: ${movies[0].year}</div>
                <div id="director">director: ${movies[0].director}</div>
                <div id="rating">rating: ${movies[0].rating}</div>
                <div id="runtime">runtime: ${movies[0].runtime}</div>
                <div id="genre">genre: ${movies[0].genre}</div>
                <div id="actors">actors: ${movies[0].actors}</div>
            </div>`)
        }
        $('.card').html(moviesList)
    })







        // function getWeather(lon, lat) {
        //     $.get('https://api.openweathermap.org/data/2.5/forecast', {
        //         lat: lat,
        //         lon: lon,
        //         appid: OPEN_WEATHER_APPID,
        //         units: 'imperial'
        //     })
        //
        //         .done(function (data) {
        //             // console.log( reverseGeocode(lon, lat))
        //             console.log(data)
        //
        //             // can be used to get forecast conditions at current time in increments of 24 hours
        //             // weather Forecast loop
        //             let html = '', main='', location='';
        //             for (let i = 0; i < data.list.length; i += 8) {
        //                 html += (`
        //                     <div class="card">
        //                         <div class="card-header text-center ">
        //                           ${data.list[i].dt_txt.slice(0, 10)}
        //
        //                         </div>
        //                         <div class="d-flex flex-column justify-content-center align-items-center">
        //                             ${cloudImages[data.list[i].weather[0].main]}
        //                             <div class="temp"> ${data.list[i].main.temp_max} °F / ${data.list[i].main.temp_min} °F</div>
        //                         </div>
        //                         <hr>
        //                         <div class="card-body">
        //                           <h6><i class="bi bi-cloud-sun"></i> <span>${data.list[i].weather[0].description}</span></h6>
        //                           <h6><i class="bi bi-droplet"></i> <span>${data.list[i].main.humidity}</span></h6>
        //                           <h6><i class="bi bi-wind"></i> <span> ${data.list[i].wind.speed} / ${data.list[i].wind.deg}°</span></h6>
        //                           <h6><i class="bi bi-cloud-haze2"></i> <span>${data.list[i].main.pressure}</span></h6>
        //                         </div>
        //                       </div>
        //                     `)
        //
        //             }
        //             $('.card').html(html);
        //
        //             //reverse Geocode for location update
        //             reverseGeocode({lng: lon, lat: lat}, keys.mapbox).then(function(results) {
        //                 location += results.split(',').slice(1,2);
        //                 console.log(location)
        //                 $('.location').html(location);
        //                 $('.city').html(location);
        //             })
        //
        //
        //             // Main page loop
        //             for (let i = 0; i < 1; i += 1) {
        //                 main += (`
        //             <div class="mainScreen">
        //
        //                 <div class="main-card">
        //                   <div>Today's weather of</div>
        //                   <div class="location"></div>
        //                   <div class="temp-main"> ${data.list[i].main.temp.toFixed()} <span>°F</span></div>
        //
        //                   <div class="details">
        //                     <h6 class="mx-2"><i class="bi bi-cloud-sun"></i> <span class="mx-2">${data.list[i].weather[0].description}</span></h6>
        //                     <h6 class="mx-2"><i class="bi bi-droplet"></i> <span class="mx-2">${data.list[i].main.humidity}</span></h6>
        //                     <h6 class="mx-2"><i class="bi bi-wind"></i> <span class="mx-2">${data.list[i].wind.speed} / ${data.list[i].wind.deg}°</span></h6>
        //                     <h6 class="mx-2"><i class="bi bi-cloud-haze2"></i> <span class="mx-2">${data.list[i].main.pressure}</span></h6>
        //                   </div>
        //                 </div>
        //             </div>
        //                    `)
        //             }
        //             $('.mainScreen').html(main);
        //         })
        // }
})();
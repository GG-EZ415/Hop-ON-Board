
var rawgAPI = '4195cc8002804467be513fd2af860f7e';
var youtubeAPI = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=";
var youtubeAPIKey = "&key=AIzaSyCKEJL7QBlhCvJotb_E4HkcyPhBFwFO2WU";


// get game game name on clickbar searchBarEl = "";
$("button").on('click', function () {
    console.log('button');
    searchBarEl = $('#search-input').val().trim();
    var searchVal = searchBarEl.split(" ").join("%20");
    console.log(searchVal);
    rawgPull(searchVal);
    youTubePull(searchVal);
    $('#search-input').val("");

});


function createCard(title, rating, meta, img) {
    return '<div class="column is-3-tablet is-5-desktop">' +
        '<div class="card">' +
        '<div class="card-image.has-text-centred.px-5" id="rawg-image">' +
        '<img src="' + img + '" alt="wii">' +
        '</div>' +
        '<div class="card-content">' +
        '<p class="title is-size-5">Top 2</p>' +
        '<h1 id="rawg-game-title">' + title + '</h1>' +
        '</div>' +
        '<footer class="card-footer">' +
        '<p class="card-footer-item">' +
        '<h3 id="rawg-esrb-rating" class="has-text-grey">' + rating + '</h3>' +
        '</p>' +
        '<p class="card-footer-item">' +
        '<h3 id="rawg-meta" class="has-text-grey">' + meta + '</h3>' +
        '</p>' +
        '</footer>' +
        '</div>' +
        '</div>';
}
var testEl = document.querySelector('.test')



function rawgPull(gameName) {
    // will fetch ALL the games
    fetch('https://api.rawg.io/api/games?key=' + rawgAPI + '&search=' + gameName)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.results[0].name);
            console.log(data.results[0].esrb_rating.name);
            console.log(data.results[0].metacritic);
            console.log(data.results[0].background_image);
            // console.log(data.results[0].stores);
            testEl.innerHTML = "";
            for (var i = 0; i < 1; i++) {
                var title = data.results[i].name;
                var rating = data.results[i].esrb_rating.name;
                var metacritic = data.results[i].metacritic;
                var rawgPic = data.results[i].background_image;

                $("#rawg-cont").append(createCard(title, rating, metacritic, rawgPic));

            }

        })


};




function youTubePull(gameName) {
    fetch(youtubeAPI + gameName + youtubeAPIKey)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.items[0].snippet.title);
            console.log(data.items[0].snippet.thumbnails.default.url);

        })

};


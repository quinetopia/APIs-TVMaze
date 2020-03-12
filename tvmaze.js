/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let listOfShows = [];
  let $searchResponse = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)

  for (let show=0; show < $searchResponse.data.length; show++) {
    listOfShows[show] = {name:"", id:"", image: "", summary:""};
    listOfShows[show].name = $searchResponse.data[show].show.name ;
    listOfShows[show].id = $searchResponse.data[show].show.id ;
    listOfShows[show].image = $searchResponse.data[show].show.image ;
    listOfShows[show].summary = $searchResponse.data[show].show.summary ;
  }
  return listOfShows;


  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
  //     image: "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {

      if(!show.image){
        show.image= {medium:"https://tinyurl.com/tv-missing"};
      }
      
      console.log(`${show.image.medium}`);
      let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
      <div class="card" data-show-id="${show.id}">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5> 
          <img class = "card-image" src="${show.image.medium}"></img>
          
          <p class="card-text">${show.summary}</p>
        </div>
      </div>
    </div>
    `);
    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  let $episodesResponse =await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let episodesData=[];
  for (let episode=0; episode<$episodesResponse.data.length; episode++){
    episodesData[episode]={id:"", name:"", season:"", number:""};
    episodesData[episode].id=$episodesResponse.data[episode].id
    episodesData[episode].name=$episodesResponse.data[episode].name
    episodesData[episode].season=$episodesResponse.data[episode].season
    episodesData[episode].number=$episodesResponse.data[episode].number
  }
  console.log(episodesData);
  return episodesData;

  // TODO: return array-of-episode-info, as described in docstring above
}   

function populateEpisodes(episodesData){
  for(i=0; i<episodesData.length;i++){
    let episodeListItem= `title: ${episodeData[i].name}, season: ${episodeData[i].season}, episode: ${episodeData[i].number}`
    $('ul').append(`<li> ${episodeListItem}</li>`)
  }
}

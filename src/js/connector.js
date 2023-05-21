var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

// we can access arguments passed to the iframe like so
var arg = t.arg('arg');

t.render(function(){
  return Promise.all([
    t.get('card', 'name'),
    t.get('board', 'prefs')
  ])
  .spread(function(cardName, prefs){
    // now that we have the card name and the board prefs we can do things with them
    var currentDate = new Date().toISOString().split('T')[0]; // get current date in "yyyy-mm-dd" format

    return fetch("https://incredible-naiad-5425d4.netlify.app/.netlify/functions/get-toggl-total?description=" + encodeURIComponent(cardName) + "&start_date=2023-01-01&end_date=" + currentDate, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Add this line
      },
    })
    .then(response => response.json())
    .then(data => {
      // do something with the data from the fetch request
      console.log(data);
    })
    .catch(error => console.log('error', error));
  })
  .then(function(){
    // then we will return a single promise that will resolve prior to us trying to call 'sizeTo'
    return t.sizeTo('#content')
    .done();
  })
});

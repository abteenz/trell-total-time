window.TrelloPowerUp.initialize({
  'card-badges': function(t, opts) {
    let cardName;
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let dd = String(today.getDate()).padStart(2, '0'); 
    let currentDate = `${yyyy}-${mm}-${dd}`;

    return t.card('name')
      .get('name')
      .then(function(name) {
        cardName = name;
        // Instead of directly calling Toggl API, we call our server-side script
        // which will make the request to Toggl API and return the response.
        return fetch(`/.netlify/functions/serverside/get-toggl-total/get-toggl-total?description=${encodeURIComponent(cardName)}&start_date=2023-01-01&end_date=${currentDate}`);
      })
      .then(response => response.json())
      .then(function(json) {
        const totalTime = json.total_grand || 0;
        return [{
          dynamic: function() {
            return {
              text: totalTime + ' total time',
              icon: './images/icon.svg',
              color: 'green'
            }
          }
        }];
      });
  }
});

window.TrelloPowerUp.initialize({
  'card-badges': function(t, opts) {
    let cardName;
    return t.card('name')
      .get('name')
      .then(function(name) {
        cardName = name;
        return fetch("https://api.track.toggl.com/reports/api/v3/workspace/6759737/search/time_entries/totals", {  
          method: "POST",  
          headers: {  
            "Content-Type": "application/json",  
            "Authorization": `Basic ${btoa('a93a1bdec1193f3e9da5036c4f0a2e5a:api_token')}`
          },
          body: JSON.stringify({
            "description": cardName
          })  
        });
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

window.TrelloPowerUp.initialize({
  'card-badges': function(t, opts) {
    return t.card('name')
      .get('name')
      .then(function(cardName) {
        // Replace 'your_toggl_api_token' with your actual Toggl API token.
        var headers = new Headers();
        headers.append("Authorization", "Basic " + btoa('a93a1bdec1193f3e9da5036c4f0a2e5a' + ":api_token"));

        return t.request({
          url: `https://api.track.toggl.com/reports/api/v2/details?user_agent=api_test&description=${cardName}`,
          headers: headers
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var totalTime = data.total_grand / 1000 / 60 / 60;  // total time in hours
          return [{
            text: totalTime.toFixed(2) + ' hrs',
            icon: 'https://your/icon/urhttps://cdn.onlinewebfonts.com/svg/img_563942.png', // replace with your icon URL
            color: null,
          }];
        });
      });
  },
});

var Promise = TrelloPowerUp.Promise;

// Get all the comments on the card
function getComments(t, card) {
  return t
    .rest('GET', `cards/${card.id}/actions`, {
      filter: 'commentCard'
    })
    .then((actions) => {
      return actions.map((action) => {
        return action.data.text;
      });
    });
}

// Parse and sum up the times in the comments
function sumTimes(comments) {
  let sum = 0;
  comments.forEach((comment) => {
    const timeRegex = /([0-9]+):([0-9]+):([0-9]+)/;
    const matches = timeRegex.exec(comment);
    if (matches !== null) {
      const hours = parseInt(matches[1], 10);
      const minutes = parseInt(matches[2], 10);
      const seconds = parseInt(matches[3], 10);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      sum += totalSeconds;
    }
  });
  return sum;
}

// Update the card title with the sum of the times
function updateCardTitle(t, card, sum) {
  return t
    .set('card', 'name', `${card.name} | ${formatTime(sum)}`)
    .then(() => {
      return t.closePopup();
    });
}

// Format seconds as HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [
      {
        text: 'Sum Times',
        callback: function (t) {
          return t.card('id', 'name').then((card) => {
            return getComments(t, card).then((comments) => {
              const sum = sumTimes(comments);
              return updateCardTitle(t, card, sum);
            });
          });
        },
      },
    ];
  },
});

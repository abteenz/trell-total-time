const t = window.TrelloPowerUp.iframe();

t.render(async function () {
  // Get all the card comments
  const comments = await t.card('all').get('comments');
  
  // Filter comments with the format "00:00:00"
  const filteredComments = comments.filter(comment => /^\d{2}:\d{2}:\d{2}$/.test(comment.data.text));

  // Sum up the values of the filtered comments
  const sum = filteredComments.reduce((total, comment) => {
    const time = comment.data.text.split(':').map(Number);
    return total + (time[0] * 3600 + time[1] * 60 + time[2]);
  }, 0);

  // Get the current card title
  const cardTitle = await t.card('name').get('name');

  // Append the sum to the card title
  const newTitle = `${cardTitle} | ${new Date(sum * 1000).toISOString().substr(11, 8)}`;

  // Update the card title
  return t.card('name').set({ name: newTitle });
});

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { description, start_date, end_date } = event.queryStringParameters;

  const response = await fetch("https://api.track.toggl.com/reports/api/v3/workspace/6759737/search/time_entries/totals", {  
    method: "POST",  
    headers: {  
      "Content-Type": "application/json",  
      "Authorization": `Basic ${Buffer.from('<emaia93a1bdec1193f3e9da5036c4f0a2e5a:api_token').toString('base64')}`
    },
    body: JSON.stringify({
      "description": description,
      "start_date": start_date,
      "end_date": end_date
    })  
  });

  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}

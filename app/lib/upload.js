export const getChannel = (auth) => {
    const service = google.youtube("v3");
    service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
    }, function(err, response){
        if (err){
            console.log('The Api returned and error: ' + err)
            return new Response("Error accoured while fetching channels", {
                status: 404
            }) 
        }
        var channels = response.data.items;
        if (channels.length == 0) {
          console.log('No channel found.');
        } else {
          console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                      'it has %s views.',
                      channels[0].id,
                      channels[0].snippet.title,
                      channels[0].statistics.viewCount);
        }
    })
}


const authService = require('../services/google-auth-service');
const {google} = require('googleapis');

module.exports = {
    listEvents : (tokens) => {
        const authClient = authService.oauth2Client;
        console.log("authClient ", authClient);
        authClient.setCredentials(tokens);
        const calendarService = google.calendar({version: 'v3', auth : authService.oauth2Client});
        calendarService.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
          }, (err, res) => {
            if (err) return console.log('Calendar API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
              console.log('Upcoming 10 events:');
              events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
              });
            } else {
              console.log('No upcoming events found.');
            }
          });
    }
}
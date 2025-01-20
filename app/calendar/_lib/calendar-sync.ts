import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';

export class CalendarSync {
  private oauth2Client;

  constructor(credentials: Credentials) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    this.oauth2Client.setCredentials(credentials);
  }

  async syncWithGoogle() {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items?.map(event => ({
        title: event.summary,
        description: event.description,
        startDate: event.start?.dateTime || event.start?.date,
        endDate: event.end?.dateTime || event.end?.date,
        location: event.location,
        isAllDay: !event.start?.dateTime,
        externalId: event.id,
        source: 'google',
      }));
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
      throw error;
    }
  }

  async exportToGoogle(event: any) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    try {
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.title,
          description: event.description,
          location: event.location,
          start: {
            dateTime: event.isAllDay ? undefined : event.startDate,
            date: event.isAllDay ? event.startDate.split('T')[0] : undefined,
          },
          end: {
            dateTime: event.isAllDay ? undefined : event.endDate,
            date: event.isAllDay ? event.endDate.split('T')[0] : undefined,
          },
        },
      });
    } catch (error) {
      console.error('Failed to export to Google Calendar:', error);
      throw error;
    }
  }
} 
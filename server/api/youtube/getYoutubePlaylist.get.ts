import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  const { youtubeApiKey, featuredYoutubePlaylistId } = useRuntimeConfig();

  const youtube = google.youtube("v3");
  const auth = google.auth.fromAPIKey(youtubeApiKey);
  google.options({ auth });

  const playlistItems = await youtube.playlistItems.list({
    part: ["snippet"],
    playlistId: featuredYoutubePlaylistId,
    maxResults: 6,
  });

  return playlistItems.data.items;
});

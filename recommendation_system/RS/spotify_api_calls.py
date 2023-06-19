import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from collections import defaultdict
import pandas as pd

cid = "dc501330761143e68e6041bd6790e23e"
secret = "b1c97c529b2d4aa0b32b0434f0529507"
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=cid, client_secret=secret))


def search_song_name(song_name):
    results = sp.search(q='{}'.format(song_name), type='track', limit=10)
    if not results['tracks']['items']:
        return []
    else:
        return results['tracks']['items']


def search_song(song_id):
    track_data = defaultdict()
    results = sp.search(q='id: {}'.format(song_id), limit=1)
    if not results['tracks']['items']:
        return None

    results = results['tracks']['items'][0]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0]

    track_data['name'] = [results['name']]
    track_data['year'] = [int(results['release_date'].split('-')[0])]
    track_data['explicit'] = [int(results['explicit'])]
    track_data['duration_ms'] = [results['duration_ms']]

    for key, value in audio_features.items():
        track_data[key] = value

    return pd.DataFrame(track_data)


def get_user_top_songs():
    results = sp.current_user_top_tracks(limit=5, time_range='medium_term')
    if not results['tracks']['items']:
        return None

    return results['tracks']['items']
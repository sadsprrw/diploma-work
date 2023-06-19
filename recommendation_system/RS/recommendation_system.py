import numpy as np
import pandas as pd
from scipy.spatial.distance import cdist

from RS.spotify_api_calls import search_song_name, search_song, get_user_top_songs

from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline


authorized = False
number_cols = [
    'danceability',
    'energy',
    'key',
    'loudness',
    'mode',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo',
    'duration_ms',
    'explicit',
    'year'
]


def get_song_data(song, spotify_data):
    try:
        track_data = spotify_data[(spotify_data['id'] == song['id'])].iloc[0]
        return track_data
    except IndexError:
        return search_song(song['id'])


def get_mean_vector(song_list, spotify_data):
    song_vectors = []

    for song in song_list:
        track_data = get_song_data(song, spotify_data)
        if track_data is None:
            print('Error: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = track_data[number_cols].values
        song_vectors.append(song_vector)

    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)


def search_song(song_name):
    return search_song_name(song_name)


class RecommendationGenerator:

    def __init__(self):
        song_data = pd.read_csv("RS/data/tracks_full.csv")
        self.song_data = song_data.drop(['Unnamed: 0', 'time_signature'], axis=1)
        self.song_cluster_pipeline = Pipeline([('scaler', StandardScaler())], verbose=False)

        X = self.song_data.select_dtypes(np.number)
        self.song_cluster_pipeline.fit(X)

    def recommend_songs(self, song_list, n_songs=30):
        global authorized
        song_df_dict = pd.DataFrame(song_list)
        if authorized:
            user_song_list = pd.DataFrame(get_user_top_songs())
            song_list = [song_list, user_song_list]
            song_df_dict = pd.concat([song_df_dict, user_song_list])

        song_center = get_mean_vector(song_list, self.song_data)

        scaler = self.song_cluster_pipeline.steps[0][1]
        scaled_data = scaler.transform(self.song_data[number_cols])
        scaled_song_center = scaler.transform(song_center.reshape(1, -1))

        distances = cdist(scaled_song_center, scaled_data, 'euclidean')
        index = list(np.argsort(distances)[:, :n_songs][0])

        rec_songs = self.song_data.iloc[index]
        rec_songs = rec_songs[~rec_songs['name'].isin(song_df_dict['name'])]
        return rec_songs.to_dict(orient='records')

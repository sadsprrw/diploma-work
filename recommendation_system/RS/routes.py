import logging
from fastapi import APIRouter
from pydantic import BaseModel

from RS.recommendation_system import RecommendationGenerator, search_song

router = APIRouter()
rs = RecommendationGenerator()
logging.basicConfig(format='%(process)d\t%(threadName)s\t%(asctime)s\t%(levelname)s:\t%(message)s', level=logging.INFO)


class SongList(BaseModel):
    song_list: list


@router.post("/recommend")
async def recommend(data: SongList):
    result = rs.recommend_songs(data.song_list)
    return {"data": result}


@router.post("/search")
async def search(song_name):
    result = search_song(song_name)
    return {"data": result}

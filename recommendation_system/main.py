import logging

from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

import RS.routes as routes

logging.basicConfig(format='%(process)d\t%(threadName)s\t%(asctime)s\t%(levelname)s:\t%(message)s', level=logging.INFO)

app = FastAPI(
    middleware=[
        Middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*']),
    ]
)


@app.get("/")
def health_check():
    return {"success": True}


# routers
app.include_router(routes.router, prefix="/v1")



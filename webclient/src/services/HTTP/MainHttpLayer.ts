import { HttpLayer } from '@/services/HTTP/HttpLayer';


export default class MainHTTPLayer extends HttpLayer {
    constructor() {
        super();
    }

    async searchSong(songName: string) {
        return await this.POST(`${process.env.VUE_APP_BACKEND_URL}/v1/search?song_name=${songName}`, {});
    }

    async recommendSong(song_list: any[]) {
        return await this.POST(`${process.env.VUE_APP_BACKEND_URL}/v1/recommend`, {
            song_list
        });
    }
}
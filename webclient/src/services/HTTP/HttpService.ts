import MainHTTPLayer from "@/services/HTTP/MainHttpLayer";

export class HttpService {
    public main: MainHTTPLayer;

    constructor() {
        this.main = new MainHTTPLayer();
    }
}

const HttpServiceInstance = new HttpService();

export default HttpServiceInstance;
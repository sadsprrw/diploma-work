import axios, { AxiosRequestConfig, CancelToken } from 'axios';


export abstract class HttpLayer {
    protected constructor() {

    }

    get config() : AxiosRequestConfig {
        return {
            headers: {
                "Authorization": `Bearer `
            }
        }
    }

    // @ts-ignore
    protected async POST<T>(url: string, data: any, cancelToken: CancelToken = null, errorHandler = (e: Error) => this.notifyError(e.message)): Promise<T> {
        try {
            // return (await axios.post(url, data, this.config)).data as T;
            return (await axios({
                method: 'post',
                url,
                data,
                maxContentLength: 100000000,
                maxBodyLength: 1000000000,
                cancelToken: cancelToken,
            })).data as T;
        } catch (e: any) {
            // @ts-ignore
            if (!cancelToken || cancelToken.reason.message !== 'cancelled') {
                errorHandler(e);
            }
            throw e;
        }
    }

    // @ts-ignore
    protected async GET<T>(url: string, params: Record<string, any> = null, errorHandler = (e: Error) => this.notifyError(e.message)): Promise<T> {
        try {
            return (await axios.get(url, { ...this.config, params })).data as T;
        } catch (e: any) {
            errorHandler(e);
        }
    }

    protected notifyError(message: string, title: string = 'HTTP error') {
        console.error(`${title}: ${message}`);
    }
}
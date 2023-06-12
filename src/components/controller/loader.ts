import { IDrawNews } from '../view/appView';

enum Errors {
    AutError = 401,
    NotFoundError = 404,
}

enum Methods {
    GET,
    PUT,
    POST
}

type Method = keyof typeof Methods;

interface IGetResp {
    endpoint: string;
    options?: { [apiKey: string]: string };
}

interface ICallback<T> {
    (data: T | IDrawNews): void;
}

class Loader {
    baseLink: string;
    options: { [apiKey: string]: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint = '', options = {} }: IGetResp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === Errors.AutError || res.status === Errors.NotFoundError)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: { [apiKey: string]: string }, endpoint: string): string {
        const urlOptions: { [apiKey: string]: string } = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: Method, endpoint: string, callback: ICallback<T | IDrawNews>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T | IDrawNews) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
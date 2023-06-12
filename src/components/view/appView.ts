import News, { INewsData } from './news/news';
import Sources, { ISourcesData } from './sources/sources';

type ISourcesDataPick = Pick<ISourcesData, 'id' | 'name'>;

export interface IDrawSources {
    sources: ISourcesDataPick[];
}

export interface IDrawNews {
    articles: INewsData[];
}

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: Partial<IDrawNews>) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: Readonly<IDrawSources>) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

import './sources.css';

export interface ISourcesData {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

class Sources {
    public draw(data: ISourcesData[]): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        data.forEach((item: ISourcesData): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;

            sourceItemName.textContent = item.name as string;
            sourceItem.setAttribute('data-source-id', item.id as string);
            fragment.append(sourceClone);
        });
        const sources = document.querySelector('.sources') as HTMLElement;
        sources.append(fragment);
    }
}

export default Sources;


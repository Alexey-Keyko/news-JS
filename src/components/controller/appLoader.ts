import Loader from './loader';
import { URL } from '../../constants';
import { API_KEY } from '../../constants';

class AppLoader extends Loader {
    constructor() {
        super(URL, {
            apiKey: API_KEY, 
        });
    }
}

export default AppLoader;


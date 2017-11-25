import {Business} from './business.model';
import { SearchFacet } from './search-facet';

export class SearchVO {

    public searchResults : Business[] = [];
    public facets : SearchFacet[] = [];
}
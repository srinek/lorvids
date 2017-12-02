import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable'
import {Logger} from './logger.service';
import {Business} from '../model/business.model';
import {staff} from '../test-data/test-data';
import { environment } from '../../environments/environment';
import { SearchVO } from '../model/search-vo';
import { SearchFacet } from '../model/search-facet';

@Injectable()
export class SearchService{

    searchUrl : string = environment.appurl;
    searchEndpoint : string = "search";
    facetEndpoint : string = "facetfilter";

    constructor( private http : Http,
                 private logger : Logger){

    }

    public invokeSearch(searchTerm : string) : Observable<SearchVO>{
        this.logger.log("search invoked "+this.searchUrl + " search term "+searchTerm);
        
        return this.http.get(this.searchUrl+this.searchEndpoint+"?searchTerm="+searchTerm)
            .map((response : Response) => {
               return this.parseESResponse(response);
           }
       )
       .catch(
           (error: Response) => {
             return Observable.throw(error);
           }
        );
    }

    public facetFilter(searchTerm : string, facetMap: Map<string, string[]>) : Observable<SearchVO>{
        console.log("search invoked ", this.searchUrl, searchTerm, facetMap);
        //let data : object[] = [];
        let data : object = {};
        facetMap.forEach((v, k) => {
            console.log(v, k);
            //data.push({key : k, values : v});
            data = {key : k, values : v};
        });
        console.log(data);
        return this.http.post(this.searchUrl+this.facetEndpoint+"?searchTerm="+searchTerm, 
        data).map( (response : Response) => {
                    return this.parseESResponse(response);
                }
                                        
        ).catch(
            (error: Response) => {
              return Observable.throw(error);
            }
        ); 
        //return null;
    }

    private parseESResponse(response : Response) : SearchVO {
        var retVo = new SearchVO();
        var businessList : Business[] = [];
        for(const hit of response.json().hits.hits){
            var business = new Business(hit._source);
            business.imageurl = "../../assets/trendy_looks.jpg";
            business.rating = [0 , 0 , 0 ,0 ];
            businessList[businessList.length] = business;
        }
        retVo.searchResults = businessList;
        if(response.json().aggregations){
            var langAggrs = response.json().aggregations.languages.languages.buckets;
            if(langAggrs.length > 0){
                var langFacet = new SearchFacet("staff.languages");
                for(const langAggr of langAggrs){
                    langFacet.addValue(langAggr.key, langAggr.doc_count);
                }
                retVo.facets.push(langFacet);
            }
            var genderAggrs = response.json().aggregations.gender.gender.buckets;
            if(genderAggrs.length > 0){
                var genderFacet = new SearchFacet("staff.gender");
                for(const genderAggr of genderAggrs){
                    genderFacet.addValue(genderAggr.key, genderAggr.doc_count);
                }
                retVo.facets.push(genderFacet);
            }
            var categories = response.json().aggregations.categories.buckets;
            if(categories.length > 0){
                var catFacet = new SearchFacet("Categories");
                for(const catAggr of categories){
                    catFacet.addValue(catAggr.key, catAggr.doc_count);
                }
                retVo.facets.push(catFacet);
            }
        }   
        return retVo;
    }

}
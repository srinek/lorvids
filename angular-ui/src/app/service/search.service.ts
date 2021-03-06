import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Logger} from './logger.service';
import {Business} from '../model/business.model';
import {staff} from '../test-data/test-data';
import { environment } from '../../environments/environment';
import { SearchVO } from '../model/search-vo';
import { SearchFacet } from '../model/search-facet';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService{

    searchUrl : string = environment.appurl;
    searchEndpoint : string = "search";
    facetEndpoint : string = "facetfilter";

    constructor( private http : HttpClient,
                 private logger : Logger){

    }

    public invokeSearch(searchTerm : string, prop: string) : Observable<SearchVO>{
        //this.logger.log("search invoked "+this.searchUrl + " search term "+searchTerm);
        
       return this.http.get(this.searchUrl+this.searchEndpoint+"?searchTerm="+searchTerm+"&_p="+prop)
            .map((response : any) => {
               return this.parseESResponse(response);
           }
       )
       .catch(
           (error: any) => {
             return Observable.throw(error);
           }
        );
    }

    public facetFilter(searchTerm : string, prop: string, facetMap: Map<string, string[]>) : Observable<SearchVO>{
        //console.log("search invoked ", this.searchUrl, searchTerm, facetMap);
        //let data : object[] = [];
        let data : object = {};
        facetMap.forEach((v, k) => {
            //console.log(v, k);
            //data.push({key : k, values : v});
            data = {key : k, values : v};
        });
        //console.log(data);
        return this.http.post(this.searchUrl+this.facetEndpoint+"?searchTerm="+searchTerm+"&_p="+prop, 
        data).map( (response : any) => {
                    return this.parseESResponse(response);
                }
        ).catch(
            (error: any) => {
              return Observable.throw(error);
            }
        ); 
        //return null;
    }

    private parseESResponse(response : any) : SearchVO {
        var retVo = new SearchVO();
        var businessList : Business[] = [];
        for(const hit of response.hits.hits){
            var business = new Business(hit._source);
            business.rating = [0 , 0 , 0 ,0 ];
            businessList[businessList.length] = business;
        }
        retVo.searchResults = businessList;
        if(response.aggregations){
            var langAggrs = response.aggregations.languages.languages.buckets;
            if(langAggrs.length > 0){
                var langFacet = new SearchFacet("staff.languages");
                for(const langAggr of langAggrs){
                    langFacet.addValue(langAggr.key, langAggr.doc_count);
                }
                retVo.facets.push(langFacet);
            }
            var genderAggrs = response.aggregations.gender.gender.buckets;
            if(genderAggrs.length > 0){
                var genderFacet = new SearchFacet("staff.gender");
                for(const genderAggr of genderAggrs){
                    genderFacet.addValue(genderAggr.key, genderAggr.doc_count);
                }
                retVo.facets.push(genderFacet);
            }
            var categories = response.aggregations.categories.buckets;
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
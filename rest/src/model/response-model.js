'use strict'

class ResponseModel {
    constructor(src){
        this.totalHits = 0;
        this.hits = [];

        if(src){
            this.map(src);
        }
    }

    map(src){
        let self = this;
        self.totalHits = src.hits.total;
        self.hits = src.hits.hits.map(element => element._source);
    }
}

module.exports = ResponseModel; 
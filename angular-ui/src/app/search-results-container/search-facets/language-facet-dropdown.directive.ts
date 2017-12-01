import { Directive, HostListener, HostBinding } from "@angular/core";


@Directive({
   selector : "[showHideLangFacet]"
})

export class LanguageFacetDropDownDirective {

    @HostBinding('class.d-none') showhide = true;

    @HostListener('facetClicked') toggleDisplay(){
        console.log("directive called");
        this.showhide = !this.showhide;
    }

}
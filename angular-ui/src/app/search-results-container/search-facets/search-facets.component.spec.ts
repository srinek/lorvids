import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFacetsComponent } from './search-facets.component';

describe('SearchFacetsComponent', () => {
  let component: SearchFacetsComponent;
  let fixture: ComponentFixture<SearchFacetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFacetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFotosComponent } from './list-fotos.component';

describe('ListFotosComponent', () => {
  let component: ListFotosComponent;
  let fixture: ComponentFixture<ListFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

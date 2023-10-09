import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFotosComponent } from './create-fotos.component';

describe('CreateFotosComponent', () => {
  let component: CreateFotosComponent;
  let fixture: ComponentFixture<CreateFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

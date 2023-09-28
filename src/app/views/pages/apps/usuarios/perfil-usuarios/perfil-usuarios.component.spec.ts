import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuariosComponent } from './perfil-usuarios.component';

describe('PerfilUsuariosComponent', () => {
  let component: PerfilUsuariosComponent;
  let fixture: ComponentFixture<PerfilUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

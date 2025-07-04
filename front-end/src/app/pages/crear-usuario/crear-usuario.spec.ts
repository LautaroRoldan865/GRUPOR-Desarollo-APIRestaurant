import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuario } from './crear-usuario';

describe('CrearUsuario', () => {
  let component: CrearUsuario;
  let fixture: ComponentFixture<CrearUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

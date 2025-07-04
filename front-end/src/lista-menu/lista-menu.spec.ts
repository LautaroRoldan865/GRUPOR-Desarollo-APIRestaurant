import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMenu } from './lista-menu';

describe('ListaMenu', () => {
  let component: ListaMenu;
  let fixture: ComponentFixture<ListaMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crearmenu } from './crearmenu';

describe('CrearmenuComponent', () => {
  let component: Crearmenu;
  let fixture: ComponentFixture<Crearmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crearmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crearmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

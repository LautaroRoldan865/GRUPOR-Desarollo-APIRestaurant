import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menuitemedit } from './menuitemedit';

describe('Menuitemedit', () => {
  let component: Menuitemedit;
  let fixture: ComponentFixture<Menuitemedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menuitemedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menuitemedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeMovesComponent } from './three-moves.component';

describe('ThreeMovesComponent', () => {
  let component: ThreeMovesComponent;
  let fixture: ComponentFixture<ThreeMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeMovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

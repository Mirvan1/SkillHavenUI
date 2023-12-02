import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillerCardComponent } from './skiller-card.component';

describe('SkillerCardComponent', () => {
  let component: SkillerCardComponent;
  let fixture: ComponentFixture<SkillerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

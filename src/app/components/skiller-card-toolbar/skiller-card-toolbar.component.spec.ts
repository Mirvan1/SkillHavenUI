import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillerCardToolbarComponent } from './skiller-card-toolbar.component';

describe('SkillerCardToolbarComponent', () => {
  let component: SkillerCardToolbarComponent;
  let fixture: ComponentFixture<SkillerCardToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillerCardToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillerCardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

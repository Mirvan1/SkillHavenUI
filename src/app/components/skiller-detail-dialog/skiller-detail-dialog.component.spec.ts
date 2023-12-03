import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillerDetailDialogComponent } from './skiller-detail-dialog.component';

describe('SkillerDetailDialogComponent', () => {
  let component: SkillerDetailDialogComponent;
  let fixture: ComponentFixture<SkillerDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillerDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillerDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

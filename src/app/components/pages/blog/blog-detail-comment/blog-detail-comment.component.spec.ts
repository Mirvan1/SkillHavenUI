import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailCommentComponent } from './blog-detail-comment.component';

describe('BlogDetailCommentComponent', () => {
  let component: BlogDetailCommentComponent;
  let fixture: ComponentFixture<BlogDetailCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDetailCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

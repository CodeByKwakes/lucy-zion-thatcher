import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatLayoutComponent } from './feat-layout.component';

describe('FeatLayoutComponent', () => {
  let component: FeatLayoutComponent;
  let fixture: ComponentFixture<FeatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

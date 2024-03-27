import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;
  beforeEach(() => {
    pipe = new SafeHtmlPipe();
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should sanitize and trust the provided HTML', () => {
    // Arrange
    const unsafeHtml = '<script>alert("Unsafe script")</script>';
    // const sanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();

    // Act
    const result = pipe.transform(unsafeHtml);

    // Assert
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(unsafeHtml);
    expect(result.toString()).toContain(
      'SafeValue must use [property]=binding'
    );
  });

  it('should return safe HTML when provided with safe HTML', () => {
    // Arrange
    const safeHtml = '<p>Safe HTML</p>';
    // const sanitizer: DomSanitizer = TestBed.inject(DomSanitizer);
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();

    // Act
    const result = pipe.transform(safeHtml);

    // Assert
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(safeHtml);
    expect(result.toString()).toEqual(safeHtml);
  });
});

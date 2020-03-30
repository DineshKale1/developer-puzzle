import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { APP_CONSTANT } from './constant/app.constant';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  describe('AppComponent', () => {
    it('should create the app', () => {
      expect(app).toBeTruthy();
    });

    it(`should have as title 'stocks'`, () => {
      expect(app.title).toEqual(APP_CONSTANT.TITLE);
    });

    it('should render title in a h1 tag', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(
        APP_CONSTANT.TITLE
      );
    });
  });
});

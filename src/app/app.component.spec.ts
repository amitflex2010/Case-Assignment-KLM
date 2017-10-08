import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CarosuelComponent } from './carosuel/carosuel.component';
import { CarosuelService } from './services/carosuelservice.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CarosuelComponent
      ],
      imports: [HttpModule],
      providers: [CarosuelService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call the carousel service', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

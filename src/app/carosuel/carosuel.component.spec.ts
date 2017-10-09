import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DebugElement } from '@angular/core';
import { CarosuelComponent } from './carosuel.component';
import { CarosuelService } from '../services/carosuelservice.service';


describe('CarosuelComponent', () => {
  let component: CarosuelComponent;
  let fixture: ComponentFixture<CarosuelComponent>;
  let carosuelService: CarosuelService;
  let debugElement: DebugElement;
  const slideData = {'url': '/carousel/home1.jpg'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarosuelComponent ],
      imports: [HttpModule],
      providers: [CarosuelService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarosuelComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    carosuelService = debugElement.injector.get(CarosuelService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service to laod the data', fakeAsync(() => {
    const response = [{
      id: 3,
      text: 'Round trip price at heavy discount.',
      picurl: '/carousel/home3.jpg'
    }];
    spyOn(component, 'showSlides');
    spyOn(carosuelService, 'getCarosuelData').and.returnValue(Observable.of(response));
    tick(5000);
    fixture.detectChanges();
    expect(component.carouselData[0].id).toEqual(3);
  }));

  it('showslides() method should set the current slide', () => {
    component.carouselData = [{
      id: 3,
      text: 'Round trip price at heavy discount.',
      picurl: '/carousel/home3.jpg'
    }];

  component.autoPlay = false;
  component.slideIndex = 0;
  component.showSlides(0);
  expect(component.current).toBeDefined();
  });

  it('showNextSlides() should show the next slide', () => {
    component.carouselData = [{
      id: '3',
      text: 'Round trip price at heavy discount.',
      picurl: '/carousel/home3.jpg'
    },
    {
      id: '4',
      text: 'There are 101 reason for th city trip.',
      picurl: '/carousel/home4.jpg'
    }];
    component.autoPlay = false;
    component.slideIndex = 0;
    component.current = {};
    component.showSlides(0);
    expect((component.current as any).id).toBe('3');
    component.showNextSlides();
    expect((component.current as any).id).toBe('4');

  });

  it('showPrevSlides() should show the previous slide', () => {
    component.carouselData = [{
      id: '3',
      text: 'Round trip price at heavy discount.',
      picurl: '/carousel/home3.jpg'
    },
    {
      id: '4',
      text: 'There are 101 reason for th city trip.',
      picurl: '/carousel/home4.jpg'
    }];
    component.autoPlay = false;
    component.slideIndex = 1;
    component.current = {};
    component.showSlides(1);
    expect((component.current as any).id).toBe('4');
    component.showPrevSlides();
    expect((component.current as any).id).toBe('3');

  });
});

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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service to laod the data', fakeAsync(() => {
    const response = {id: 3,
    text: 'Round trip price at heavy discount.',
    picurl: '/carousel/home3.jpg'};
    spyOn(component, 'showSlides').and.callThrough();
    spyOn(carosuelService, 'fetchSlideData').and.returnValue(Observable.of(response));
    component.initCarosuel();
    tick(5000);
    fixture.detectChanges();
    console.log(component.carouselData);
    expect(component.carouselData).toEqual(3);
   /* fixture.whenStable().then(() => {
     
      
    });*/

  }));


});

import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  ConnectionBackend,
  ResponseType
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CarosuelService } from './carosuelservice.service';

class MockError extends Response implements Error {
  name: any;
  message: any;
}

describe('Service:BookingService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CarosuelService, ConnectionBackend,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });


it('should be created', inject([CarosuelService], (service) => {
    expect(service).toBeTruthy();
  }));

it('should retrieve all results',
  inject([CarosuelService, XHRBackend], fakeAsync((carosuelService: CarosuelService, mockBackend: MockBackend) => {

    const mockResponse = {
      id: '1',
      text: 'There are 101 reason for th city trip.',
      picurl: '/carousel/home1.jpg'
  };

    mockBackend.connections.subscribe(res => {
      const response = new ResponseOptions({body: JSON.stringify(mockResponse)});
      res.mockRespond(new Response(response));
    });
    tick();
    carosuelService.fetchSlideData().subscribe((response) => {
      expect(response.picurl).toContain('home1');
    });
  }))
);

it('should handle server errors',
inject([CarosuelService, XHRBackend], fakeAsync((carosuelService: CarosuelService, mockBackend: MockBackend) => {

      const opts = {type: ResponseType.Error, status: 404, statusText: 'Some Error'};
      const responseOpts = new ResponseOptions(opts);
      mockBackend.connections.subscribe((res: MockConnection) => {
      res.mockError(new MockError(responseOpts));
      });
      tick();
      carosuelService.fetchSlideData().subscribe((response) => {
        expect(response).toContain('home1');
      },
    error => {expect(error.statusCode).toEqual(404);
            expect(error.message).toEqual('Some Error'); });
})));
});

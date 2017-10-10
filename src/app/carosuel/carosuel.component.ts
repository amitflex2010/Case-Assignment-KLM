import { Component, OnInit, HostListener } from '@angular/core';
import { CarosuelService } from '../services/carosuelservice.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-carosuel',
  templateUrl: './carosuel.component.html',
  styleUrls: ['./carosuel.component.sass']
})
export class CarosuelComponent implements OnInit {

  carouselData: any;
  controlsVisible = 'hidden';
  slideIndex = 0;
  current = {};
  autoPlay = true;
  intervalTime = 2000;
  interval: any;

  maxMobilewidth: Number = 425;
  maxTabletwidth: Number = 768;

  private subject = new Subject<any>();

  constructor(private carosuelservice: CarosuelService) { }

  /**
   * Listen to the window resize event and set the visiblity of controls
   * @param {resize'} 'window    window resize event
   * @param {[event]}  '$event']) onWindowResize( event object
   * @memberof CarosuelComponent
   */
  @HostListener('window:resize', ['$event']) onWindowResize() {

    if (window.innerWidth < this.maxTabletwidth) {
      this.controlsVisible = 'visible';
    }else {
      this.controlsVisible = 'hidden';
    }
    this.subject.next({ screensize: window.innerWidth });
  }

  ngOnInit() {
    this.initCarosuel();

    this.subject.asObservable().map((value) => value)
    .subscribe((val) => this.setControlValue(val));
  }

  /**
   * Initialize the carosuel data by calliing the data service and setting the value for slide show.
   * @memberof CarosuelComponent
   */
  initCarosuel() {
    this.carosuelservice.getCarosuelData()
    .subscribe(data => {
       this.carouselData = data;
       this.showSlides(this.slideIndex);
       this.controlsVisible = 'visible';
    },
    error => {
      console.log(error);
    });
  }

  /**
   * Set the controls visibility as the value received.
   * @param {[number]} val screen size object.
   * @memberof CarosuelComponent
   */
  setControlValue(val) {
    if (val.screensize >= this.maxMobilewidth && val.screensize <= this.maxTabletwidth) {
      this.controlsVisible = 'visible';
    }
  }

   /**
   * Display the image in the slide by setting current slide
   * @param {[number]} n current index of the slide
   * @memberof CarosuelComponent
   */
  showSlides(nCount) {
    if (nCount > this.carouselData.length - 1) { this.slideIndex = 0; }
    if (nCount < 0) { this.slideIndex = this.carouselData.length - 1; }
    this.current = this.carouselData[this.slideIndex];

    if (this.autoPlay) {
      clearInterval(this.interval);
      this.autoPlaySlides(this.intervalTime);
    }
  }

  /**
   * Handler for toggle pause/play button.
   * @memberof CarosuelComponent
   */
  playPause() {
    this.autoPlay = !this.autoPlay;
  }

  /**
   * Show the slide when clicking on bullet indicator on carousel
   * @param {[number]} n Index of the slide in data array
   * @memberof CarosuelComponent
   */
  showCurrentSlide(n) {
    if (window.innerWidth <= this.maxMobilewidth) {  // disble click on bullet in mobile device
      return;
    }

    this.showSlides(this.slideIndex = n);
  }

 /**
  * Setup the auto play for the carousel
  * @param {[number]} ms Time interval in milliseconds
  * @memberof CarosuelComponent
  */
  autoPlaySlides(ms) {
    this.autoPlay = true;
    this.intervalTime = ms;
    this.slideIndex++ ;
    this.interval = setInterval(this.showSlides.bind(this, this.slideIndex), ms);
  }

/**
* To Play the sllideShow.
* @memberof CarosuelComponent
*/

  playSlideShow() {
    if (!this.autoPlay) {
        this.autoPlay = true;
        this.resetTimer();
    }
  this.autoPlaySlides(this.intervalTime);
}

/** To Pause the slide show
 * @memberof CarosuelComponent
*/

  pauseSlideShow() {
    if (this.autoPlay) {
        this.autoPlay = false;
        this.resetTimer();
    }
}

/** To reset the auto play timer
 * @memberof CarosuelComponent
*/

  resetTimer() {
  if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
  }
}

/**
* Moves to previous slide
* @memberof CarosuelComponent
*/
  showPrevSlides() {
    if (this.autoPlay) {
      this.resetTimer();
      this.showSlides(this.slideIndex -= 2);
    } else {
      this.showSlides(this.slideIndex -= 1);
    }
  }

  /**
  * Moves to next slide
  * @memberof CarosuelComponent
  */
  showNextSlides() {
    this.showSlides(this.slideIndex += 1);
  }

   /**
   * Handler for mouse enter event which makes control visible on large screen
   * @memberof CarosuelComponent
   */
  onMouseEnter() {
    if (window.innerWidth <= this.maxTabletwidth) {
      return;
    }
    this.pauseSlideShow();
    this.controlsVisible = 'visible';
}

   /**
   * Handler for mouse leave event which makes control hidden on large screen
   * @memberof CarosuelComponent
   */
  onMouseLeave() {
    if (window.innerWidth <= this.maxTabletwidth) {
      return;
    }
    this.playSlideShow();
    this.controlsVisible = 'hidden';
  }
}

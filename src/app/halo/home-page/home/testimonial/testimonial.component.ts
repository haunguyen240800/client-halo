import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript(){
    $(".testimonial-carousel-2").owlCarousel({
      loop: !0,
      items: 5,
      nav: 1,
      dots: !0,
      smartSpeed: 700,
      autoplay: !1,
      margin: 30,
      navText: [
        '<i class="la la-chevron-left"></i>',
        '<i class="la la-chevron-right"></i>',
      ],
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        991: { items: 3 },
        992: { items: 3 },
        1200: { items: 3 },
      },
    })
  }
}

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript(){
    $(".team-carousel").owlCarousel({
      loop: !0,
      items: 3,
      nav: !0,
      dots: !0,
      smartSpeed: 500,
      autoplay: !1,
      margin: 30,
      navText: [
        "<i class='la la-angle-left'></i>",
        "<i class='la la-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        991: { items: 2 },
        992: { items: 3 },
      },
    });

    $("testimonial-carousel").owlCarousel({
        loop: !0,
        items: 3,
        nav: !1,
        dots: !0,
        smartSpeed: 700,
        autoplay: !1,
        margin: 30,
        responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 } },
    });

  }
}

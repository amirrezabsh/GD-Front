import { Expansion } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  workshopsArray: any = [];
  workshopsActive: any = [];
  iconW: any = [];
  workshopsDate: any = [];
  talksArray: any = [];
  talksActive: any = [];
  iconT: any = [];
  talksDate: any = [];
  m: string = '';
  time = 10000;
  talksLevel: any = [];
  workshopsLevel: any = [];
  talkPresenters: any = [];
  talksPresenters: any = [];
  workshopPresenters: any = [];
  workshopsPresenters: any = [];
  noShadow = 'noshadow';
  userName: string = "";
  constructor(public publicservice: PublicService, public router: Router) {
    publicservice.getTalks().then((r) => {
      console.log(r);
      this.talksArray = r.data;
      // console.log(this.talksArray)
      for (let index = 0; index < this.talksArray.length; index++) {
        this.talksActive[index] = 'deactive'
        this.iconT[index] = 'keyboard_arrow_down'
        this.m = moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        this.talksDate[index] = moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(this.talksArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YY');
        switch (this.talksArray[index].level) {
          case 'BEGINNER':
            this.talksLevel[index] = 'مبتدی';
            break;
          case 'EXPERT':
            this.talksLevel[index] = 'پیشرفته';
            break;
          case 'INTERMEDIATE':
            this.talksLevel[index] = 'متوسط';
            break;
          default:
            this.talksLevel[index] = 'unknown';
            break;
        }
      }
    })
    publicservice.getWorkshops().then((r) => {
      // console.log(r);
      this.workshopsArray = r.data;
      for (let index = 0; index < this.workshopsArray.length; index++) {
        this.workshopsActive[index] = 'deactive'
        this.iconW[index] = 'keyboard_arrow_down'
        this.m = moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        this.workshopsDate[index] = moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('dddd') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('DD') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('MMMM') + " " + moment(this.workshopsArray[index].date.split('T', 2)[0], 'YYYY-MM-DD').locale('fa').format('YY');
        switch (this.workshopsArray[index].level) {
          case 'BEGINNER':
            this.workshopsLevel[index] = 'مبتدی';
            break;
          case 'EXPERT':
            this.workshopsLevel[index] = 'پیشرفته';
            break;
          case 'INTERMEDIATE':
            this.workshopsLevel[index] = 'متوسط';
            break;
          default:
            this.workshopsLevel[index] = 'unknown';
            break;
        }
      }
      // router.events.subscribe(s => {
      //   if (s instanceof NavigationEnd) {
      //     const tree = router.parseUrl(router.url);
      //     if (tree.fragment) {
      //       const element = document.querySelector("#" + tree.fragment);
      //       if (element) { element.scrollIntoView(); }
      //     }
      //   }
      // });
    })
    setInterval(() => this.time = this.time - 1, 1000);
    if(publicservice.logedIn){
      publicservice.getUser().then((r)=>{
        this.userName = r.data.first_name;
      })
    }
    // console.log(this.talksPresenters);
    // console.log(this.workshopsPresenters);
  }

  ngOnInit(): void {

  }
  ngonviewinit(): void {

  }
  ngAfterViewInit(): void {
    // console.log(this.router.url);
    // console.log(this.router.url.split('#')[1]);
    if (this.router.url.split('#')[1] == 'schedule') {
      setTimeout((() => this.Schedule(document.getElementById('schedule'))), 200)
    }
    else if (this.router.url.split('#')[1] == 'talk') {
      setTimeout((() => this.Schedule(document.getElementById('talk'))), 100)
    }
    else if (this.router.url.split('#')[1] == 'workshop') {
      setTimeout((() => this.Schedule(document.getElementById('workshop'))), 100)
    }
    else if (this.router.url.split('#')[1] == 'footer') {
      setTimeout((() => this.Schedule(document.getElementById('footer'))), 100)
    }
    else if (this.router.url.split('#')[1] == 'home') {
      setTimeout((() => this.Schedule(document.getElementById('home'))), 100)
    }
  }
  Signup() {
    const navigationDetails2: string[] = ['signup'];
    this.router.navigate(navigationDetails2);
  }
  login(): void {
    const navigationDetails: string[] = ['login'];
    this.router.navigate(navigationDetails);
  }

  Dashboard() {
    this.router.navigate(['dashboard-event'], { fragment: 'dash' });
  }
  Workshop(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  Talk(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  Schedule(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  getMinute() {
    if (this.time <= 0) {
      return "00";
    }
    if ((this.time / 60) % 60 < 10) {
      return "0" + parseInt((this.time / 60) % 60 + "");
    }
    return parseInt((this.time / 60) % 60 + "");
  }
  getSecond() {
    if (this.time <= 0) {
      return "00";
    }
    if (this.time % 60 < 10) {
      return "0" + this.time % 60;
    }
    return this.time % 60;
  }
  getHour() {
    if (this.time <= 0) {
      return "0";
    }
    return parseInt(this.time / 3600 + "");
  }
  People() {
    this.router.navigate(['people'], { fragment: 'people' });
  }
  Rules() {
    this.router.navigate(['rules'], { fragment: 'rules' });
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  getNavClass() {
    return window.scrollY > 0 ? 'no-shadow' : '';
  }

}

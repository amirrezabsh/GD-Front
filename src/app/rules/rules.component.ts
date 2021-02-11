import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(public publicservice: PublicService, public router: Router) { 
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }

  ngOnInit(): void {
  }
  People(){
    this.router.navigate(['people']);
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
    this.router.navigate(['dashboard-event']);
  }
  Workshop() {
    this.router.navigate(['home'],{fragment:'workshop'});
  }
  Talk() {
    this.router.navigate(['home'],{fragment:'talk'});
  }
  Schedule() {
    this.router.navigate(['home'],{fragment:'schedule'});
  }
  Rules(){
    this.router.navigate(['rules']);
  }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import{ Router} from '@angular/router';
import { Observable } from 'rxjs';
import { PublicService } from '../public.service';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-dashboard-teams',
  templateUrl: './dashboard-teams.component.html',
  styleUrls: ['./dashboard-teams.component.scss']
})
export class DashboardTeamsComponent implements OnInit {
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private router : Router,public publicservice: PublicService) { 
    if(!publicservice.logedIn){
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  events(): void{
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }
  media(): void{
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  Home(){
    this.router.navigate(['home'],{fragment:'home'});
  }
  Teams(){
    this.router.navigate(['dashboard-teams']);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
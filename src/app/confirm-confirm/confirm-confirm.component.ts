import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
@Component({
  selector: 'app-confirm-confirm',
  templateUrl: './confirm-confirm.component.html',
  styleUrls: ['./confirm-confirm.component.scss']
})
export class ConfirmConfirmComponent implements OnInit {

  constructor(private router: Router, public publicservice: PublicService) {

   }

  ngOnInit(): void {
  }
  Dashboard() {
    this.publicservice.ActivateUser(this.router.url.split('/').pop()).then((r)=>{
      console.log(r);
      this.router.navigate(['login'], { fragment: 'login' });
    })
    
  }
}

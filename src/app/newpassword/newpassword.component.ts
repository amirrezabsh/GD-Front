import { Component, OnInit } from '@angular/core';
//import { NavigationEnd, Router } from '@angular/router';
import { PublicService } from '../public.service';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router , NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {
  hash: string = '';
  hide = true;
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  constructor(private router: Router, public publicservice: PublicService, public snackbar: MatSnackBar, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
  
    
    


  }
  ngAfterViewInit(): void {
    //var inputEmail = document.getElementById("inputEmail");
    //inputEmail.addEventListener("keyup", function (event) {
      // if (event.key == 'Enter') {
      //   event.preventDefault();
      // //  document.getElementById("loginButton").click();
      // }
   //})
    var inputPassword = document.getElementById("inputPassword");
    var inputPassword2 = document.getElementById("inputPassword2");

  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  newpassword() {
   
    if (this.publicservice.newPassword == this.publicservice.newPassword2 ) {
      this.route.queryParams.subscribe(params => {
        this.hash = params['code'];
      });
      this.publicservice.changepassword(this.hash+'/').then(r => {
        if (r.error == null) {
          console.log(r);
          //this.router.navigate(['home'])
        }
      })
   }
   else {
     // if (  window.innerWidth<992){
       this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'bottom',direction:'rtl'});
     // }
     // else{
     // this.snackbar.openFromComponent(ErrorDialogComponent,{duration:2000,data:'فیلد ها را پر کنید',panelClass:['snackbar'],verticalPosition:'top',direction:'rtl'});
     // }
   }
    
  }
}


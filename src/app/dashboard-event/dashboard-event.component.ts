import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../public.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
@Component({
  selector: 'app-dashboard-event',
  templateUrl: './dashboard-event.component.html',
  styleUrls: ['./dashboard-event.component.scss']
})
export class DashboardEventComponent implements OnInit {
  talks = 'deactive';
  fileToUpload: File = null;
  workshops = 'deactive';
  iconW = 'keyboard_arrow_down';
  iconT = 'keyboard_arrow_down';
  userName: string = "";
  isStaff: boolean;
  constructor(private router: Router, public publicservice: PublicService,public snackbar:MatSnackBar) {
    if (!publicservice.logedIn) {
      this.router.navigate(['login']);
    }
    else{
      publicservice.getUser().then((r)=>{
        this.userName = r.data.first_name;
        const image = document.getElementById('image') as HTMLImageElement;
        image.src = r.data.profile;
        this.isStaff = r.data.is_staff;
        console.log(image.src);
      });
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    if(this.router.url.split('#')[1] == 'dash'){
      setTimeout((()=>this.Schedule(document.getElementById('dash'))),200)
    }
  }
  Schedule(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  events(): void {
    const navigationDetails: string[] = ['dashboard-event'];
    this.router.navigate(navigationDetails);
  }
  media(): void {
    const navigationDetails2: string[] = ['dashboard-media'];
    this.router.navigate(navigationDetails2);
  }
  logOut() {
    this.publicservice.logedIn = false;
    localStorage.removeItem("Authorization");
    this.router.navigate(['home']);
  }
  Home() {
    this.router.navigate(['home'], { fragment: 'home' });
  }
  Teams() {
    this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    // this.router.navigate(['dashboard-teams']);
  }
  Cart() {
    this.router.navigate(['cart']);
  }
  Upload() {
    document.getElementById('imgUpload').click();
  }
  People() {
    this.router.navigate(['people'], { fragment: 'people' });
  }
  handleFileInput(imageInput: any) {
    const file = imageInput.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    // console.log(file); 
    this.publicservice.fileName = file.name;
    this.publicservice.file = file;
    this.publicservice.UpdateImage();
  }
  Enter(){
    this.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: 'این صفحه در دست ساخت است!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
  }
}

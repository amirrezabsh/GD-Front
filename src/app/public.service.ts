import { Injectable } from '@angular/core';
// import { User, Car, Service } from './models/Models'
import { Texts } from './models/Texts';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AppDialogComponentDialog } from './app-dialog/app-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component'
import { formatCurrency, HashLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';
import { SuccessDialogComponent } from '../app/success-dialog/success-dialog.component';
import { NavigationEnd, Router } from '@angular/router';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { BoundElementProperty } from '@angular/compiler';
import { NgZone } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public APICalls: any = {};
  public Authorization: string = "";
  public User: any = {};
  public ApiUrl: String = "https://gamecraft.ce.aut.ac.ir";
  // public ApiUrl: String = "http://127.0.0.1:8000";
  public Email: String = "";
  public PhoneNumber: String = "";
  public Password: String = "";
  public Name: String = "";
  Texts: Texts = new Texts();
  public Token: String = "";
  public logedIn: boolean = false;
  public fileName: string = "";
  public file: File;
  public isStaff: boolean;
  public userName: string = "";
  public hasError: boolean;
  public talkPk;
  public workshopPk;
  public discount_code: string = "";
  public newPassword: String = "";
  public newPassword2: String = "";
  
  Mockup() {



  }




  constructor(private http: Http, public dialog: MatDialog, public snackbar: MatSnackBar, private http2: HttpClient, public router: Router, private zone: NgZone) {
    this.Authorization = localStorage.getItem("Authorization");
    if (this.Authorization != null) {
      this.logedIn = true;
    }
    // this.dialog..PublicService=this;
    // this.Mockup();
    this.Texts.Init();
  }


  private extractData(res: Response, that: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }


    let body = res.json();
    // console.lo÷g(body);
    // if (body.message) {
    //   that.DisplaySuccessDialog(body.message);

    // }
    // if(body.error != null){
    //   if (window.innerWidth > 992) {
    //     that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: body.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    //   }
    //   else {
    //     that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: body.message, panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
    //   }
    //   return Promise.reject(body);
    // }
    if (body.error) {
      that.DisplayErrorDialog(body.message);
      Promise.reject(body.error);
    } else {
      return body || {};
    }

  }
  private extractData2(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = JSON.parse(error._body);//error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

  UpdateImage(): void {
    let uploadData = new FormData();
    uploadData.append("profile", this.file);
    this.APICalls.UpdateImage = true;
    let h = new HttpHeaders();
    h = h.set('Authorization', 'Bearer ' + this.Authorization);
    const req = new HttpRequest("PUT", this.ApiUrl + '/api/users/profile/update/', uploadData, { headers: h });
    this.http2.request(req).
      toPromise().
      then((r) => {
        // if (window.innerWidth > 992) {
        this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'عکس با موفقیت آپلود شد!', panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
        // }
        // else {
        // this.snackbar.openFromComponent(SuccessDialogComponent, { duration: 2000, data: 'عکس با موفقیت آپلود شد!', panelClass: ['snackbar'], verticalPosition: 'bottom', direction: 'rtl' });
        // }
        location.reload(true);
      })
      .catch(this.handleError);

  }
  checkDiscount(): Promise<any> {
    var that = this;
    this.APICalls.checkDiscount = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/coupon/' + this.discount_code.trim() + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.checkDiscount = false;
    }).catch(e => {
      this.APICalls.checkDiscount = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  SignUp(): Promise<any> {
    var that = this;
    this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "password": this.Password,
      "phone_number": this.PhoneNumber,
      "email": this.Email.toLowerCase(),
      "first_name": this.Name,
      "user_name": this.Email
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/users/sign_up/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.SignUp = false;
    }).catch(e => {
      this.APICalls.SignUp = false;

        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }
  changepassword(token: string): Promise<any> {
    var that = this;
    //this.APICalls.SignUp = true;
    let body = JSON.stringify({
      "password": this.newPassword,
      //"phone_number": this.PhoneNumber,
      //"email": this.Email.toLowerCase(),
      //"first_name": this.Name,
      //"user_name": this.Email
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.put(this.ApiUrl + '/api/activation/reset-pass/'+token, body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
     // this.APICalls.SignUp = false;
    }).catch(e => {
      // this.APICalls.SignUp = false;

        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }
  Login(): Promise<any> {
    var that = this;
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email.toLowerCase(),
      "password": this.Password,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/token/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      }
      else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
    });
    return ret;
  }
  sendmail(): Promise<any> {
    var that = this;
   // this.APICalls.Login = true;
    let body = JSON.stringify({
      "email": this.Email.toLowerCase(),
      
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/users/reset_pass/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      //this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      }
      else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['forgot']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }




  getTalks(): Promise<any> {
    var that = this;
    this.APICalls.getTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/talk/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getTalks = false;
    }).catch(e => {
      this.APICalls.getTalks = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }
  getWorkshops(): Promise<any> {
    var that = this;
    this.APICalls.getWorkshops = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/workshop/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getWorkshops = false;
    }).catch(e => {
      this.APICalls.getWorkshops = false;

      that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }
  getAvailableUsers(): Promise<any> {
    var that = this;
    this.APICalls.getUsers = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/users/available_list/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  getUser(): Promise<any> {
    var that = this;
    this.APICalls.getUsers = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/users/profile/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.getUsers = false;
    }).catch(e => {
      this.APICalls.getUsers = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  ActivateUser(token: string): Promise<any> {
    var that = this;
    this.APICalls.ActivateUser = true;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/activation/' + token, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.ActivateUser = false;
    }).catch(e => {
      this.APICalls.ActivateUser = false;
      this.hasError = true;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  EnrollTalk(): Promise<any> {
    var that = this;
    this.APICalls.EnrollTalk = true;
    let body = JSON.stringify({
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/talk/' + this.talkPk + '/enroll/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.EnrollTalk = false;
    }).catch(e => {
      this.APICalls.EnrollTalk = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }

  EnrollWorkshop(): Promise<any> {
    var that = this;
    this.APICalls.EnrollWorkshop = true;
    let body = JSON.stringify({
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/workshop/' + this.workshopPk + '/enroll/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);

    ret.then(r => {
      this.APICalls.EnrollWorkshop = false;
    }).catch(e => {
      this.APICalls.EnrollWorkshop = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  getUserCart(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/service/cart/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  getUserDashboard(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/service/dashboard/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  deleteCartItem(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/service/' + this.workshopPk + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  deleteTalk(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.delete(this.ApiUrl + '/api/service/' + this.talkPk + '/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  getUsersCount(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/users/count/', options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      // if (window.innerWidth > 992) {
      that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });

    });
    return ret;
  }

  getPaymentLink(): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let body = JSON.stringify({
      'coupon': this.discount_code.trim(),
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/service/payment/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  createTeam(emails): Promise<any> {
    var that = this;
    this.APICalls.Login = true;
    let body = JSON.stringify({
      "name": this.Name,
      "emails": emails,
    });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.post(this.ApiUrl + '/api/team/create_team/', body, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.Login = false;
      if (r.error == null || r.error == undefined) {
        this.Authorization = r.access;
        localStorage.setItem("Authorization", this.Authorization);
        this.logedIn = true;
      }
      else {

      }
    }).catch(e => {
      this.APICalls.Login = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  }
  getTeam(pk): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.Authorization
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/team/' + pk + "/", options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  };
  enrollTeam(mid,tid): Promise<any> {
    var that = this;
    this.APICalls.getUserTalks = true;
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });
    let ret: Promise<any> = this.http.get(this.ApiUrl + '/api/team/join/' + tid + "/"+mid, options)
      .toPromise()
      .then((r) => this.extractData(r, this))
      .catch(this.handleError);
    ret.then(r => {
      this.APICalls.getUserTalks = false;
    }).catch(e => {
      this.APICalls.getUserTalks = false;
      if (e.status == 401) {
        localStorage.removeItem("Authorization");
        this.router.navigate(['login']);
      }
      else {
        that.snackbar.openFromComponent(ErrorDialogComponent, { duration: 2000, data: e.message, panelClass: ['snackbar'], verticalPosition: 'top', direction: 'rtl' });
      }
    });
    return ret;
  };

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/service/app.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public source: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private route: ActivatedRoute, private config: AppConfig){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.source = params['source'];
    });   
  }

  formData = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  public usernameExists: boolean = false;
  public emailExists: boolean = false;
  public userCreated: boolean = false;

  submitForm() {
    console.log(this.formData);
    this.http.post<any>(`${this.config.domain}/api/v1/public/auth/register`, this.formData)
    .subscribe({
      next: response => {
        this.cookieService.set('boonCurrentUser', response.username, 7, '/');
        this.cookieService.set('boonJwtToken', response.token), 7, '/';
        this.usernameExists = response.usernameCollision;
        this.emailExists = response.emailCollision;
        this.userCreated = response.userCreated;
        if(this.userCreated) {
          if(this.source != undefined && this.source.length > 0) this.router.navigate([this.source]);
          else this.router.navigate(['/user', response.username]);
        }
        console.log(response);
        // Handle the JWT token as needed
      },
      error: error => {
        console.error('API Error:', error);
        // Handle the error response
      }
    });
  }
}

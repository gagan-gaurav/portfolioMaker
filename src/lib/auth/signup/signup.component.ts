import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router){}

  ngOnInit(): void {
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
    this.http.post<any>('http://localhost:8080/api/v1/public/auth/register', this.formData)
    .subscribe({
      next: response => {
        this.cookieService.set('boonCurrentUser', response.username);
        this.cookieService.set('boonJwtToken', response.token);
        this.usernameExists = response.usernameCollision;
        this.emailExists = response.emailCollision;
        this.userCreated = response.userCreated;
        if(this.userCreated) {
          // route to home page of user.
          this.router.navigate(['/user', response.username]);
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

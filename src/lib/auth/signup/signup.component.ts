import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService){}

  ngOnInit(): void {
  }

  formData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  submitForm() {
    if (this.formData.password === this.formData.confirmPassword) {
      this.http.post<any>('http://localhost:8080/api/v1/auth/register', this.formData)
      .subscribe({
        next: response => {
          const jwtToken = response.token;
          const username = response.username;
          this.cookieService.set('boonJwtToken', jwtToken);
          this.cookieService.set('boonCurrentUser', username);
          console.log('JWT Token:', jwtToken, '\nUsername:', username);
          // Handle the JWT token as needed
        },
        error: error => {
          console.error('API Error:', error);
          // Handle the error response
        }
      });
    } else {
      console.error('Passwords do not match');
    }
  }
}

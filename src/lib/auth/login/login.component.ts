import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  formData = {
    username: '',
    password: '',
  };

  submitForm() {
    this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate', this.formData)
    .subscribe({
      next: response => {
        const jwtToken = response.token;
        const username = response.username;
        this.cookieService.set('boonJwtToken', jwtToken);
        this.cookieService.set('boonCurrentUser', username);
        console.log(response);
        if(response.isAuthenticated){
          this.router.navigate(['/user', response.username]);
        }
      },
      error: error => {
        console.error('API Error:', error);
        // Handle the error response
      }
    });
  }

  signUp(){
    this.router.navigate(['/signup']);
  }
}

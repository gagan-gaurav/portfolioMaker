import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public source!: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.source = params['source'];
    });    
  }

  formData = {
    username: '',
    password: '',
  };

  submitForm() {
    this.http.post<any>('http://localhost:8080/api/v1/public/auth/authenticate', this.formData)
    .subscribe({
      next: response => {
        const jwtToken = response.token;
        const username = response.username;
        this.cookieService.set('boonJwtToken', jwtToken, 7, '/');
        this.cookieService.set('boonCurrentUser', username, 7, '/');
        console.log(response);
        if(response.isAuthenticated){
          if(this.source.length > 0) this.router.navigate([this.source]);
          else this.router.navigate(['/user', response.username]);
        }
      },
      error: error => {
        console.error('API Error:', error);
        // Handle the error response
      }
    });
  }
}

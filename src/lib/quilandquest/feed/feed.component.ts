import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/service/app.user';
import { Authenticator } from 'src/service/app.authenticator';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit{

  public currentUser: any;
  public isLoggedIn: boolean = false;
  public profileImageUrl: any | null = null;
  public blogs: any;
  private jwtToken: any;
  private headers: any;
  private validClick: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private authenticator: Authenticator, private router: Router){
    this.jwtToken = this.cookieService.get('boonJwtToken');
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}` // Include the JWT token in the Authorization header
    });
  }

  async ngOnInit(): Promise<void> {
    //check if user is authenticated.
    await this.authenticator.authenticate();
    this.isLoggedIn = User.isLoggedIn();
    this.currentUser = User.getCurrentUser();
    this.profileImageUrl = User.getProfileImageUrl();

    if(this.isLoggedIn){
      console.log(this.headers);
      this.http.get(`${environment.baseUrl}/api/v1/public/blogs/all`, {headers: this.headers})
      .subscribe({
        next: response => {
          console.log(response);
          this.blogs = response;
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
    }else{
      this.http.get(`${environment.baseUrl}/api/v1/public/blogs/all`)
      .subscribe({
        next: response => {
          console.log(response);
          this.blogs = response;
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
    }
    
  }

  liked(blogId: number, liked: number){
    if(User.isLoggedIn() == false){
      alert("Please LogIn to like.");
      return;
    } 
    var blog = this.blogs.find( (t:any) => t.blogId === blogId);
    // console.log(blog);
    if(liked == 1) {
      blog.liked = 0;
      blog.likes -= 1;
    }
    else if(liked == -1){
      blog.liked = 1;
      blog.dislikes -= 1;
      blog.likes += 1;
    }else{
      blog.liked = 1;
      blog.likes += 1;
    }
    this.updateDatabase(blogId, blog.liked);
  }

  disliked(blogId: number, liked: number){
    if(User.isLoggedIn() == false){
      alert("Please LogIn to dislike.");
      return;
    } 
    var blog = this.blogs.find( (t:any) => t.blogId === blogId);
    // console.log(blog);
    if(liked == -1) {
      blog.liked = 0;
      blog.dislikes -= 1;
    }else if(liked == 1){
      blog.liked = -1;
      blog.likes -= 1;
      blog.dislikes += 1;
    }
    else {
      blog.liked = -1;
      blog.dislikes += 1;
    }
    this.updateDatabase(blogId, blog.liked);
  }

  updateDatabase(blogId: any, liked: any){
    const body = {
      liked: liked
    }
    this.http.post(`${environment.baseUrl}/api/v1/secured/event/${blogId}`, body, {headers: this.headers})
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
  }

  // logic for a valid click -> could be improved.
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.validClick = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.validClick = false;
  }

  readMore(blogId: any){
    if(this.validClick)this.router.navigate(['/blog', blogId]);
  }
}

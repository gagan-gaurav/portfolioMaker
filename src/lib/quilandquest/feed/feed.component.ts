import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/service/app.user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit{

  public blogs: any;
  private jwtToken: any;
  private headers: any;

  constructor(private http: HttpClient, private cookieService: CookieService){
    if(this.cookieService.get('boonCurrentUser').length > 0) User.setUser(this.cookieService.get('boonCurrentUser'));
    this.jwtToken = this.cookieService.get('boonJwtToken');
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}` // Include the JWT token in the Authorization header
    });
  }

  ngOnInit(): void {
    if(this.cookieService.check('boonJwtToken')){
      console.log(this.headers);
      this.http.get('http://localhost:8080/api/v1/public/blogs/all', {headers: this.headers})
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
      this.http.get('http://localhost:8080/api/v1/public/blogs/all')
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
    this.http.post(`http://localhost:8080/api/v1/secured/event/${blogId}`, body, {headers: this.headers})
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
  }

}

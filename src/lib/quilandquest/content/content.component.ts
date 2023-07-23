import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/service/app.user';
import { Authenticator } from 'src/service/app.authenticator';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public currentUser: any;
  public isLoggedIn: boolean = false;
  public blog: any;
  public blogId: any;
  private jwtToken: any;
  private headers: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private authenticator: Authenticator, private router: Router, private route: ActivatedRoute){
    this.jwtToken = this.cookieService.get('boonJwtToken');
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}` // Include the JWT token in the Authorization header
    });
  }

  async ngOnInit(): Promise<void> {
    await this.authenticator.authenticate();
    this.isLoggedIn = User.isLoggedIn();
    this.currentUser = User.getCurrentUser();

    //get the blog id from router
    this.route.params.subscribe(params => {
      this.blogId = params['blog_id'];
    }); 

    if(this.isLoggedIn){
      console.log(this.headers);
      this.http.get(`${environment.baseUrl}/api/v1/public/blogs/blog_id/${this.blogId}`, {headers: this.headers})
      .subscribe({
        next: response => {
          console.log(response);
          this.blog = response;
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
    }else{
      this.http.get(`${environment.baseUrl}/api/v1/public/blogs/blog_id/${this.blogId}`)
      .subscribe({
        next: response => {
          console.log(response);
          this.blog = response;
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
    var blog = this.blog;
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
    var blog = this.blog;
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
}

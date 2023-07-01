import { Component, OnInit, HostListener, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppConfig} from 'src/config/app.config';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  public blogsConfig: Object = {
    theme: "theme-blogs",
    heading: "Blogs"
  }

  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();

  public showTrending: boolean = true;
  public showMyBlogs: boolean = false;
  public showAddBlogs: boolean = false;
  public blogs: any;
  public userblogs: any;

  //current blog status
  public showBlog: boolean = false;
  public heading: any;
  public author: any;
  public content: any;
  public date: any;

  constructor(private http: HttpClient, private cookieService: CookieService, public coordinateConfig: AppConfig) {
  }

  ngOnInit(): void {
    const jwtToken = this.cookieService.get('boonJwtToken');
    const username = this.cookieService.get('boonCurrentUser');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
    });

    console.log(headers);

    this.http.get('http://localhost:8080/api/v1/blogs/all', {headers})
    .subscribe({
      next: response => {
        console.log(response);
        this.blogs = response;
      },
      error: error => {
        console.error('API Error', error);
      }   
    });

    this.http.get(`http://localhost:8080/api/v1/blogs/${username}`, {headers})
    .subscribe({
      next: response => {
        console.log(response);
        this.userblogs = response;
      },
      error: error => {
        console.error('API Error', error);
      }   
    });
  }

  trending(){
    this.showTrending = true;
    this.showAddBlogs = false;
    this.showMyBlogs = false;
    this.showBlog = false;
  }

  myblogs(){
    this.showTrending = false;
    this.showAddBlogs = false;
    this.showMyBlogs = true;
    this.showBlog = false;
  }

  addblogs(){
    this.showTrending = false;
    this.showAddBlogs = true;
    this.showMyBlogs = false;
    this.showBlog = false;
  }

  title = '';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '24rem',
    minHeight: '8rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Comic Sans MS',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  post(){
    const jwtToken = this.cookieService.get('boonJwtToken');
    const username = this.cookieService.get('boonCurrentUser');
    const body = {
      username: username,
      title: this.title,
      content: this.htmlContent
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
    });

    console.log(headers);

    this.http.post('http://localhost:8080/api/v1/blogs', body, { headers })
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('API Error', error);
      }   
    });
  }

  readMore(blog: any){
    this.heading = blog.title;
    this.author = blog.firstname + ' ' + blog.lastname;
    this.content = blog.content;
    this.date = blog.createdAt;
    this.showBlog = true;
  }

  back(){
    this.showBlog = false;
  }

  emitX(value:any){
    this.Xemitter.emit(value);
  }
  
  emitY(value:any){
    this.Yemitter.emit(value);
  }
}

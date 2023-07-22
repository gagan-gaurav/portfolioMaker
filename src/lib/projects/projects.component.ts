import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/service/app.user';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppConfig } from 'src/service/app.config';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './../../styles/config.scss']
})
export class ProjectsComponent implements OnInit, OnChanges{
  public currentUser: any;
  @Input() public username: any;
  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();
  @Output() public close = new EventEmitter<any> ();

  public projectsTheme: string = "theme-projects";
  public projectsHeading: string = "Projects";

  public projectsConfig: Object = {
    theme : "theme-projects",
    heading : "Projects",
  }
  
  public editProject: boolean = false;
  public projects: any;
  public descriptionLength: number = 0;
  // public formData: any;
  public formData = {
    showProject: false,
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    content: ""
  }

  editorConfig: AngularEditorConfig = {
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

  constructor(private http: HttpClient, private cookieService: CookieService, private config: AppConfig) { 
    this.currentUser = User.getCurrentUser();
  }

  ngOnInit(): void {
    this.http.get(`${this.config.domain}/api/v1/public/projects/${this.username}`)
    .subscribe({
      next: response => {
        console.log(response);
        this.projects = response;
      },
      error: error => {
        console.error('API Error', error);
      }   
    });
  }

  ngOnChanges(changes: any) {
    if (changes.username) {
      // Perform any necessary actions when the variable changes
      this.ngOnInit();
    }
  }

  emitX(value:any){
    this.Xemitter.emit(value);
  }
  
  emitY(value:any){
    this.Yemitter.emit(value);
  }

  closeWindow(){
    this.close.emit();
  }
  
  setEditProject(){
    this.editProject = !this.editProject;
  }

  submitForm(){
    console.log(this.formData);

    const jwtToken = this.cookieService.get('boonJwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
    });

    console.log(headers);
    this.http.post<any>(`${this.config.domain}/api/v1/secured/projects`, this.formData, {headers})
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('API Error', error);
      }   
    });
  }

  limitInputLength(){
    this.descriptionLength = this.formData.description.length;
  }
}

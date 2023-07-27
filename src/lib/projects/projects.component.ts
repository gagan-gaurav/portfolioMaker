import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/service/app.user';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './../../styles/config.scss']
})
export class ProjectsComponent implements OnInit, OnChanges{
  public currentUser: any;
  private headers: any;
  private jwtToken: any;
  @Input() public username: any;
  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();
  @Output() public close = new EventEmitter<any> ();

  public projectsConfig: Object = {
    theme : "theme-projects",
    heading : "Projects",
  }
  
  public showProjectEditor: boolean = false;
  public showDeletePopup: boolean = false;
  public projects: any;
  public descriptionLength: number = 0;
  public formData: any;
  public selectedProjectId: any;
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '24rem',
    minHeight: '8rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons:[
      ['fontName']
    ]
  };

  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { 
    this.currentUser = User.getCurrentUser();
  }

  ngOnInit(): void {
    this.jwtToken = this.cookieService.get('boonJwtToken');
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}` // Include the JWT token in the Authorization header
    });

    this.http.get(`${environment.baseUrl}/api/v1/public/projects/${this.username}`)
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
  
  setAddProject(){
    this.showProjectEditor = !this.showProjectEditor;
    this.formData = {
      showProject: false,
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      content: ""
    }

  }

  submitForm(){
    if(this.formData.projectId === undefined){
      this.http.post<any>(`${environment.baseUrl}/api/v1/secured/projects`, this.formData, {"headers": this.headers})
      .subscribe({
        next: response => {
          if(response.status == "success") this.toastr.success(response.message);
          else this.toastr.error(response.message);
          this.ngOnInit();
          this.showProjectEditor = !this.showProjectEditor;
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
    }else{
      this.http.post<any>(`${environment.baseUrl}/api/v1/secured/projects/${this.formData.projectId}`, this.formData, {"headers": this.headers})
      .subscribe({
        next: response => {
          if(response.status == "success") this.toastr.success(response.message);
          else this.toastr.error(response.message);
          this.showProjectEditor = !this.showProjectEditor;
        },
        error: error => {
          console.error('API Error', error);
        }   
      });
    }
  }

  updateProject(projectId: any){
    this.showProjectEditor = !this.showProjectEditor;
    this.formData = this.projects.find((x:any) => x.projectId === projectId);
    this.formData.startDate = this.formData.startDate.slice(0,10);
    this.formData.endDate = this.formData.endDate.slice(0,10);
    console.log(this.formData);
  }

  deleteProject(projectId: any){
    this.toggleDeletePopup();
    this.selectedProjectId = projectId;
  }

  toggleDeletePopup(){
    this.showDeletePopup = !this.showDeletePopup;
  }

  confirmDelete(){
    this.http.delete<any>(`${environment.baseUrl}/api/v1/secured/projects/delete/${this.selectedProjectId}`, {"headers": this.headers})
      .subscribe({
        next: response => {
          if(response.status == "success") this.toastr.success(response.message);
          else this.toastr.error(response.message);
          this.ngOnInit();
          this.toggleDeletePopup();
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

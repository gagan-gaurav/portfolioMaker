import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/service/app.user'
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './../../styles/config.scss']
})
export class ProfileComponent implements OnInit, OnChanges{
  public currentUser: any;
  @Input() public username: any;
  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();
  @Output() public close = new EventEmitter<any> ();

  public profileConfig: Object = {
    theme : "theme-profile",
    heading : "Profile",
  }

  public descriptionLength: number = 0;
  public editProfile: boolean = false;
  // formData: any;
  formData = {
    description: "",
    username: "",
    firstname: "",
    lastname: "",
    resume: "",
    showResume: false,
    linkedin: "",
    showLinkedin: false,
    github: "",
    showGithub: false,
    gmail: "",
    showGmail: false,
    profileUrl: "",
    profilePic: false
  }

  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { 
    this.currentUser = User.getCurrentUser();
  }

  ngOnInit(): void {
    this.http.get(`${environment.baseUrl}/api/v1/public/profile/${this.username}`)
    .subscribe({
      next: response => {
        const data: any = response;
        this.formData = data;
      },
      error: error => {
        console.error('API Error:', error);
        // Handle the error response
      }
    });
  }

  ngOnChanges(changes: any) {
    if (changes.username) {
      // Perform any necessary actions when the variable changes
      this.ngOnInit();
    }
  }

  submitForm(form: any) {
    if (form.valid) {
      const jwtToken = this.cookieService.get('boonJwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
      });
      console.log(jwtToken);
      console.log(this.formData);
      this.http.post(`${environment.baseUrl}/api/v1/secured/profile`, this.formData, {headers})
      .subscribe({
        next: response => {
          console.log("res", response);
        },
        error: error => {
          console.error('API Error:', error);
          // Handle the error response
        }
      });
    }
  }


  limitInputLength() {
    if (this.formData.description.length > 255) {
      this.formData.description = this.formData.description.slice(0, 255);
    }
    this.descriptionLength = this.formData.description.length;
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

  setEditProfile(){
    this.editProfile = !this.editProfile;
  }


  // this section is for uploading profile pic logic.

  selectedFile: File | null = null;
  showDeletePopup: boolean = false;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  UploadImage(value: any) {
    if(value == 0) {
      this.selectedFile = null; // remove selected file if any.
      this.toggleDeletePopup();
    }
    console.log('Uploading file:', this.selectedFile);
    const jwtToken = this.cookieService.get('boonJwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
    });
    this.http.post<any>(`${environment.baseUrl}/api/v1/secured/profile_image`, this.selectedFile, {headers})
    .subscribe({
      next: response => {
        console.log("res", response);
        if(response.status == "success")this.toastr.success(response.message);
        else this.toastr.error(response.message);
      },
      error: error => {
        console.error('API Error:', error);
        this.toastr.error(error);
        // Handle the error response
      }
    });
  }

  removeProfilePic(){
    this.toggleDeletePopup();
  }

  toggleDeletePopup(){
    this.showDeletePopup = !this.showDeletePopup;
  }
}

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './../../styles/config.scss']
})
export class ProjectsComponent implements OnInit {
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

  constructor() { 
  }

  ngOnInit(): void {
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
  
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './../../styles/config.scss']
})
export class ProfileComponent implements OnInit{
  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();
  @Output() public close = new EventEmitter<any> ();

  public profileConfig: Object = {
    theme : "theme-profile",
    heading : "Profile",
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

import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  public initialWidth = 0; // initial size of window
  @Input() public buttonConfig: any;

  // Button coordinates.
  @Input() public ButtonX1: number = 0;
  @Input() public ButtonY1: number = 0;
  @Output() Xemitter = new EventEmitter<any>();
  @Output() Yemitter = new EventEmitter<any>();
  public ButtonX2: number = 0;
  public ButtonY2: number = 0;
  public insideButton: boolean = false;
  public mouseHoldsButton: boolean = false;
  public startTime: number = 0;
  public endTime: number = 0;

  constructor(){
    this.initialWidth = window.innerWidth;
  }

  // this maintains the position of button with respect to right side, when window size is changing.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ButtonX1 -= this.initialWidth - window.innerWidth;
    this.Xemitter.emit(this.ButtonX1);
    this.initialWidth = window.innerWidth;
  }

  // listen to the mouseclick is pressed.
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if(this.insideButton){
      this.mouseHoldsButton = true;
      this.ButtonX2 = event.clientX;
      this.ButtonY2 = event.clientY;
    }
  }

  // when mouse click is released.
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    this.endTime = Date.now();
    this.mouseHoldsButton = false;
  }

   // when mouse is moving.
   @HostListener('document:mousemove', ['$event'])
   onMouseMove(event: MouseEvent) {
     event.preventDefault();
     if(this.mouseHoldsButton && this.insideButton){
       this.ButtonX1 += event.clientX - this.ButtonX2;
       this.Xemitter.emit(this.ButtonX1);
       this.ButtonY1 += event.clientY - this.ButtonY2;
       this.Yemitter.emit(this.ButtonY1);
       this.ButtonX2 = event.clientX;
       this.ButtonY2 = event.clientY;
     }
   }

     // when mouse is inside the div.
  mouseOver(){
    console.log("insideButton");
    this.insideButton = true;
  }

  // when mouse is outsider the div.
  mouseOut(){
    console.log('outsidemouse')
    if(this.mouseHoldsButton == false) this.insideButton = false;
  }

}


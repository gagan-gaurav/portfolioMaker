import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit{
  public heading: any;

  public insideMenubar: boolean = false;
  public mouseHoldsComponent: boolean = false;
  @Input() public X1: number = 0;
  @Input() public Y1: number = 0;
  @Output() public Xemitter = new EventEmitter<any>();
  @Output() public Yemitter = new EventEmitter<any>();
  public X2: number = 0;
  public Y2: number = 0;

  public initialWidth = 0; // initial size of window

  constructor() {
    this.initialWidth = window.innerWidth;

  }

  ngOnInit(): void {
      console.log(this.X1, this.Y1);
  }

  mouseOver(){
    this.insideMenubar = true;
    console.log("insideMenubar", this.insideMenubar);
  }

  mouseOut(){
    if(!this.mouseHoldsComponent) this.insideMenubar = false;
    console.log("insideMenubar", this.insideMenubar);
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    if(this.insideMenubar) {
      this.mouseHoldsComponent = true;
      this.X2 = event.clientX;
      this.Y2 = event.clientY;
      console.log("HoldsBlogs");
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    this.mouseHoldsComponent = false;
    console.log("DonstHoldBlogs");
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if(this.mouseHoldsComponent && this.insideMenubar){
      this.X1 += event.clientX - this.X2;
      this.Xemitter.emit(this.X1);
      this.Y1 += event.clientY - this.Y2;
      this.Yemitter.emit(this.Y1);
      this.X2 = event.clientX;
      this.Y2 = event.clientY;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.initialWidth = window.innerWidth;
  }
}

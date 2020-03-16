import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  setBackground() {
    const styles = {
      'background-image': 'url("/assets/background.png"), liner-gradient(rgb(105,118,144), rgb(40,39,37))',
      'background-repeat': 'no-repeat'
    };
    return styles;
  }
}

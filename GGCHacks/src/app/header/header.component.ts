import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  openExternalLink(url: string): void {
    window.open(url, 'https://ggc.campusgroups.com/feeds?type=club&type_id=35493&tab=about');
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}

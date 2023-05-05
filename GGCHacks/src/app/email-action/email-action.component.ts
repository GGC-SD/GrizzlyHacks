import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

/**
 * Component that handles email actions.
 * @remarks
 * This component is responsible for handling actions regarding emails.
 */
@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.css']
})
export class EmailActionComponent implements OnInit {
  action;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.action = this.activatedRoute.snapshot.queryParams.mode;
  }

}
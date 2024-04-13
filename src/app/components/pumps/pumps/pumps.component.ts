import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IPump} from "../../../models/IPump";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {WebService} from "../../../services/web.service";

@Component({
  selector: 'app-pumps',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pumps.component.html',
  styleUrl: './pumps.component.scss'
})
export class PumpsComponent implements OnInit, OnDestroy {
  public pumps?: IPump[];
  private webService = inject(WebService);

  private route$?: Subscription;
  private pumps$?: Subscription;

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
    this.pumps$?.unsubscribe();
  }

  ngOnInit(): void {
    this.pumps$ = this.webService.pumps$.subscribe((pumps) => {
      this.pumps = pumps;
    });
    this.webService.loadPumpsFromApi();
  }

}

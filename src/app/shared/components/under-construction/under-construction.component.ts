import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {
  @Input() pageName: string;

  constructor() { }

  get pageContext(): string {
    return (this.pageName) ? `"${this.pageName}"` : `This`;
  }

  ngOnInit(): void {
  }

}

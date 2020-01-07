import { Component, OnInit } from "@angular/core";
import { ModalService } from '../../_modal';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void { }

  openModal(id: string) {
    this.modalService.open(id);
  }
}

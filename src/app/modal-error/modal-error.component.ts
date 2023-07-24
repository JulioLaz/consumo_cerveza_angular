import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {
  @Input() titulo: string = '';
  @Input() mensaje: string = '';

  constructor(public activeModal: NgbActiveModal) { }
}

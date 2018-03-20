import { Component, OnInit, TemplateRef } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Logger } from '../service/logger.service';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { environment } from '../../environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {

  bookedAppointments : AppointmentSlot[];
  imageRoot : string = environment.imageRoot;
  modalRef: BsModalRef;
 
  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger,
    private modalService: BsModalService) { 
    
  }

  ngOnInit() {

    this.route.params.subscribe( (params : Params) => {
      let sId = params['sId'];
      this.facadeService.getAllAppointmentsByUser(sId).subscribe( (appointments) => {
        this.bookedAppointments = appointments;
      });
    });
  }


  openCancelModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmCancel(appointmentId): void {
    this.facadeService.cancelAppointment(appointmentId).subscribe( (result) => {
      let cancelledAppointment = this.bookedAppointments.find( (eachAppointment) => {
        return appointmentId === eachAppointment.appointmentId;
      });
      cancelledAppointment.status = "cancelled";
      this.modalRef.hide();
    });
    
  }
 
  declineCancel(): void {
    this.modalRef.hide();
  }

  modifyAppointment(appointment) {
    this.router.navigate(['/bushome', appointment.busId],
                      {relativeTo:this.route, 
                        queryParams : {'psId' : appointment.appointmentId}});
  }

}

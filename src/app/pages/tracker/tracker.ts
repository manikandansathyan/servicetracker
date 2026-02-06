import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservice } from '../../services/apiservice';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tracker.html',
  styleUrl: './tracker.css',
})
export class Tracker implements OnInit {

  form: FormGroup;
  vehicles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: Apiservice
  ) {
    this.form = this.fb.group({
      vname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      date: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      servicetype: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadVehicles()
  }


  // add vehicle

  addvehicle() {

    if (this.form.invalid) {
      alert("Please fill all fields correctly");
      return;
    }

    const vehicleData = this.form.value;

    if (this.selectedId) {
      // UPDATE
      this.api.updateVehicle(this.selectedId, vehicleData).subscribe(() => {
        alert("Updated Successfully");
        this.selectedId = null;
        this.form.reset();
        this.loadVehicles();
      });
    } else {
      // ADD
      this.api.addvehicle(vehicleData).subscribe(() => {
        alert("Vehicle Added 🚗");
        this.form.reset();
        this.loadVehicles();
      });
    }
  }


  // load vehicle

  loadVehicles() {
    this.api.getVehicles().subscribe((data: any) => {
      this.vehicles = data;
    });
  }

  selectedId: number | null = null;


  // edit

  editVehicle(vehicle: any) {
    this.selectedId = vehicle.id;
    this.form.patchValue(vehicle);
  }


  // delete
  deleteVehicle(id: number) {
    this.api.deleteVehicle(id).subscribe(() => {
      alert("Deleted Successfully");
      this.loadVehicles();
    });
  }



}

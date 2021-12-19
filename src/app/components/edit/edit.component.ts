import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  carArr: string[] = [];

  owner = new Owner();

  owners: Owner[] = [];

  preview: boolean = false;

  ownerForm = this.getOwnerForm(this.owner);

  constructor(private formBuilder: FormBuilder, private ownerServive: OwnerService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.ownerServive.getOwners().subscribe(owners => {
        owners.forEach((owner) => {
          if (owner.id != data.id) {
            this.carArr = this.carArr.concat(owner.cars.map(c => c.number))
          }
        })
      })

      if (data['id']) this.ownerServive.getOwnerById(data['id']).subscribe(owner => {
        this.owner = owner
        this.ownerForm = this.getOwnerForm(owner)
      })
    })
  }

  getOwnerForm(owner: Owner) {
    this.preview = !!this.activatedRoute.snapshot.data.preview;
    let cars = owner.cars.map(car => this.getCarEntity(car))
    return new FormGroup({
      firstName: new FormControl({ value: owner.firstName, disabled: this.preview }, Validators.required),
      secondName: new FormControl({ value: owner.secondName, disabled: this.preview }, Validators.required),
      middleName: new FormControl({ value: owner.middleName, disabled: this.preview }, Validators.required),
      cars: this.formBuilder.array(cars, [Validators.required, Validators.minLength(1)])
    })
  }

  getCarEntity(car: Car) {
    let getCurrDate = this.getFullYear()
    return this.formBuilder.group({
      number: new FormControl({ value: car.number, disabled: this.preview }, [Validators.required, Validators.pattern('[А-Я]{2}[1-9]{4}[А-Я]{2}'), this.numberValidator()]),
      mark: new FormControl({ value: car.mark, disabled: this.preview }, Validators.required),
      model: new FormControl({ value: car.model, disabled: this.preview }, Validators.required),
      releaseYear: new FormControl({ value: car.releaseYear, disabled: this.preview }, [Validators.required, Validators.min(1995), Validators.max(getCurrDate)]),
    })
  }

  numberValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): { [key: string]: boolean } | null => {
      let valid = !this.carArr.includes(control.value)
      return valid ? null : { carNumber: true }
    }
  }

  ownerData() {
    if (this.activatedRoute.snapshot.params['id']) {
      let ownerBody = this.ownerForm.value
      ownerBody.id = this.owner.id
      this.ownerServive.editOwner(ownerBody).subscribe((data) => {
        this.router.navigate([''])
      })
    } else {
      this.ownerServive.addOwner({ ...this.ownerForm.value, id: this.ownerServive.lastId }).subscribe((data) => {
        this.ownerServive.lastId++
        this.router.navigate([''])
      })
    }
  }

  getFullYear() {
    return new Date().getFullYear()
  }

  addCar() {
    this.cars.push(this.getCarEntity(new Car()))
  }

  removeCar(index: number) {
    this.cars.removeAt(index)
  }

  cf(index: number) { return this.cars.controls[index] as FormGroup }

  get f() { return this.ownerForm.controls }

  get cars() { return this.ownerForm.controls.cars as FormArray }
}

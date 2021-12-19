import { Component, Input, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: Owner[] = []

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.getOwners()
  }

  getOwners(){
    this.ownerService.getOwners().subscribe(data => {
      this.owners = data
    })
  }

  removeOwner(owner: Owner){
    if(confirm(`Вы уверены, что хотите удалить ${owner.firstName} ${owner.secondName}?`)) this.ownerService.deleteOwner(owner.id as number).subscribe(data => this.getOwners())
  }
}
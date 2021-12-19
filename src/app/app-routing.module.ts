import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { OwnersComponent } from './components/owners/owners.component';

const routes: Routes = [
    { path: '', component: OwnersComponent },
    { path: 'new', component: EditComponent},
    { path: 'edit/:id', component: EditComponent},
    { path: 'preview/:id',  component: EditComponent, data: {preview: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EncoderComponent } from './components/encoder/encoder.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', component: LoginComponent},
    {path: 'encode', component: EncoderComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

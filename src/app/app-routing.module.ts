import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { BitcoinAppComponent } from './pages/bitcoin-app/bitcoin-app.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';

const routes: Routes = [

  {
    path: 'contact',
    component: ContactPageComponent,
    children: [
      {
        path: 'edit/:id',
        component: ContactEditPageComponent,
        resolve: { contact: ContactResolverService }
      }, {
        path: 'edit',
        component: ContactEditPageComponent,

      },
    ]
  },
  {
    path: 'contact/details/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService }
  },
  {
    path: '',
    component: BitcoinAppComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

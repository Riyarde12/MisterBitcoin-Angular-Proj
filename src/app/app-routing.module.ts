import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { BitcoinAppComponent } from './pages/bitcoin-app/bitcoin-app.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
// import { LogoutComponent } from './cmps/logout/logout.component';

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
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoggedInGuard],

    // children: [{
    // path: 'logout',
    // component: LogoutComponent,
    // }]
  },
  {
    path: 'contact/details/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService }
  },
  {
    path: '',
    component: BitcoinAppComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'login',
      redirectTo: 'login',
    }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

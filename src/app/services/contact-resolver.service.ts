import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Promise<Contact>> {

  constructor(private contactService: ContactService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params
    console.log('route.params', route.params);
    console.log('id', id);
    // if (!id) return
    const contact = await lastValueFrom(this.contactService.getContactById(id))
    return contact
  }
}

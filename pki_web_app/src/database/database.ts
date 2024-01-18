import { User, Roles } from "@/models/User";

export let users: User[] = [
    {
        firstName: 'Jovan',
        lastName: 'Petrović',
        contactNumber: '0612345678',
        address: 'Knez Mihailova 1, Beograd',
        username: 'jovan',
        password: 'sifra123',
        role: Roles.buyer
      },
      {
        firstName: 'Ana',
        lastName: 'Janković',
        contactNumber: '0649876543',
        address: 'Terazije 5, Novi Sad',
        username: 'ana',
        password: 'lozinka456',
        role: Roles.employee
      },
      {
        firstName: 'Marko',
        lastName: 'Nikolić',
        contactNumber: '0655555555',
        address: 'Nemanjina 10, Niš',
        username: 'marko',
        password: 'bezbednaLozinka789',
        role: Roles.buyer
      }
  ];


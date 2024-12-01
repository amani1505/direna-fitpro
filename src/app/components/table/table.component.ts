import { Component, computed, OnInit, signal } from '@angular/core';
import { ActionsComponent } from './parts/actions/actions.component';
import { FooterComponent } from './parts/footer/footer.component';
import { RowComponent } from './parts/row/row.component';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClient } from '@angular/common/http';
import { TableFilterService } from './service/filter.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './parts/header/header.component';
import { HeaderColumn, TableActions } from '@model/TableColumn.interface';
import { log } from 'console';

export const dummyData: any[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+1-202-555-0156',
    website: 'johndoe.com',
    occupation: 'Software Engineer',
    hobbies: ['coding', 'hiking', 'reading'],
    selected: false,
    status: 1,
    created_at: '2024-10-12T12:34:56Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    username: 'janesmith',
    email: 'jane.smith@example.com',
    phone: '+1-202-555-0123',
    website: 'janesmith.net',
    occupation: 'Graphic Designer',
    hobbies: ['drawing', 'photography', 'travel'],
    selected: false,
    status: 1,
    created_at: '2024-10-14T12:34:56Z',
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 35,
    username: 'michaelb',
    email: 'michael.brown@example.com',
    phone: '+1-202-555-0189',
    website: 'michaelbrown.me',
    occupation: 'Data Scientist',
    hobbies: ['data analysis', 'cycling', 'music'],
    selected: true,
    status: 2,
    created_at: '2024-10-16T12:34:56Z',
  },
  {
    id: 4,
    name: 'Emily White',
    age: 28,
    username: 'emilyw',
    email: 'emily.white@example.com',
    phone: '+1-202-555-0147',
    website: 'emilywhite.org',
    occupation: 'Marketing Specialist',
    hobbies: ['writing', 'yoga', 'baking'],
    selected: false,
    status: 2,
    created_at: '2024-10-18T12:34:56Z',
  },
  {
    id: 5,
    name: 'David Johnson',
    age: 40,
    username: 'davidj',
    email: 'david.johnson@example.com',
    phone: '+1-202-555-0168',
    website: 'davidjohnson.co',
    occupation: 'Product Manager',
    hobbies: ['innovation', 'gaming', 'finance'],
    selected: true,
    status: 1,
    created_at: '2024-10-20T12:34:56Z',
  },
  {
    id: 6,
    name: 'Sarah Davis',
    age: 32,
    username: 'sarahd',
    email: 'sarah.davis@example.com',
    phone: '+1-202-555-0190',
    website: 'sarahdavis.dev',
    occupation: 'UI/UX Designer',
    hobbies: ['design', 'gardening', 'swimming'],
    selected: false,
    status: 1,
    created_at: '2024-10-22T12:34:56Z',
  },
  {
    id: 7,
    name: 'Chris Lee',
    age: 29,
    username: 'chrislee',
    email: 'chris.lee@example.com',
    phone: '+1-202-555-0134',
    website: 'chrislee.io',
    occupation: 'Mobile Developer',
    hobbies: ['app development', 'traveling', 'reading'],
    selected: false,
    status: 1,
    created_at: '2024-10-26T12:34:56Z',
  },
  {
    id: 8,
    name: 'Emma Wilson',
    age: 27,
    username: 'emmawilson',
    email: 'emma.wilson@example.com',
    phone: '+1-202-555-0175',
    website: 'emmawilson.tech',
    occupation: 'DevOps Engineer',
    hobbies: ['automation', 'gaming', 'blogging'],
    selected: true,
    status: 3,
    created_at: '2024-10-28T12:34:56Z',
  },
];

@Component({
  selector: 'ListTable',
  standalone: true,
  imports: [
    CommonModule,
    ActionsComponent,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    AngularSvgIconModule,
    RowComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  [x: string]: any;
  users = signal<any[]>([]);
  columns: HeaderColumn[] = [
    { key: 'selected', type: 'checkbox' },
    { key: 'name', type: 'text', label: 'Member' },
    { key: 'username', type: 'text', label: 'Username' },
    { key: 'hobbies', type: 'text', label: 'Hobbies' },
    { key: 'occupation', type: 'text', label: 'Occupation' },
    { key: 'phone', type: 'text', label: 'Phone' },
    { key: 'actions', type: 'actions' },
  ];

  constructor(
    private _http: HttpClient,
    private filterService: TableFilterService,
  ) {
    this._http
      .get<any[]>('https://freetestapi.com/api/v1/users?limit=8')
      .subscribe({
        next: (data) => this.users.set(data),
        error: (error) => {
          this.users.set(dummyData);
          this.handleRequestError(error);
        },
      });
  }

  public toggleUsers(checked: any): any {
    console.log('Checked', checked);
    // this.users.update((users) => {
    //   return users.map((user) => {
    //     return { ...user, selected: checked };
    //   });
    // });
  }

  private handleRequestError(error: any) {
    const msg =
      'An error occurred while fetching users. Loading dummy data as fallback.';
    // toast.error(msg, {
    //   position: 'bottom-right',
    //   description: error.message,
    //   action: {
    //     label: 'Undo',
    //     onClick: () => console.log('Action!'),
    //   },
    //   actionButtonStyle: 'background-color:#DC2626; color:white;',
    // });
  }

  filteredUsers = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const status = this.filterService.statusField();
    const order = this.filterService.orderField();

    return this.users()
      .filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.username.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.phone.includes(search),
      )
      .filter((user) => {
        if (!status) return true;
        switch (status) {
          case '1':
            return user.status === 1;
          case '2':
            return user.status === 2;
          case '3':
            return user.status === 3;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const defaultNewest = !order || order === '1';
        if (defaultNewest) {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        } else if (order === '2') {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
        return 0;
      });
  });

  actions: TableActions[] = [
    {
      type: 'search',
      placeholder: 'Search users',
      action: (event: Event) => {
        const input = event.target as HTMLInputElement;
        console.log('Search:', input.value);
      },
    },
    {
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled' },
        { label: 'Pending', value: 'pending' },
      ],
      placeholder: 'Select Members Status',
      action: (value: Event | string | null) => {
        console.log('Status changed to:', value);
      },
    },
  ];

  ngOnInit() {}

  delete(id: string) {
   alert(`Delete User +  ${id}`)
  }
}

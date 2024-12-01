import { Component } from '@angular/core';
import { TableComponent } from '@components/table/table.component';
import {
  HeaderColumn,
  RowColumn,
  TableActions,
} from '@model/TableColumn.interface';

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
    selected: true,
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
  selector: 'members-pageview',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './members-pageview.component.html',
  styleUrl: './members-pageview.component.scss',
})
export class MembersPageviewComponent {
  data: any[] = dummyData;

  itemsPerPage: number = 30;
  totalItems: number = 200;
  currentPage: number = 4;
  totalPages: number = 70;

  headerColumns: HeaderColumn[] = [
    { key: 's/n', type: 's/n', label: 'S/N' },
    { key: 'name', type: 'text', label: 'Member' },
    { key: 'username', type: 'text', label: 'Username' },
    { key: 'hobbies', type: 'text', label: 'Hobbies' },
    { key: 'occupation', type: 'text', label: 'Occupation' },
    { key: 'phone', type: 'text', label: 'Phone' },
    { key: 'actions', type: 'actions' },
  ];

  rowColumns: Array<RowColumn> = [
    { key: 's/n', type: 's/n' },
    { key: 'name', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'hobbies', type: 'badge' },
    { key: 'occupation', type: 'text' },
    { key: 'phone', type: 'text' },
    {
      key: 'action',
      type: 'button',
      actionType: ['update', 'delete'],
    },
  ];

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

  toggleUsers(checked: any) {
    console.log('Checked', checked);
  }
  toggleUser(selected: any) {
    console.log('Row', selected);
    const selectedUsers = this.data.filter((user) => user.selected);
  }
  addNewMember() {
    alert('Member added');
  }

  delete(id: any) {
    alert(`Member deleted ${id}`);
  }

  update(id: any) {
    alert(`Member updated ${id}`);
  }
}

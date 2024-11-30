import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '@components/table/table.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface User {
  image: string; // URL or base64 string for the icon or image
  fullName: string;
  email: string;
  contactNumber: string;
  weight: number; // in kilograms
  height: number; // in centimeters
  goal: string;
}

const users: User[] = [
  {
    image: 'https://example.com/image1.jpg',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    contactNumber: '123-456-7890',
    weight: 70,
    height: 175,
    goal: 'Weight Loss',
  },
  {
    image: 'https://example.com/image2.jpg',
    fullName: 'Jane Smith',
    email: 'janesmith@example.com',
    contactNumber: '987-654-3210',
    weight: 60,
    height: 165,
    goal: 'Muscle Gain',
  },
  {
    image: 'https://example.com/image3.jpg',
    fullName: 'Alice Johnson',
    email: 'alicej@example.com',
    contactNumber: '555-123-4567',
    weight: 55,
    height: 160,
    goal: 'Maintain Fitness',
  },
];

@Component({
  selector: 'members-pageview',
  standalone: true,
  imports: [
    // CommonModule,
    // MatSortModule,
    // MatPaginatorModule,
    // MatTableModule,
    // AngularSvgIconModule,
    TableComponent,
  ],
  templateUrl: './members-pageview.component.html',
  styleUrl: './members-pageview.component.scss',
})
export class MembersPageviewComponent {
  // columns = [
  //   { id: 'id', label: 'ID' },
  //   { id: 'name', label: 'Name' },
  //   { id: 'email', label: 'Email' },
  // ];
  // columnIds = this.columns.map((column) => column.id);
  // dataSource = new MatTableDataSource([
  //   { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  //   { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  // ]);
  // actions = [
  //   {
  //     bgColor: 'bg-blue-200 text-blue-400 dark:bg-blue-500 dark:text-blue-300',
  //     icon: 'assets/icons/heroicons/outline/pencil.svg',
  //     callback: (row: any) => this.editRow(row),
  //   },
  //   {
  //     bgColor :"bg-red-200 text-red-400 dark:bg-red-500 dark:text-red-300",
  //     icon: 'assets/icons/heroicons/outline/trash.svg',
  //     callback: (row: any) => this.deleteRow(row),
  //   },
  // ];
  // totalItems = 2;
  // addNewRow() {
  //   console.log('Add new row');
  // }
  // handlePageChange(event: any) {
  //   console.log('Page changed', event);
  // }
  // editRow(row: any) {
  //   console.log('Edit row', row);
  // }
  // deleteRow(row: any) {
  //   console.log('Delete row', row);
  // }
  //   dataSource: MatTableDataSource<User> = new MatTableDataSource(users);
  //   pageSize = 5;
  //   pageIndex = 0;
  //   totalItems = 0;
  //   showFirstLastButtons = true;
  //   pageSizeOptions: number[] = [5, 10, 50, 100];
  //   columns: string[] = [
  //     'S/N',
  //     'fullname',
  //     'email',
  //     'weight',
  //     'height',
  //     'goal',
  //     'action',
  //   ];
  //   @ViewChild(MatPaginator) paginator: MatPaginator;
  //   @ViewChild(MatSort) sort: MatSort;
  //   ngAfterViewInit() {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  // ngOnInit(): void {
  // }
  //   addNew(){
  //     console.log('Add new row');
  //   }
  //   update(id:string){
  //     console.log('update row');
  //   }
  //   delete(id:string){
  //     console.log('delete row');
  //   }
}

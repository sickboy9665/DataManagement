import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../service/data-sharing-service';
import { Chart, registerables } from 'chart.js'; // Import registerables
import { trigger, transition, style, animate } from '@angular/animations';
export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), // Initial state
    animate('500ms ease-in', style({ opacity: 1 })) // Final state
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('400ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ], 
})
export class DashboardComponent implements OnInit {
  totalContacts: number = 0;
  duplicateContacts: number = 0;
  nonDuplicateContacts: number = 0;
  rowData:any;
  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    // Register all the components required for Chart.js
    Chart.register(...registerables);
    this.dataSharingService.findDuplicateRows();
    this.dataSharingService.totalRecords();
    this.dataSharingService.totalRecords$.subscribe(total => {
      this.totalContacts = total.length;
      this.rowData = total;
      // console.log(this.totalContacts)
      this.updateChart();
    });
    // Subscribe to the shared data for duplicates and non-duplicates
    this.dataSharingService.duplicates$.subscribe(duplicates => {
      this.duplicateContacts = duplicates.length;
      this.nonDuplicateContacts =  this.totalContacts - this.duplicateContacts;

      this.updateChart();
    });

    this.createContactSummaryChart();
    this.createCompanyChart();
    this.createDesignationChart();
    this.createMissingDataChart()
  }

  createContactSummaryChart() {
    const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie', // Or 'bar', 'line', etc.
      data: {
        labels: ['Non-Duplicate Contacts', 'Duplicate Contacts'],
        datasets: [{
          data: [this.nonDuplicateContacts, this.duplicateContacts],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  createCompanyChart() {

    
    const companyData = this.rowData.reduce((acc: any, contact: any) => {
      acc[contact.company_name] = (acc[contact.company_name] || 0) + 1;
      return acc;
    }, {});
  
    const companies = Object.keys(companyData);
    const counts = Object.values(companyData);
  
    const ctx = document.getElementById('companyChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: companies,
      datasets: [{
        label: 'Number of Contacts',
        data: counts,
        backgroundColor: companies.map((company, index) => {
          // Generate a random color for each bar
          return `hsl(${index * 30}, 70%, 50%)`;
        }),
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  });
  }
  
  createDesignationChart() {
    const designationData = this.rowData.reduce((acc: any, contact: any) => {
      acc[contact.designation] = (acc[contact.designation] || 0) + 1;
      return acc;
    }, {});
  
    // Get the top 5 designations
    const sortedDesignations = Object.entries(designationData).sort((a:any, b:any) => b[1] - a[1]).slice(0, 5);
  
    const designations = sortedDesignations.map(([designation]) => designation);
    const counts = sortedDesignations.map(([, count]) => count);
  
    const ctx = document.getElementById('designationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: designations,
        datasets: [{
          label: 'Designation Distribution',
          data: counts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF99CC'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
  
  createMissingDataChart() {
    const missingDataCount = this.rowData.filter((contact: { email: any; company_name: any; }) => !contact.email || !contact.company_name).length;
    const validDataCount = this.rowData.length - missingDataCount;
  
    const ctx = document.getElementById('missingDataChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Valid Contacts', 'Missing Data'],
        datasets: [{
          data: [validDataCount, missingDataCount],
          backgroundColor: ['#C197D2', '#D3B1C2'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
  

  updateChart() {
    // Logic to update chart with new data (nonDuplicateContacts, duplicateContacts)
  }
}

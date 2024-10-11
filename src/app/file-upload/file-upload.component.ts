import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef  } from '@angular/core';
import { ColDef,GridApi, GridOptions, GridReadyEvent, RowClassParams, RowClassRules, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import { getData } from "../service/contact-data";
import { DuplicateRowRenderer } from './duplicaterowrender';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from '../service/data-sharing-service'
import { themeQuartz } from '@ag-grid-community/theming';

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz
	.withParams({
        accentColor: "#15BDE8",
        backgroundColor: "#FEFEFF",
        borderColor: "#C20C0C00",
        borderRadius: 20,
        browserColorScheme: "light",
        cellHorizontalPaddingScale: 1,
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        columnBorder: true,
        fontFamily: {
            googleFont: "Roboto"
        },
        fontSize: 16,
        foregroundColor: "#060606",
        headerBackgroundColor: "#5B6163",
        headerFontSize: 14,
        headerFontWeight: 500,
        headerTextColor: "#FFFFFF",
        headerVerticalPaddingScale: 0.9,
        iconSize: 20,
        oddRowBackgroundColor: "#F5F5F5",
        rowBorder: true,
        rowVerticalPaddingScale: 1.2,
        sidePanelBorder: false,
        spacing: 8,
        wrapperBorder: true,
        wrapperBorderRadius: 0
    });

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  file: File | null = null;
  fileName: any;
  public gridOptions!: GridOptions;
  public rowData: any[] = getData();
  
  // Sample data with email and company_name
  // public rowData: any[] = [
  //   { id: 1, client_name: 'Client 1', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', company_name: 'Company A', designation: 'Manager' },
  //   { id: 2, client_name: 'Client 2', first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', company_name: 'Company B', designation: 'Engineer' },
  //   { id: 3, client_name: 'Client 3', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', company_name: 'Company A', designation: 'Manager' }, // Duplicate
  //   { id: 4, client_name: 'Client 4', first_name: 'Mike', last_name: 'Jones', email: 'mike.jones@example.com', company_name: 'Company C', designation: 'Developer' },
  //   { id: 5, client_name: 'Client 5', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', company_name: 'Company A', designation: 'Manager' } // Duplicate
  // ];
  uploadProgress: number = 0;
  errorMessage: string = '';
  gridVisible = true;
  private gridApi!: GridApi;
  public themeClass =
    "ag-theme-quartz";
  // track duplicate entries by email and company_name
  private duplicateMap: { [key: string]: number } = {};
  public duplicateRows: any[] = [];  // To store duplicate rows
  highlightDuplicatesActive: boolean = false; // Track if duplicates are highlighted

  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };

  columnDefs: ColDef[] = [
    { field: 'client_name', headerName: 'Client Name' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'company_name', headerName: 'Company Name' },
    { field: 'designation', headerName: 'Designation'},
  ];
  constructor(private http: HttpClient,private elementRef: ElementRef,
    private snackBar: MatSnackBar,private dataSharingService: DataSharingService
  )
  {

  }
  

  ngAfterViewInit() {
    window.addEventListener('scroll', this.checkScrollPosition);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  }
  checkScrollPosition = () => {
    const scrollPosition = window.scrollY;
    const buttonElement = this.elementRef.nativeElement.querySelector('.scroll-down-button');

    if (scrollPosition > 200) {
      buttonElement.classList.add('hidden');
    } else {
      buttonElement.classList.remove('hidden');
    }
  }
  
  scrollHandler = () => {
    const scrollPosition = window.scrollY;
    const button = this.elementRef.nativeElement.querySelector('.scroll-to-top-button');
    if (scrollPosition > 200) {
      // button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  };
  onFileSelected(event: any) {
    console.log('File selected:', event.target.files[0]);
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
    this.uploadFile();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("forgrid") as HTMLInputElement).value,
    );
  }

// Row class rules for duplicate highlighting
// public rowClassRules: RowClassRules = {
//   'duplicate-row': (params) => {
//     const isDuplicate = params.data.isDuplicate === true;
//     // console.log(`Row ID: ${params.data.id}, isDuplicate: ${isDuplicate}`); // Debugging output
//     return isDuplicate;
//   }
// };

public rowClassRules: RowClassRules = {
  'duplicate-row': (params) => params.data.isDuplicate === true,
};

public getRowStyle = (params: RowClassParams<any, any>) => {
  if (params.data.highlightColor) {
    return { backgroundColor: params.data.highlightColor };
  }
  return undefined; // instead of null
};


  

onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  // this.gridApi.forEachNode(function (rowNode) {
  //   console.log(rowNode.data,"ROWDATA");
  // });

  // console.log('Grid Ready. Row Data:', this.rowData);  // Check row data
}
setDuplicateHighlight() {
  if (this.highlightDuplicatesActive) {
    // Revert highlighting
    this.gridApi.forEachNode((rowNode) => {
      rowNode.setData({
        ...rowNode.data,
        isDuplicate: false, // Reset isDuplicate
        highlightColor: null, // Reset color
      });
    });
    this.highlightDuplicatesActive = false; // Update state
    this.snackBar.open('Duplicate Highlight Removed', 'Close', {
      duration: 3000, 
      verticalPosition: 'bottom', 
      horizontalPosition: 'center', 
    });
  } else {
    // Find duplicates
    const duplicates = this.findDuplicateRows();
    console.log('Found duplicates:', duplicates);

    if (duplicates.length === 0) {
      this.snackBar.open('No duplicates found', 'Close', {
        duration: 3000, 
        verticalPosition: 'bottom', 
        horizontalPosition: 'center',
      });
      return;
    }

    // Predefined colors or you can dynamically generate them
    const colors = ['#ADD8E6', '#FFD700', '#FF6347', '#90EE90', '#FFA07A', '#9370DB', '#FFC0CB'];
    let colorIndex = 0;

    const duplicateColors: { [key: string]: string } = {}; // To track colors for each dup_group_id

    this.gridApi.forEachNode((rowNode) => {
      const dupGroupId = rowNode.data.dup_group_id;

      // Check if this dup_group_id has duplicates
      const isDuplicate = duplicates.some(dup => dup.dup_group_id === dupGroupId);

      if (isDuplicate) {
        // Assign a color to the group if it doesn't already have one
        if (!duplicateColors[dupGroupId]) {
          duplicateColors[dupGroupId] = colors[colorIndex % colors.length];
          colorIndex++; // Move to the next color
        }

        rowNode.setData({
          ...rowNode.data,
          isDuplicate: true,
          highlightColor: duplicateColors[dupGroupId],
        });
      } else {
        rowNode.setData({
          ...rowNode.data,
          isDuplicate: false, // Set to false if not a duplicate
          highlightColor: null,
        });
      }
    });

    this.highlightDuplicatesActive = true; // Update state
    this.snackBar.open('Duplicate records have been highlighted', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
  this.gridApi.refreshCells();
}



  // // DUPLICATE ROWS
  // findDuplicateRows() {
  //   const uniqueKeys: { [key: string]: boolean } = {};
  //   const duplicates: any[] = [];
  
  //   this.rowData.forEach(row => {
  //     const key = `${row.email}-${row.company_name}`;
  //     if (uniqueKeys[key]) {
  //       duplicates.push(row); 
  //     } else {
  //       uniqueKeys[key] = true; 
  //     }
  //   });
    
  //   // console.log(duplicates,"Duplicates")
  //   this.dataSharingService.updateNonDuplicates(duplicates);
  //   return duplicates; 
  // }

  // DUPLICATE ROWS
findDuplicateRows() {
  const uniqueKeys: { [key: string]: boolean } = {};
  const duplicates: any[] = [];

  this.rowData.forEach(row => {
    const key = row.dup_group_id;
    if (uniqueKeys[key]) {
      console.log(row.dup_group_id,"DUPLICATE IDS ")
      duplicates.push(row); 
    } else {
      uniqueKeys[key] = true; 
    }
  });
  
  // console.log(duplicates,"Duplicates")
  this.dataSharingService.updateNonDuplicates(duplicates);
  // console.log(duplicates,"DUPLICATES FOUND")
  
  return duplicates; 
}
  
  removeDuplicates() {
    // Get the duplicate rows based on your findDuplicateRows() method
    const duplicates = this.findDuplicateRows();
  
    // Filter out the duplicate rows from the current rowData
    const newData = this.rowData.filter(row => !duplicates.includes(row));
  
    // Use the applyTransaction method to remove rows that are duplicates
    const rowsToRemove = this.rowData.filter(row => duplicates.includes(row));
  
    // Remove duplicate rows using applyTransaction
    this.gridApi.applyTransaction({ remove: rowsToRemove });
  
    // console.log("Removed duplicates:", rowsToRemove);
    
    
    this.gridApi.redrawRows();
    // Update rowData to reflect the new state of the grid
    this.rowData = newData;
    this.dataSharingService.updatedRecords(newData)
    
    this.snackBar.open('Duplicate records have been removed', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'center', 
    });
  }
  
  
  

  uploadFile(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.loadContacts(); 
      this.http.post('http://localhost:8000/upload-contacts/', formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          
          this.loadContacts(); 
          this.gridVisible = true; // Load the contacts into the grid
          this.errorMessage = ''; // Clear any previous errors
        }
      }, error => {
        this.errorMessage = 'File upload failed';
        console.error('Upload error:', error);
      });
    } else {
      this.errorMessage = 'No file selected';
    }
  }
  
  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

  loadContacts(): void {
    // this.http.get<any[]>('http://localhost:8000/contacts/').subscribe(data => {
      // this.rowData = data;
      console.log(this.rowData,"ROW DATA")
    // });
  }

dropFile(event: any) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  this.file = file;
  this.fileName = file.name;

  this.uploadFile();
}

allowDrop(event: any) {
  event.preventDefault();
}

slideUp() {
  const fileUploadContainer = document.querySelector('.file-upload-container');
  if (fileUploadContainer) {
    fileUploadContainer.classList.add('slide-up');
    // this.loadContacts();
  }
}

}

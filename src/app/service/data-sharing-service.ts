import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getData } from "./contact-data";
@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private duplicatesSubject = new BehaviorSubject<any[]>([]);
  private nonDuplicatesSubject = new BehaviorSubject<any[]>([]);
  private updatedRecordsSubject = new BehaviorSubject<any[]>([]);
  private totalRecordsSubject = new BehaviorSubject<any[]>([]);
  public rowData: any[] = getData();
  duplicates$ = this.duplicatesSubject.asObservable();
  nonDuplicates$ = this.nonDuplicatesSubject.asObservable();
  updatedRecords$ = this.updatedRecordsSubject.asObservable();
  totalRecords$ = this.totalRecordsSubject.asObservable();
  updateDuplicates(duplicates: any[]) {
    this.duplicatesSubject.next(duplicates);
  }

  updateNonDuplicates(nonDuplicates: any[]) {
    this.nonDuplicatesSubject.next(nonDuplicates);
  }

  updatedRecords(updatedrecords: any []){
    this.updatedRecordsSubject.next(updatedrecords)
  }

  totalRecords(){
    console.log(this.rowData)
    this.totalRecordsSubject.next(this.rowData)
  }

  findDuplicateRows() {
    const uniqueKeys: { [key: string]: boolean } = {};
    const duplicates: any[] = [];
  
    this.rowData.forEach(row => {
      const key = `${row.email}-${row.company_name}`;
      if (uniqueKeys[key]) {
        duplicates.push(row); // Add row to duplicates if already found
      } else {
        uniqueKeys[key] = true; // Mark as found
      }
    });
    
    // console.log(duplicates,"Duplicates")
    this.updateDuplicates(duplicates);
    return duplicates; // Return only duplicate records
  }
}

// duplicate-row-renderer.component.ts

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-duplicate-row-renderer',
    template: `
        <div [ngStyle]="getRowStyle()">
            {{ params.value }}
        </div>
    `,
})
export class DuplicateRowRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        this.params = params;
        return true; // Refreshes the component
    }

    getRowStyle() {
        return this.params.data.isDuplicate ? { 'background-color': 'blue' } : {};
    }
}

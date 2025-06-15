import { Component, Input, Output, EventEmitter, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions';
  width?: string;
}

export interface TableAction {
  label: string;
  icon: string;
  color?: 'primary' | 'accent' | 'warn';
  action: (row: any) => void;
  visible?: (row: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  template: `
    <div class="data-table-container">
      <!-- Search and Actions -->
      <div class="table-header" *ngIf="showSearch || showActions">
        <mat-form-field *ngIf="showSearch" appearance="outline" class="search-field">
          <mat-label>Search</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <div class="table-actions" *ngIf="showActions">
          <ng-content select="[slot=actions]"></ng-content>
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table mat-table [dataSource]="dataSource" matSort class="data-table">
          <!-- Selection Column -->
          <ng-container matColumnDef="select" *ngIf="showSelection">
            <th mat-header-cell *matHeaderCellDef>
              <mat-checkbox (change)="$event ? masterToggle() : null"
                           [checked]="selection.hasValue() && isAllSelected()"
                           [indeterminate]="selection.hasValue() && !isAllSelected()">
              </mat-checkbox>
            </th>
            <td mat-cell *matCellDef="let row">
              <mat-checkbox (click)="$event.stopPropagation()"
                           (change)="$event ? selection.toggle(row) : null"
                           [checked]="selection.isSelected(row)">
              </mat-checkbox>
            </td>
          </ng-container>

          <!-- Dynamic Columns -->
          <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
            <!-- <th mat-header-cell *matHeaderCellDef 
                [mat-sort-header]="column.sortable ? column.key : null"
                [style.width]="column.width">
              {{ column.label }}
            </th> -->
            <td mat-cell *matCellDef="let row" [style.width]="column.width">
              <ng-container [ngSwitch]="column.type">
                <span *ngSwitchCase="'date'">{{ row[column.key] | date:'short' }}</span>
                <span *ngSwitchCase="'boolean'">
                  <mat-icon *ngIf="row[column.key]" color="primary">check</mat-icon>
                  <mat-icon *ngIf="!row[column.key]" color="warn">close</mat-icon>
                </span>
                <div *ngSwitchCase="'actions'" class="action-buttons">
                  <button *ngFor="let action of actions" 
                          mat-icon-button 
                          [color]="action.color || 'primary'"
                          (click)="action.action(row)"
                          [style.display]="action.visible ? (action.visible(row) ? 'inline-block' : 'none') : 'inline-block'"
                          [matTooltip]="action.label">
                    <mat-icon>{{ action.icon }}</mat-icon>
                  </button>
                </div>
                <span *ngSwitchDefault>{{ row[column.key] }}</span>
              </ng-container>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
              (click)="onRowClick(row)"
              [class.selected]="showSelection && selection.isSelected(row)"></tr>
        </table>
      </div>

      <!-- Paginator -->
      <mat-paginator *ngIf="showPagination"
                     [pageSizeOptions]="pageSizeOptions"
                     showFirstLastButtons>
      </mat-paginator>

      <!-- No Data -->
      <div *ngIf="dataSource.data.length === 0" class="no-data">
        <mat-icon>inbox</mat-icon>
        <h3>{{ noDataMessage }}</h3>
      </div>
    </div>
  `,
  styles: [`
    .data-table-container {
      width: 100%;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      gap: 16px;
    }

    .search-field {
      max-width: 300px;
    }

    .table-actions {
      display: flex;
      gap: 8px;
    }

    .table-wrapper {
      overflow: auto;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .data-table {
      width: 100%;
      
      tr.selected {
        background-color: #f5f5f5;
      }
      
      .action-buttons {
        display: flex;
        gap: 4px;
      }
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
      
      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
      }
      
      h3 {
        margin: 0;
        font-weight: 400;
      }
    }
  `]
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() showSearch = true;
  @Input() showActions = true;
  @Input() showSelection = false;
  @Input() showPagination = true;
  @Input() pageSizeOptions = [5, 10, 25, 50];
  @Input() noDataMessage = 'No data available';

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.updateDisplayedColumns();
    
    this.selection.changed.subscribe(() => {
      this.selectionChange.emit(this.selection.selected);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = [];
    
    if (this.showSelection) {
      this.displayedColumns.push('select');
    }
    
    this.displayedColumns.push(...this.columns.map(col => col.key));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
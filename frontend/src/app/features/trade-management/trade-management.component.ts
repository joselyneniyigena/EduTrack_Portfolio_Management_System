import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, forkJoin, EMPTY, of } from 'rxjs';
import { takeUntil, finalize, catchError, switchMap, tap } from 'rxjs/operators';
import { Sector, Trade, RTQFLevel } from '../../core/models/trade-management';
import { TradeManagementService } from './service/trade-management.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-trade-management',
  templateUrl: './trade-management.component.html',
  styleUrls: ['./trade-management.component.scss']
})
export class TradeManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sectorPaginator') sectorPaginator!: MatPaginator;
  @ViewChild('tradePaginator') tradePaginator!: MatPaginator;
  @ViewChild('rtqfPaginator') rtqfPaginator!: MatPaginator;
  @ViewChild('sectorSort') sectorSort!: MatSort;
  @ViewChild('tradeSort') tradeSort!: MatSort;
  @ViewChild('rtqfSort') rtqfSort!: MatSort;

  private destroy$ = new Subject<void>();

  // Data sources
  sectorDataSource = new MatTableDataSource<Sector>();
  tradeDataSource = new MatTableDataSource<Trade>();
  rtqfDataSource = new MatTableDataSource<RTQFLevel>();

  // Table columns
  sectorColumns: string[] = ['id', 'name', 'abbreviation', 'description', 'rtqfLevel', 'actions'];
  tradeColumns: string[] = ['id', 'name', 'abbreviation', 'description', 'sector', 'actions'];
  rtqfColumns: string[] = ['id', 'name', 'description', 'actions'];

  // Forms
  sectorForm!: FormGroup;
  tradeForm!: FormGroup;
  rtqfForm!: FormGroup;

  // UI State
  activeTab = 0;
  isLoading = false;
  editMode = false;
  selectedEntity: any = null;

  // Data
  sectors: Sector[] = [];
  trades: Trade[] = [];
  rtqfLevels: RTQFLevel[] = [];

  constructor(
    private fb: FormBuilder,
    private tradeManagementService: TradeManagementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    this.setupTableSorting();
    this.setupTablePagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.sectorForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      abbreviation: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      rtqfLevelId: ['', Validators.required]
    });

    this.tradeForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      abbreviation: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      sectorId: ['', Validators.required]
    });

    this.rtqfForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  private setupTableSorting(): void {
    this.sectorDataSource.sort = this.sectorSort;
    this.tradeDataSource.sort = this.tradeSort;
    this.rtqfDataSource.sort = this.rtqfSort;
  }

  private setupTablePagination(): void {
    this.sectorDataSource.paginator = this.sectorPaginator;
    this.tradeDataSource.paginator = this.tradePaginator;
    this.rtqfDataSource.paginator = this.rtqfPaginator;
  }

  loadAllData(): void {
    this.isLoading = true;

    // Load in sequence to identify issues
    this.tradeManagementService.getAllSectors().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Sectors failed:', error);
        return of([]);
      }),
      switchMap(sectors => {
        this.sectors = sectors;
        this.sectorDataSource.data = this.sectors;
        console.log('Sectors loaded:', sectors.length);

        return this.tradeManagementService.getAllTrades().pipe(
          catchError(error => {
            console.error('Trades failed:', error);
            return of([]);
          })
        );
      }),
      switchMap(trades => {
        this.trades = trades;
        this.tradeDataSource.data = this.trades;
        console.log('Trades loaded:', trades.length);

        return this.tradeManagementService.getAllRTQFLevels().pipe(
          catchError(error => {
            console.error('RTQF Levels failed:', error);
            return of([]);
          })
        );
      }),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (rtqfLevels) => {
        this.rtqfLevels = rtqfLevels;
        this.rtqfDataSource.data = this.rtqfLevels;
        console.log('RTQF Levels loaded:', rtqfLevels.length);
        console.log('All data loaded successfully');
      },
      error: (error) => {
        console.error('Unexpected error in sequential loading:', error);
        this.showError('Failed to load data');
      }
    });
  }

  loadSectors(): void {
    this.tradeManagementService.getAllSectors().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading sectors:', error);
        this.showError('Failed to load sectors');
        return EMPTY;
      })
    ).subscribe({
      next: (sectors) => {
        this.sectors = sectors;
        this.sectorDataSource.data = this.sectors;
      }
    });
  }

  loadTrades(): void {
    this.tradeManagementService.getAllTrades().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading trades:', error);
        this.showError('Failed to load trades');
        return EMPTY;
      })
    ).subscribe({
      next: (trades) => {
        this.trades = trades;
        this.tradeDataSource.data = this.trades;
      }
    });
  }

  loadRTQFLevels(): void {
    this.tradeManagementService.getAllRTQFLevels().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error loading RTQF levels:', error);
        this.showError('Failed to load RTQF levels');
        return EMPTY;
      })
    ).subscribe({
      next: (rtqfLevels) => {
        this.rtqfLevels = rtqfLevels;
        this.rtqfDataSource.data = this.rtqfLevels;
      }
    });
  }

  // CRUD Operations - Sectors
  createSector(): void {
    if (this.sectorForm.valid) {
      this.isLoading = true;
      const formValue = this.sectorForm.value;

      const sectorData = {
        name: formValue.name,
        abbreviation: formValue.abbreviation,
        description: formValue.description,
        rtqfLevelId: formValue.rtqfLevelId,
        rtqf: null
      };

      this.tradeManagementService.createSector(sectorData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error creating sector:', error);
          this.showError('Failed to create sector');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadSectors();
          this.resetForm('sector');
          this.showSuccess('Sector created successfully');
        }
      });
    }
  }

  updateSector(): void {
    if (this.sectorForm.valid && this.selectedEntity) {
      this.isLoading = true;
      const formValue = this.sectorForm.value;

      const sectorData = {
        name: formValue.name,
        abbreviation: formValue.abbreviation,
        description: formValue.description,
        rtqfLevelId: formValue.rtqfLevelId
      };

      this.tradeManagementService.updateSector(this.selectedEntity.id, sectorData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error updating sector:', error);
          this.showError('Failed to update sector');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadSectors();
          this.resetForm('sector');
          this.showSuccess('Sector updated successfully');
        }
      });
    }
  }

  deleteSector(sector: Sector): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Sector',
        message: `Are you sure you want to delete "${sector.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      switchMap(result => {
        if (result) {
          this.isLoading = true;
          return this.tradeManagementService.deleteSector(sector.id).pipe(
            finalize(() => this.isLoading = false),
            catchError(error => {
              console.error('Error deleting sector:', error);
              this.showError('Failed to delete sector');
              return EMPTY;
            })
          );
        }
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.loadAllData();
        this.showSuccess('Sector deleted successfully');
      }
    });
  }

  // CRUD Operations - Trades
  createTrade(): void {
    if (this.tradeForm.valid) {
      this.isLoading = true;
      const formValue = this.tradeForm.value;

      const tradeData = {
        name: formValue.name,
        abbreviation: formValue.abbreviation,
        description: formValue.description,
        sectorId: formValue.sectorId
      };

      this.tradeManagementService.createTrade(tradeData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error creating trade:', error);
          this.showError('Failed to create trade');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadTrades();
          this.resetForm('trade');
          this.showSuccess('Trade created successfully');
        }
      });
    }
  }

  updateTrade(): void {
    if (this.tradeForm.valid && this.selectedEntity) {
      this.isLoading = true;
      const formValue = this.tradeForm.value;

      const tradeData = {
        name: formValue.name,
        abbreviation: formValue.abbreviation,
        description: formValue.description,
        sectorId: formValue.sectorId
      };

      this.tradeManagementService.updateTrade(this.selectedEntity.id, tradeData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error updating trade:', error);
          this.showError('Failed to update trade');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadTrades();
          this.resetForm('trade');
          this.showSuccess('Trade updated successfully');
        }
      });
    }
  }

  deleteTrade(trade: Trade): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Trade',
        message: `Are you sure you want to delete "${trade.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      switchMap(result => {
        if (result) {
          this.isLoading = true;
          return this.tradeManagementService.deleteTrade(trade.id).pipe(
            finalize(() => this.isLoading = false),
            catchError(error => {
              console.error('Error deleting trade:', error);
              this.showError('Failed to delete trade');
              return EMPTY;
            })
          );
        }
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.loadTrades();
        this.showSuccess('Trade deleted successfully');
      }
    });
  }

  // CRUD Operations - RTQF Levels
  createRTQFLevel(): void {
    if (this.rtqfForm.valid) {
      this.isLoading = true;
      const formValue = this.rtqfForm.value;

      const levelData = {
        name: formValue.name,
        description: formValue.description
      };

      this.tradeManagementService.createRTQFLevel(levelData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error creating RTQF level:', error);
          this.showError('Failed to create RTQF level');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadRTQFLevels();
          this.resetForm('rtqf');
          this.showSuccess('RTQF Level created successfully');
        }
      });
    }
  }

  updateRTQFLevel(): void {
    if (this.rtqfForm.valid && this.selectedEntity) {
      this.isLoading = true;
      const formValue = this.rtqfForm.value;

      const levelData = {
        name: formValue.name,
        description: formValue.description
      };

      this.tradeManagementService.updateRTQFLevel(this.selectedEntity.id, levelData).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false),
        catchError(error => {
          console.error('Error updating RTQF level:', error);
          this.showError('Failed to update RTQF level');
          return EMPTY;
        })
      ).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm('rtqf');
          this.showSuccess('RTQF Level updated successfully');
        }
      });
    }
  }

  deleteRTQFLevel(level: RTQFLevel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete RTQF Level',
        message: `Are you sure you want to delete "${level.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      switchMap(result => {
        if (result) {
          this.isLoading = true;
          return this.tradeManagementService.deleteRTQFLevel(level.id).pipe(
            finalize(() => this.isLoading = false),
            catchError(error => {
              console.error('Error deleting RTQF level:', error);
              this.showError('Failed to delete RTQF level');
              return EMPTY;
            })
          );
        }
        return EMPTY;
      })
    ).subscribe({
      next: () => {
        this.loadAllData();
        this.showSuccess('RTQF Level deleted successfully');
      }
    });
  }

  // Form Management
  editSector(sector: Sector): void {
    this.editMode = true;
    this.selectedEntity = sector;
    this.sectorForm.patchValue({
      id: sector.id,
      name: sector.name,
      abbreviation: sector.abbreviation,
      description: sector.description,
      rtqfLevelId: sector.rtqfLevel?.id
    });
  }

  editTrade(trade: Trade): void {
    this.editMode = true;
    this.selectedEntity = trade;
    this.tradeForm.patchValue({
      id: trade.id,
      name: trade.name,
      abbreviation: trade.abbreviation,
      description: trade.description,
      sectorId: trade.sector?.id
    });
  }

  editRTQFLevel(level: RTQFLevel): void {
    this.editMode = true;
    this.selectedEntity = level;
    this.rtqfForm.patchValue({
      id: level.id,
      name: level.name,
      description: level.description
    });
  }

  resetForm(formType: 'sector' | 'trade' | 'rtqf'): void {
    this.editMode = false;
    this.selectedEntity = null;

    switch (formType) {
      case 'sector':
        this.sectorForm.reset();
        break;
      case 'trade':
        this.tradeForm.reset();
        break;
      case 'rtqf':
        this.rtqfForm.reset();
        break;
    }
  }

  // Search functionality
  applyFilter(event: Event, dataSource: MatTableDataSource<any>): void {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  // Form submission handlers
  onSectorSubmit(): void {
    if (this.editMode) {
      this.updateSector();
    } else {
      this.createSector();
    }
  }

  onTradeSubmit(): void {
    if (this.editMode) {
      this.updateTrade();
    } else {
      this.createTrade();
    }
  }

  onRTQFSubmit(): void {
    if (this.editMode) {
      this.updateRTQFLevel();
    } else {
      this.createRTQFLevel();
    }
  }

  // Helper methods
  getRTQFLevelName(levelId: number): string {
    const level = this.rtqfLevels.find(l => l.id === levelId);
    return level ? level.name : 'Unknown';
  }

  getSectorName(sectorId: number): string {
    const sector = this.sectors.find(s => s.id === sectorId);
    return sector ? sector.name : 'Unknown';
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  // Tab change handler
  onTabChange(index: number): void {
    this.activeTab = index;
    this.resetForm('sector');
    this.resetForm('trade');
    this.resetForm('rtqf');
  }
}
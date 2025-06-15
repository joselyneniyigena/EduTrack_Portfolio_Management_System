import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { 
  Sector, 
  Trade, 
  RTQFLevel, 
  SectorCreateRequest, 
  TradeCreateRequest, 
  RTQFLevelCreateRequest,
} from '../../../core/models/trade-management';
import { ApiService, QueryParams } from '../../../core/service/api.service';
import { PageableResponse } from '../../../core/models/pageable-response';

@Injectable({
  providedIn: 'root'
})
export class TradeManagementService {
  private readonly SECTORS_ENDPOINT = 'sectors';
  private readonly TRADES_ENDPOINT = 'trades';
  private readonly RTQF_LEVELS_ENDPOINT = 'rtqf-levels';

  constructor(private apiService: ApiService) {}

  // ===================
  // SECTOR METHODS
  // ===================

  /**
   * Get all sectors
   * @returns Observable<Sector[]>
   */
  getAllSectors(): Observable<Sector[]> {
    return this.apiService.get<Sector[]>(`${this.SECTORS_ENDPOINT}`);
  }

  /**
   * Get sectors with pagination and search
   * @param params Query parameters for pagination and search
   * @returns Observable<PageableResponse<Sector>>
   */
  getSectors(params?: QueryParams): Observable<PageableResponse<Sector>> {
    return this.apiService.getPageable<Sector>(this.SECTORS_ENDPOINT, params);
  }

  /**
   * Get sector by ID
   * @param id Sector ID
   * @returns Observable<Sector>
   */
  getSectorById(id: number): Observable<Sector> {
    return this.apiService.getById<Sector>(this.SECTORS_ENDPOINT, id);
  }

  /**
   * Create new sector
   * @param sectorData Sector creation data
   * @returns Observable<Sector>
   */
  createSector(sectorData: SectorCreateRequest): Observable<Sector> {
    return this.apiService.post<Sector>(this.SECTORS_ENDPOINT, sectorData);
  }

  /**
   * Update existing sector
   * @param id Sector ID
   * @param sectorData Sector update data
   * @returns Observable<Sector>
   */
  updateSector(id: number, sectorData: SectorCreateRequest): Observable<Sector> {
    return this.apiService.put<Sector>(this.SECTORS_ENDPOINT, id, sectorData);
  }

  /**
   * Delete sector
   * @param id Sector ID
   * @returns Observable<void>
   */
  deleteSector(id: number): Observable<void> {
    return this.apiService.delete<void>(this.SECTORS_ENDPOINT, id);
  }

  /**
   * Get sectors by RTQF Level
   * @param rtqfLevelId RTQF Level ID
   * @returns Observable<Sector[]>
   */
  getSectorsByRTQFLevel(rtqfLevelId: number): Observable<Sector[]> {
    return this.apiService.get<Sector[]>(`${this.SECTORS_ENDPOINT}/by-rtqf/${rtqfLevelId}`);
  }

  // ===================
  // TRADE METHODS
  // ===================

  /**
   * Get all trades
   * @returns Observable<Trade[]>
   */
  getAllTrades(): Observable<Trade[]> {
    return this.apiService.get<Trade[]>(`${this.TRADES_ENDPOINT}`);
  }

  /**
   * Get trades with pagination and search
   * @param params Query parameters for pagination and search
   * @returns Observable<PageableResponse<Trade>>
   */
  getTrades(params?: QueryParams): Observable<PageableResponse<Trade>> {
    return this.apiService.getPageable<Trade>(this.TRADES_ENDPOINT, params);
  }

  /**
   * Get trade by ID
   * @param id Trade ID
   * @returns Observable<Trade>
   */
  getTradeById(id: number): Observable<Trade> {
    return this.apiService.getById<Trade>(this.TRADES_ENDPOINT, id);
  }

  /**
   * Create new trade
   * @param tradeData Trade creation data
   * @returns Observable<Trade>
   */
  createTrade(tradeData: TradeCreateRequest): Observable<Trade> {
    return this.apiService.post<Trade>(this.TRADES_ENDPOINT, tradeData);
  }

  /**
   * Update existing trade
   * @param id Trade ID
   * @param tradeData Trade update data
   * @returns Observable<Trade>
   */
  updateTrade(id: number, tradeData: TradeCreateRequest): Observable<Trade> {
    return this.apiService.put<Trade>(this.TRADES_ENDPOINT, id, tradeData);
  }

  /**
   * Delete trade
   * @param id Trade ID
   * @returns Observable<void>
   */
  deleteTrade(id: number): Observable<void> {
    return this.apiService.delete<void>(this.TRADES_ENDPOINT, id);
  }

  /**
   * Get trades by sector
   * @param sectorId Sector ID
   * @returns Observable<Trade[]>
   */
  getTradesBySector(sectorId: number): Observable<Trade[]> {
    return this.apiService.get<Trade[]>(`${this.TRADES_ENDPOINT}/by-sector/${sectorId}`);
  }

  // ===================
  // RTQF LEVEL METHODS
  // ===================

  /**
   * Get all RTQF levels
   * @returns Observable<RTQFLevel[]>
   */
  getAllRTQFLevels(): Observable<RTQFLevel[]> {
    return this.apiService.get<RTQFLevel[]>(`${this.RTQF_LEVELS_ENDPOINT}`);
  }

  /**
   * Get RTQF levels with pagination and search
   * @param params Query parameters for pagination and search
   * @returns Observable<PageableResponse<RTQFLevel>>
   */
  getRTQFLevels(params?: QueryParams): Observable<PageableResponse<RTQFLevel>> {
    return this.apiService.getPageable<RTQFLevel>(this.RTQF_LEVELS_ENDPOINT, params);
  }

  /**
   * Get RTQF level by ID
   * @param id RTQF Level ID
   * @returns Observable<RTQFLevel>
   */
  getRTQFLevelById(id: number): Observable<RTQFLevel> {
    return this.apiService.getById<RTQFLevel>(this.RTQF_LEVELS_ENDPOINT, id);
  }

  /**
   * Create new RTQF level
   * @param levelData RTQF Level creation data
   * @returns Observable<RTQFLevel>
   */
  createRTQFLevel(levelData: RTQFLevelCreateRequest): Observable<RTQFLevel> {
    return this.apiService.post<RTQFLevel>(this.RTQF_LEVELS_ENDPOINT, levelData);
  }

  /**
   * Update existing RTQF level
   * @param id RTQF Level ID
   * @param levelData RTQF Level update data
   * @returns Observable<RTQFLevel>
   */
  updateRTQFLevel(id: number, levelData: RTQFLevelCreateRequest): Observable<RTQFLevel> {
    return this.apiService.put<RTQFLevel>(this.RTQF_LEVELS_ENDPOINT, id, levelData);
  }

  /**
   * Delete RTQF level
   * @param id RTQF Level ID
   * @returns Observable<void>
   */
  deleteRTQFLevel(id: number): Observable<void> {
    return this.apiService.delete<void>(this.RTQF_LEVELS_ENDPOINT, id);
  }

  // ===================
  // UTILITY METHODS
  // ===================

  /**
   * Validate if sector can be deleted (no associated trades)
   * @param sectorId Sector ID
   * @returns Observable<boolean>
   */
  validateSectorDeletion(sectorId: number): Observable<boolean> {
    return this.getTradesBySector(sectorId).pipe(
      map(trades => trades.length === 0),
      catchError(error => {
        console.error(`Error validating sector deletion ${sectorId}:`, error);
        return of(false);
      })
    );
  }

  /**
   * Validate if RTQF level can be deleted (no associated sectors)
   * @param rtqfLevelId RTQF Level ID
   * @returns Observable<boolean>
   */
  validateRTQFLevelDeletion(rtqfLevelId: number): Observable<boolean> {
    return this.getSectorsByRTQFLevel(rtqfLevelId).pipe(
      map(sectors => sectors.length === 0),
      catchError(error => {
        console.error(`Error validating RTQF level deletion ${rtqfLevelId}:`, error);
        return of(false);
      })
    );
  }

  /**
   * Search sectors by name or abbreviation
   * @param searchTerm Search term
   * @param params Additional query parameters
   * @returns Observable<PageableResponse<Sector>>
   */
  searchSectors(searchTerm: string, params?: QueryParams): Observable<PageableResponse<Sector>> {
    const searchParams = { ...params, search: searchTerm };
    return this.getSectors(searchParams);
  }

  /**
   * Search trades by name, abbreviation, or sector
   * @param searchTerm Search term
   * @param params Additional query parameters
   * @returns Observable<PageableResponse<Trade>>
   */
  searchTrades(searchTerm: string, params?: QueryParams): Observable<PageableResponse<Trade>> {
    const searchParams = { ...params, search: searchTerm };
    return this.getTrades(searchParams);
  }

  /**
   * Search RTQF levels by name or description
   * @param searchTerm Search term
   * @param params Additional query parameters
   * @returns Observable<PageableResponse<RTQFLevel>>
   */
  searchRTQFLevels(searchTerm: string, params?: QueryParams): Observable<PageableResponse<RTQFLevel>> {
    const searchParams = { ...params, search: searchTerm };
    return this.getRTQFLevels(searchParams);
  }

  // ===================
  // BULK OPERATIONS
  // ===================

  /**
   * Get sectors with their associated trades count
   * @returns Observable<Array<{sector: Sector, tradeCount: number}>>
   */
  getSectorsWithTradeCount(): Observable<Array<{sector: Sector, tradeCount: number}>> {
    return this.getAllSectors().pipe(
      map(sectors => 
        sectors.map(sector => ({
          sector,
          tradeCount: this.trades?.filter(trade => trade.sector?.id === sector.id).length || 0
        }))
      ),
      catchError(error => {
        console.error('Error getting sectors with trade count:', error);
        return of([]);
      })
    );
  }

  /**
   * Get RTQF levels with their associated sectors count
   * @returns Observable<Array<{rtqfLevel: RTQFLevel, sectorCount: number}>>
   */
  getRTQFLevelsWithSectorCount(): Observable<Array<{rtqfLevel: RTQFLevel, sectorCount: number}>> {
    return this.getAllRTQFLevels().pipe(
      map(rtqfLevels => 
        rtqfLevels.map(rtqfLevel => ({
          rtqfLevel,
          sectorCount: this.sectors?.filter(sector => sector.rtqfLevel?.id === rtqfLevel.id).length || 0
        }))
      ),
      catchError(error => {
        console.error('Error getting RTQF levels with sector count:', error);
        return of([]);
      })
    );
  }

  /**
   * Get full hierarchy: RTQF Levels -> Sectors -> Trades
   * @returns Observable<Array<{rtqfLevel: RTQFLevel, sectors: Array<{sector: Sector, trades: Trade[]}>\}>>
   */
  getFullHierarchy(): Observable<Array<{rtqfLevel: RTQFLevel, sectors: Array<{sector: Sector, trades: Trade[]}>}>> {
    return this.getAllRTQFLevels().pipe(
      map(rtqfLevels => 
        rtqfLevels.map(rtqfLevel => {
          const sectorsForLevel = this.sectors?.filter(sector => sector.rtqfLevel?.id === rtqfLevel.id) || [];
          const sectorsWithTrades = sectorsForLevel.map(sector => ({
            sector,
            trades: this.trades?.filter(trade => trade.sector?.id === sector.id) || []
          }));
          
          return {
            rtqfLevel,
            sectors: sectorsWithTrades
          };
        })
      ),
      catchError(error => {
        console.error('Error getting full hierarchy:', error);
        return of([]);
      })
    );
  }

  // ===================
  // ADVANCED SEARCH METHODS
  // ===================

  /**
   * Advanced search across all entities
   * @param searchTerm Global search term
   * @param params Additional query parameters
   * @returns Observable<{sectors: Sector[], trades: Trade[], rtqfLevels: RTQFLevel[]}>
   */
  globalSearch(searchTerm: string, params?: QueryParams): Observable<{
    sectors: Sector[], 
    trades: Trade[], 
    rtqfLevels: RTQFLevel[]
  }> {
    if (!searchTerm.trim()) {
      return of({ sectors: [], trades: [], rtqfLevels: [] });
    }

    const searchParams = { ...params, search: searchTerm };
    
    return this.apiService.get<{
      sectors: Sector[], 
      trades: Trade[], 
      rtqfLevels: RTQFLevel[]
    }>(`search/global`, searchParams).pipe(
      catchError(error => {
        console.error('Error in global search:', error);
        return of({ sectors: [], trades: [], rtqfLevels: [] });
      })
    );
  }

  /**
   * Get statistics for the trade management system
   * @returns Observable<{totalSectors: number, totalTrades: number, totalRTQFLevels: number}>
   */
  getStatistics(): Observable<{
    totalSectors: number, 
    totalTrades: number, 
    totalRTQFLevels: number,
    averageTradesPerSector: number,
    averageSectorsPerRTQFLevel: number
  }> {
    return this.apiService.get<{
      totalSectors: number, 
      totalTrades: number, 
      totalRTQFLevels: number,
      averageTradesPerSector: number,
      averageSectorsPerRTQFLevel: number
    }>('statistics/trade-management').pipe(
      catchError(error => {
        console.error('Error getting statistics:', error);
        return of({
          totalSectors: 0,
          totalTrades: 0,
          totalRTQFLevels: 0,
          averageTradesPerSector: 0,
          averageSectorsPerRTQFLevel: 0
        });
      })
    );
  }

  // ===================
  // BATCH OPERATIONS
  // ===================

  /**
   * Create multiple sectors at once
   * @param sectorsData Array of sector creation data
   * @returns Observable<Sector[]>
   */
  createMultipleSectors(sectorsData: SectorCreateRequest[]): Observable<Sector[]> {
    return this.apiService.post<Sector[]>(`${this.SECTORS_ENDPOINT}/batch`, sectorsData);
  }

  /**
   * Create multiple trades at once
   * @param tradesData Array of trade creation data
   * @returns Observable<Trade[]>
   */
  createMultipleTrades(tradesData: TradeCreateRequest[]): Observable<Trade[]> {
    return this.apiService.post<Trade[]>(`${this.TRADES_ENDPOINT}/batch`, tradesData);
  }

  /**
   * Create multiple RTQF levels at once
   * @param levelsData Array of RTQF level creation data
   * @returns Observable<RTQFLevel[]>
   */
  createMultipleRTQFLevels(levelsData: RTQFLevelCreateRequest[]): Observable<RTQFLevel[]> {
    return this.apiService.post<RTQFLevel[]>(`${this.RTQF_LEVELS_ENDPOINT}/batch`, levelsData);
  }

  /**
   * Delete multiple sectors at once
   * @param sectorIds Array of sector IDs
   * @returns Observable<void>
   */
  deleteMultipleSectors(sectorIds: number[]): Observable<void> {
    return this.apiService.post<void>(`${this.SECTORS_ENDPOINT}/batch/delete`, { ids: sectorIds });
  }

  /**
   * Delete multiple trades at once
   * @param tradeIds Array of trade IDs
   * @returns Observable<void>
   */
  deleteMultipleTrades(tradeIds: number[]): Observable<void> {
    return this.apiService.post<void>(`${this.TRADES_ENDPOINT}/batch/delete`, { ids: tradeIds });
  }

  /**
   * Delete multiple RTQF levels at once
   * @param rtqfLevelIds Array of RTQF level IDs
   * @returns Observable<void>
   */
  deleteMultipleRTQFLevels(rtqfLevelIds: number[]): Observable<void> {
    return this.apiService.post<void>(`${this.RTQF_LEVELS_ENDPOINT}/batch/delete`, { ids: rtqfLevelIds });
  }

  // ===================
  // EXPORT/IMPORT METHODS
  // ===================

  /**
   * Export all data to various formats
   * @param format Export format (csv, excel, json)
   * @returns Observable<Blob>
   */
  exportData(format: 'csv' | 'excel' | 'json' = 'excel'): Observable<Blob> {
    return this.apiService.get<Blob>(`export/trade-management?format=${format}`);
  }

  /**
   * Import data from file
   * @param file File to import
   * @param format Import format
   * @returns Observable<{success: boolean, message: string, errors?: string[]}>
   */
  importData(file: File, format: 'csv' | 'excel' | 'json' = 'excel'): Observable<{
    success: boolean, 
    message: string, 
    errors?: string[]
  }> {
    return this.apiService.upload<{
      success: boolean, 
      message: string, 
      errors?: string[]
    }>(`import/trade-management`, file, { format });
  }

  // Helper property to access local data (for utility methods)
  private sectors: Sector[] = [];
  private trades: Trade[] = [];
  private rtqfLevels: RTQFLevel[] = [];
}
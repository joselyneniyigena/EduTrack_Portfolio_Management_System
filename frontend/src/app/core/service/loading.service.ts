import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private requestCount = 0;

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    setLoading(loading: boolean, url?: string): void {
        if (loading) {
            this.requestCount++;
            this.loadingSubject.next(true);
        } else {
            this.requestCount--;
            if (this.requestCount <= 0) {
                this.requestCount = 0;
                this.loadingSubject.next(false);
            }
        }
    }

    show(): void {
        this.setLoading(true);
    }

    hide(): void {
        this.setLoading(false);
    }
}
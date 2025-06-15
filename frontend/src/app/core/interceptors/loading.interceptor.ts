import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private excludedUrls: string[] = [
        '/auth/refresh'
    ];

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.shouldSkipLoading(request.url)) {
            return next.handle(request);
        }

        this.loadingService.setLoading(true, request.url);

        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.setLoading(false, request.url);
            })
        );
    }

    private shouldSkipLoading(url: string): boolean {
        return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
    }
}
import { Injectable, Inject, OnInit, OnDestroy, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, Event } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
import { filter, share } from 'rxjs/operators';

// App
import { ConfigService } from '../config/config.service';
import { App } from '../models/app.model';

@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit, OnDestroy {

    // Angular Universal: Browser check
    static isBrowser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    protected subscriptions: Array<Subscription> = [];
    protected app: App;
    protected app$: Observable<App>;
    protected appObserver: Observer<App>;
    protected elementRef: ElementRef;
    protected loading: boolean = false;
    protected error: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: any,
                protected configService: ConfigService,
                protected router: Router) {

        // Determine App type
        AppService.isBrowser.next(isPlatformBrowser(platformId));

        this.initObservables();
        this.bindObservables();

        // OnInit
        this.ngOnInit();
    }

    //****************************************************************************************
    // App: App
    //****************************************************************************************

    public getApp(): App {
        return this.app;
    }

    public setApp(app: App) {
        this.app = app;
        this.shareApp();
    }

    public hasApp(): boolean {
        return !_.isUndefined(this.getApp()) ? true : false;
    }

    protected shareApp() {
        this.appObserver?.next?.(this.getApp());
    }

    public cleanApp() {
        this.app = undefined;
    }

    protected destroyApp() {
        this.cleanApp();
        this.appObserver?.complete?.();
    }

    //****************************************************************************************
    // Loading: boolean
    //****************************************************************************************

    public getLoading(): boolean {
        return this.loading;
    }

    public setLoading(loading: boolean) {
        this.loading = loading;
    }

    public isLoading(): boolean {
        return this.getLoading() ? true : false;
    }

    //****************************************************************************************
    // Error: boolean
    //****************************************************************************************

    public getError(): boolean {
        return this.error;
    }

    public setError(error: boolean) {
        this.error = error;
    }

    public hasError(): boolean {
        return this.getError() ? true : false;
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    protected initObservables() {
        this.app$ = new Observable<App>((observer: any) => this.appObserver = observer).pipe(share());
    }

    protected bindObservables() {
        this.subscriptions = [
            this.getAppObservable().subscribe((app: App) => this.onApp(app)),
            this.router.events.pipe(filter((event: any) => event instanceof NavigationStart))
                .subscribe((navigationStartEvent: NavigationStart) => this.onNavigationStart(navigationStartEvent)),
        ];
    }

    protected checkObservables() {
        //
    }

    protected destroyObservables() {
        this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }

    public getAppObservable(): Observable<App> {
        return this.app$;
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    protected onApp(app: App): any {

        if (_.isUndefined(app)) {
            return; // break
        }

        // Set App Version, this is a custom attribute
        this.elementRef?.nativeElement?.setAttribute?.('app-version', app.version);
    }

    protected onNavigationStart(event: NavigationStart) {

        // Only if Debug is enabled
        if (! this.configService.isDebug()) {
            return; // break
        }

        // Check for URL flag
        if (event.url.toLowerCase().includes('loading=true')) {
            this.loading = true;
        }
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public injectApp(app: App, elementRef?: ElementRef) {

        if (!_.isUndefined(elementRef)) {
            this.elementRef = elementRef;
        }

        this.setApp(app);
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {
        this.checkObservables();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }

}

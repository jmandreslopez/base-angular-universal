import { Component, OnInit, OnDestroy, HostBinding, ElementRef } from '@angular/core';
import { Breadcrumb, BreadcrumbsService } from '@exalif/ngx-breadcrumbs';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { AppService, SEOService } from '@app/services';

// @ts-ignore
import app from '../app.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    @HostBinding('class') class: string = '';
    private subscriptions: Array<Subscription> = [];

    constructor(private appService: AppService,
                private breadcrumbsService: BreadcrumbsService,
                private elementRef: ElementRef,
                private seoService: SEOService) {

        this.bindObservables();
    }

    //****************************************************************************************
    // OBSERVABLES
    //****************************************************************************************

    private bindObservables() {
        this.subscriptions = [
            ...this.subscriptions,
            this.breadcrumbsService.crumbs$.subscribe((breadcrumbs: Array<Breadcrumb>) => this.onBreadcrumbs(breadcrumbs)),
        ];
    }

    private checkObservables() {
        //
    }

    private destroyObservables() {
        this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    }

    //****************************************************************************************
    // EVENTS
    //****************************************************************************************

    private onBreadcrumbs(breadcrumbs: Array<Breadcrumb>) {
        const route: string = _.kebabCase(_.last(breadcrumbs)?.text);
        this.class = route && !_.isUndefined(breadcrumbs) ? `route-${route}` : '';
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    private initApp() {
        //
    }

    //****************************************************************************************
    // LIFECYCLES
    //****************************************************************************************

    public ngOnInit() {
        this.checkObservables();

        // Inject App
        this.appService.injectApp(app, this.elementRef);

        // Init App
        this.initApp();
    }

    public ngOnDestroy() {
        this.destroyObservables();
    }

}

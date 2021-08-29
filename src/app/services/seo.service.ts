import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbsService } from '@exalif/ngx-breadcrumbs';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// App
import { ConfigService } from '../config/config.service';
import { DOMService } from './dom.service';

@Injectable({
    providedIn: 'root'
})
export class SEOService implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];

    constructor(private breadcrumbsService: BreadcrumbsService,
                private configService: ConfigService,
                private domService: DOMService,
                private title: Title,
                private meta: Meta) {

        this.bindObservables();

        // OnInit
        this.ngOnInit();
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

    private onBreadcrumbs(breadcrumbs: Array<Breadcrumb>): any {

        if (_.isUndefined(breadcrumbs) || _.isEmpty(breadcrumbs)) {
            return; // break
        }

        const title: string = _.last(breadcrumbs)?.text;

        if (_.isUndefined(title)) {
            return; // break
        }

        this.updateTags({ title: title });
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    private getPathFromUrl(url: any) {
        return url.split(/[?#]/)[0];
    }

    private getTitle(tags: any = {}) {

        if (!_.isUndefined(tags.title) && tags.title !== this.configService.getAppName()) {
            return `${tags.title} | ${this.configService.getAppName()}`;
        }

        return this.configService.getAppName();
    }

    public updateTags(tags: any = {}) {

        tags = {
            ...tags,
            title: this.getTitle(tags),
            description: this.configService.getSEODescription(),
            ogDescription: this.configService.getSEODescription(),
            url: this.getPathFromUrl(this.domService?.window?.location?.href),
            image: this.configService.getSEOImageUrl(),
            type: 'website',
            locale: 'en_US',
        };

        // Update Title
        this.title.setTitle(tags.title);

        // Update Metatags
        this.meta.updateTag({ name: 'description', content: tags.description });
        this.meta.updateTag({ property: 'og:url', content: tags.url });
        this.meta.updateTag({ property: 'og:title', content: tags.title });
        this.meta.updateTag({ property: 'og:description', content: tags.ogDescription });
        this.meta.updateTag({ property: 'og:image', content: tags.image });
        this.meta.updateTag({ property: 'og:type', content: tags.type });
        this.meta.updateTag({ property: 'og:locale', content: tags.locale });
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

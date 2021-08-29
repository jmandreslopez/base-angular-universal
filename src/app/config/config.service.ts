import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private variables: any = {};

    constructor(@Inject('config') config: any = {},
                @Inject('environment') environment: any = {}) {

        this.variables = {
            ...this.variables,
            ...config,
            ...environment,
        };
    }

    private getVariable(key: any, backup: any) {

        // Key Value
        if (!_.isNil(this.variables) && !_.isNil(this.variables[key])) {
            return this.variables[key];
        }

        // Default
        if (!_.isUndefined(backup)) {
            return backup;
        }

        // Throw Exception
        throw new Error(`Missing key - '${key}'`);
    }

    //****************************************************************************************
    // APP
    //****************************************************************************************

    // REQUIRED
    public getAppKey(): string {
        return this.getVariable('app_key', undefined);
    }

    // REQUIRED
    public getAppName(): string {
        return this.getVariable('app_name', undefined);
    }

    //****************************************************************************************
    // COOKIES
    //****************************************************************************************

    // REQUIRED
    public getCookieDomain(): string {
        return this.getVariable('cookie_domain', undefined);
    }

    //****************************************************************************************
    // DEBUG
    //****************************************************************************************

    public isDebug(): boolean {
        return this.getVariable('debug', false);
    }

    public getDebugLevel(): string {
        return this.getVariable('debug_level', 'none');
    }

    //****************************************************************************************
    // ENVIRONMENT
    //****************************************************************************************

    // REQUIRED
    public getEnvironment(): string {
        return this.getVariable('environment', undefined);
    }

    public isDevelopmentEnvironment(): boolean {
        return this.getEnvironment() === 'dev';
    }

    public isProdEnvironment(): boolean {
        return this.getEnvironment() === 'prod';
    }

    //****************************************************************************************
    // SEO
    //****************************************************************************************

    public getSEODescription(): string {
        return this.getVariable('seo_description', '');
    }

    public getSEOImageUrl(): string {
        return this.getVariable('seo_image_url', '');
    }

}

import { Injectable } from '@angular/core';
import Cookies from 'js-cookie'
import * as _ from 'lodash';

// App
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    // Default Options
    private options: any = {
        path: '/',
        domain: this.configService.getCookieDomain(),
    };

    constructor(private configService: ConfigService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    // Format name
    private getName(name: string): string {
        return name;
    }

    // Format value
    private getValue(value: any): string {
        return value;
    }

    // Default options
    private getOptions(options: any = {}): any {
        return _.defaultsDeep(options, this.options);
    }

    // Get cookie by name
    public getCookie(name: string): string {
        name = this.getName(name);

        return Cookies.get(name);
    }

    // Get all cookies
    public getCookies(): any {
        return Cookies.get();
    }

    // Set cookie
    public setCookie(name: string, value: string, options = { expires: 365 }) {
        name = this.getName(name);
        value = this.getValue(value);
        options = this.getOptions(options);

        Cookies.set(name, value, options);
    }

    // Check if a cookie exists
    public hasCookie(name: string): boolean {
        name = this.getName(name);

        return !_.isNil(this.getCookie(name)) ? true : false;
    }

    // Remove cookie by name
    public removeCookie(name: string, options: any = {}) {
        name = this.getName(name);
        options = this.getOptions(options);

        Cookies.remove(name, options);
    }

    // Remove all cookies
    public removeCookies() {
        _.keys(this.getCookies()).forEach((key: string) => {
            this.removeCookie(key);
        });
    }

}

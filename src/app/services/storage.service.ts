import { Injectable } from '@angular/core';
import * as _ from 'lodash';

// App
import { LocalStorage } from '@app/models';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private storage: Storage;

    constructor() {
        this.storage = new LocalStorage();

        // BROWSER ONLY
        AppService.isBrowser.subscribe((isBrowser: boolean) => {
            this.storage = isBrowser ? localStorage : new LocalStorage();
        });
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    // Format key
    private getKey(key: string): string {
        return _.snakeCase(key);
    }

    // Format value
    private getValue(value: any): string {

        // Encode objects
        if (_.isObject(value)) {
            return JSON.stringify(value);
        }

        if (_.isNull(value)) {
            return 'null';
        }

        // Convert to string
        if (!_.isString(value)) {
            return value.toString();
        }

        return value;
    }

    // Get storage item by key
    public getItem(key: string): any {
        let value: any = this.storage.getItem(this.getKey(key));

        if (value === 'null') {
            value = null;
        }

        return value;
    }

    // Set storage item
    public setItem(key: string, value: any): any {
        this.storage.setItem(this.getKey(key), this.getValue(value));
    }

    // Check if a storage item exists
    public hasItem(key: string): boolean {
        return !_.isNil(this.getItem(key)) ? true : false;
    }

    // Remove storage item by key
    public removeItem(key: string): any {
        return this.storage.removeItem(this.getKey(key));
    }

    // Remove all storage items
    public clear(): void {
        this.storage.clear();
    }

}

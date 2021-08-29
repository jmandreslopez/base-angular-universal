import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CryptoES from 'crypto-es';
import * as _ from 'lodash';

// App
import { ConfigService } from '@app/config';
import { DOMService } from './dom.service';

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    constructor(private configService: ConfigService,
                private domService: DOMService) {
        //
    }

    // Description: Scroll to the top of the page
    public scrollToTop(): void {
        this.domService?.window?.scrollTo?.(0, 0);
    };

    // Description: Serialize params
    public serialize(params: {[key: string]: any}): string {
        let queries: Array<any> = [];

        _.forOwn(params, (value: any, key: string) => {
            queries.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        });

        return queries.join('&');
    };

    // Description: Crypt using MD5
    public md5(value: string): string {
        return CryptoES.MD5(value).toString();
    };

    // Description: Crypt using SHA1
    public sha1(value: string): string {
        return CryptoES.SHA1(value).toString();
    };

    // Description: Crypt using HMAC MD5
    // tslint:disable-next-line:variable-name
    public hmac_md5(value: string, key: string): string {
        return CryptoES.HmacMD5(value, key).toString();
    };

    // Description: Encode element
    public encode(element: any): string {
        return JSON.stringify(element);
    };

    // Description: Decode element
    public decode(element: string): any {
        return JSON.parse(element);
    };

    // Description: Check if a form is valid, otherwise
    // trigger all the controls to show errors
    public isValidForm(form: FormGroup): boolean {

        // If the form is valid, continue
        if (form.valid) {
            return true;
        }

        // Mask all as touched
        form.markAllAsTouched();

        return false;
    };

    // Description: Random string generator
    public randomString(length: number = 8, config: any = { specialChars: true }): string {
        let chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let specialChars: string = '!@#$%^&*';

        if (config?.specialChars) {
            chars = `${chars}${specialChars}`;
        }

        let random = '';
        for (let x = 0; x < length; x++) {
            let i = Math.floor(Math.random() * chars.length);
            random += chars.charAt(i);
        }

        return random;
    };

    // Description; Generate random numbers array
    public randomNumbers({ amount = 10, min = 1, max = 1000 }): Array<number> {
        return _.times(amount, () => _.random(min, max));
    };

    // Description: Open new window
    public openNewWindow(url: string): void {
        this.domService?.window?.open?.(url, '_blank');
    };

    // Description: Format image for CSS consumption
    // Remove and encode white spaces
    public formatBackgroundStyle(backgroundImage: string): any {
        return { 'background-image': `url(${backgroundImage.trim().replace(/ /g, '%20')})` };
    };

}

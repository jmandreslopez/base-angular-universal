import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function getWindow(): any {
    return window;
}

@Injectable({
    providedIn: 'root',
})
export class DOMService {

    constructor(@Inject(DOCUMENT) private _document: Document) {
        //
    }

    get document(): Document {
        return this._document;
    }

    get window(): Window | null {
        return this._document.defaultView || getWindow();
    }

    get location(): Location {
        return this._document.location;
    }

}

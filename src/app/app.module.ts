import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Variables
import { config } from '../configs/config';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'base-angular-universal' }),
        BrowserAnimationsModule,

        // App
        LayoutsModule,
        SharedModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [
        { provide: 'config', useValue: config },
        { provide: 'environment', useValue: environment },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}

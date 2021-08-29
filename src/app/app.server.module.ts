import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

// Modules
import { AppModule } from './app.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
    //
}

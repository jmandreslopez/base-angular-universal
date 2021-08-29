import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '@app/shared/shared.module';
import { NotFoundRoutingModule } from './not-found-routing.module';

// Components
import { NotFoundComponent } from './components';

@NgModule({
    imports: [
        SharedModule,
        NotFoundRoutingModule,
    ],
    declarations: [
        NotFoundComponent,
    ],
    providers: []
})
export class NotFoundModule {
    //
}

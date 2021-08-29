import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Declarations
import { BlankLayoutComponent } from './blank-layout';
import { NormalLayoutComponent } from './normal-layout';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        BlankLayoutComponent,
        NormalLayoutComponent,
    ],
    providers: []
})
export class LayoutsModule {
    //
}

import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '@app/shared/shared.module';
import { TestRoutingModule } from './test-routing.module';

// Components
import { TestComponent } from './components';

@NgModule({
    imports: [
        SharedModule,
        TestRoutingModule,
    ],
    declarations: [
        TestComponent,
    ],
    providers: []
})
export class TestModule {
    //
}

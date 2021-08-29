import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { TestComponent } from './components';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: TestComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {
    //
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { NotFoundComponent } from './components';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: NotFoundComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotFoundRoutingModule {
    //
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { HomeComponent } from './components';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HomeComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
    //
}

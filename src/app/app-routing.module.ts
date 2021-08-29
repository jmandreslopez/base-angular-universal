import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

// App
import { BlankLayoutComponent, NormalLayoutComponent } from '@app/layouts';

const routes: Routes = [

    // Global Route
    // Use this elements to run high
    // level resolvers or guards
    {
        path: '',
        children: [

            // Normal Layout
            {
                path: '',
                component: NormalLayoutComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
                        data: { breadcrumbs: 'Home' },
                    },
                ],
            },

            // Blank Layout
            {
                path: '',
                component: BlankLayoutComponent,
                children: [
                    {
                        path: '404',
                        loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule),
                        data: { breadcrumbs: 'Not Found' },
                    },
                ],
            },

        ],
    },

    // DEV ONLY
    // Blank Layout
    {
        path: '',
        component: BlankLayoutComponent,
        children: [
            {
                path: 'test',
                loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule),
            },
        ]
    },

    // Redirects
    { path: '**', redirectTo: '/404' }, // Not Found
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
    //
}

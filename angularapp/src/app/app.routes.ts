import { provideRouter, Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { bootstrapAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserUpdate } from './user-update/user-update';
import { UserCreate } from './user-create/user-create';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: "full"},
    { path: 'dashboard', component:Dashboard},
    { path: 'users', component:UserList},
    { path: 'users/create', component:UserCreate},
    { path: 'users/edit', component:UserUpdate},

];

export const AppRoutes = provideRouter(routes);

bootstrapApplication(App, {
    providers: [AppRoutes]
});

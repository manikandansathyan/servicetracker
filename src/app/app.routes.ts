import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Tracker } from './pages/tracker/tracker';
import { Pnf } from './pages/pnf/pnf';

export const routes: Routes = [
    {
        path:'', component:Home
    },
    {
        path:'login', component:Login
    },
    {
        path:'register', component:Register
    },
    {
        path:'tracker', component:Tracker
    },
    {
        path:'**', component:Pnf
    }
];

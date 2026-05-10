import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { ReportForm } from './components/report-form/report-form';
import { ReportDetail } from './components/report-detail/report-detail';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'new', component: ReportForm },
  { path: 'edit/:id', component: ReportForm },
  { path: 'view/:id', component: ReportDetail },
  { path: '**', redirectTo: '' }
];

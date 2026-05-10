import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, RouterModule],
  template: `
    <div class="p-8 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-800">Laboratory Reports</h1>
          <p class="text-sm text-slate-500 mt-1">Manage and track all patient clinical analysis reports.</p>
        </div>
        <div class="flex gap-3">
          <button mat-stroked-button class="!rounded-lg !border-slate-200 !text-slate-600 !font-bold">
            <mat-icon class="mr-1">filter_list</mat-icon> Filters
          </button>
          <button mat-flat-button class="!bg-blue-600 !text-white !font-bold !rounded-lg !px-6 !shadow-sm !shadow-blue-100" routerLink="/new">
            <mat-icon class="mr-1">add</mat-icon> Create New Report
          </button>
        </div>
      </div>

      <mat-card class="!rounded-xl !border-slate-200 !shadow-sm overflow-hidden">
        <table mat-table [dataSource]="reports()" class="w-full">
          <ng-container matColumnDef="slNo">
            <th mat-header-cell *matHeaderCellDef class="!text-[10px] !font-bold !uppercase !tracking-widest !text-slate-400 !bg-slate-50"> Sl. No. </th>
            <td mat-cell *matCellDef="let report" class="text-slate-500 font-mono text-xs"> {{report.slNo}} </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef class="!text-[10px] !font-bold !uppercase !tracking-widest !text-slate-400 !bg-slate-50"> Patient Name </th>
            <td mat-cell *matCellDef="let report"> 
              <div class="flex flex-col py-3">
                <span class="font-bold text-slate-800 uppercase">{{report.patientName}}</span>
                <span class="text-[10px] text-slate-400 font-medium">{{report.age}} • {{report.sex}}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef class="!text-[10px] !font-bold !uppercase !tracking-widest !text-slate-400 !bg-slate-50"> Date </th>
            <td mat-cell *matCellDef="let report" class="text-slate-600 text-sm"> {{report.resultDate}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="!text-[10px] !font-bold !uppercase !tracking-widest !text-slate-400 !bg-slate-50"> Status </th>
            <td mat-cell *matCellDef="let report">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                Valid
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="!text-[10px] !font-bold !uppercase !tracking-widest !text-slate-400 !bg-slate-50"> Actions </th>
            <td mat-cell *matCellDef="let report">
              <div class="flex gap-1">
                <button mat-icon-button class="!text-blue-600" [routerLink]="['/view', report.id]" title="View Report">
                  <mat-icon class="!text-xl">visibility</mat-icon>
                </button>
                <button mat-icon-button class="!text-slate-400" (click)="printReport(report.id)" title="Print">
                  <mat-icon class="!text-xl">print</mat-icon>
                </button>
                <button mat-icon-button class="!text-red-400" (click)="deleteReport(report.id)" title="Delete">
                  <mat-icon class="!text-xl">delete_outline</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns" class="h-12"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-slate-50/50 h-16 transition-colors"></tr>
        </table>

        @if (reports().length === 0) {
          <div class="p-20 text-center flex flex-col items-center">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <mat-icon class="text-slate-300 !text-3xl h-auto w-auto">inventory_2</mat-icon>
            </div>
            <h3 class="text-slate-800 font-bold mb-1">No reports found</h3>
            <p class="text-sm text-slate-500 max-w-xs mx-auto mb-6">You haven't created any laboratory reports yet. Start by creating a new analysis for a patient.</p>
            <button mat-flat-button class="!bg-blue-600 !text-white !font-bold !rounded-lg !px-6" routerLink="/new">
              Create First Report
            </button>
          </div>
        }
      </mat-card>
    </div>
  `,
  styleUrls: []
})
export class Dashboard {
  private reportService = inject(ReportService);
  private router = inject(Router);
  reports = this.reportService.reports;
  displayedColumns = ['slNo', 'name', 'date', 'status', 'actions'];

  printReport(id: string) {
    this.router.navigate(['/view', id], { queryParams: { print: true } });
  }

  deleteReport(id: string) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(id);
    }
  }
}

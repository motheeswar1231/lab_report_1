import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { DEFAULT_TEST_GROUPS } from '../../models/default-tests';
import { PatientReport, Investigation } from '../../models/report';

@Component({
  selector: 'app-report-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule,
    MatExpansionModule
  ],
  template: `
    <div class="p-8 max-w-5xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-800">{{ reportId ? 'Edit Analysis' : 'New Laboratory Analysis' }}</h1>
          <p class="text-sm text-slate-500 mt-1">Configure patient demographics and clinical test data.</p>
        </div>
        <div class="flex gap-3">
          <button mat-button class="!text-slate-500 !font-bold" (click)="goBack()">Cancel</button>
          <button mat-flat-button class="!bg-blue-600 !text-white !font-bold !rounded-lg !px-8 !shadow-sm !shadow-blue-100" (click)="saveReport()" [disabled]="reportForm.invalid">
            Save Analysis
          </button>
        </div>
      </div>

      <form [formGroup]="reportForm" class="space-y-8 pb-12">
        <!-- Patient Details -->
        <mat-card class="!rounded-xl !border-slate-200 !shadow-sm p-6 overflow-hidden">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <mat-icon class="scale-75">person_outline</mat-icon>
            </div>
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Patient Demographics</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
            <mat-form-field appearance="outline" class="md:col-span-6">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="patientName" placeholder="e.g. Mrs. TAMILSELVI">
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="md:col-span-3">
              <mat-label>Age</mat-label>
              <input matInput formControlName="age" placeholder="e.g. 35 Years">
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-3">
              <mat-label>Sex</mat-label>
              <mat-select formControlName="sex">
                <mat-option value="Male">Male</mat-option>
                <mat-option value="Female">Female</mat-option>
                <mat-option value="Other">Other</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-4">
              <mat-label>Patient ID / SL No.</mat-label>
              <input matInput formControlName="slNo" placeholder="e.g. 595/2013">
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-4">
              <mat-label>Referential MD</mat-label>
              <input matInput formControlName="refBy" placeholder="e.g. DR. D. SIVARADJE">
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-4">
              <mat-label>Sample Collection Date</mat-label>
              <input matInput formControlName="sampleDate" placeholder="15-Apr-2013">
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-4">
              <mat-label>Report Generation Date</mat-label>
              <input matInput formControlName="resultDate" placeholder="15-Apr-2013">
            </mat-form-field>

            <mat-form-field appearance="outline" class="md:col-span-8">
              <mat-label>Specimen Type</mat-label>
              <input matInput formControlName="sampleType" placeholder="BLOOD & URINE">
            </mat-form-field>
          </div>
        </mat-card>

        <!-- Test Results -->
        <div formArrayName="groups" class="space-y-6">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <mat-icon class="scale-75">science</mat-icon>
              </div>
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Clinical Investigation Data</h2>
            </div>
            <button mat-stroked-button class="!rounded-lg !text-[11px] !font-bold !h-8" (click)="addGroup()">
              + NEW CATEGORY
            </button>
          </div>

          @for (group of groups.controls; track group; let i = $index) {
            <div [formGroupName]="i">
              <mat-card class="!rounded-xl !border-slate-200 !shadow-sm p-0 overflow-hidden">
                <div class="bg-slate-50 border-b border-slate-100 px-6 py-3 flex justify-between items-center">
                  <input class="bg-transparent font-bold text-slate-700 border-none outline-none w-full uppercase tracking-wide" formControlName="title">
                  <button mat-icon-button class="!text-slate-300 hover:!text-red-500" (click)="removeGroup(i)">
                    <mat-icon class="!text-lg">delete_outline</mat-icon>
                  </button>
                </div>
                
                <div class="p-6">
                  <table class="w-full">
                    <thead>
                      <tr class="text-left text-[10px] uppercase text-slate-400 font-bold tracking-widest border-b border-slate-100">
                        <th class="pb-3 w-1/3">Investigation</th>
                        <th class="pb-3 w-1/4 px-4">Result Value</th>
                        <th class="pb-3">Normal Range</th>
                        <th class="pb-3 w-20 text-center"></th>
                      </tr>
                    </thead>
                    <tbody formArrayName="investigations">
                      @for (inv of getInvestigations(i).controls; track inv; let j = $index) {
                        <tr [formGroupName]="j" class="group">
                          <td class="pr-2 py-3 border-b border-slate-50 border-transparent transition-colors">
                            <input class="w-full bg-transparent border-b border-slate-100 py-1 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-200" formControlName="name" placeholder="Test Name">
                          </td>
                          <td class="px-4 py-3 border-b border-slate-50 border-transparent transition-colors">
                            <div class="flex items-center gap-2">
                              <input class="w-full bg-transparent border-b border-slate-100 py-1 text-sm font-bold text-slate-800 focus:border-blue-500 outline-none transition-all" formControlName="result">
                              <input class="w-16 bg-slate-50 text-[10px] text-slate-500 rounded px-1.5 py-0.5 border border-slate-200 outline-none" formControlName="unit" placeholder="Unit">
                            </div>
                          </td>
                          <td class="pr-2 py-3 border-b border-slate-50 border-transparent transition-colors">
                            <input class="w-full bg-transparent border-b border-slate-100 py-1 text-xs text-slate-400 italic focus:border-blue-500 outline-none transition-all" formControlName="normalValue" placeholder="Ref Range">
                          </td>
                          <td class="py-3 text-right">
                            <button mat-icon-button class="scale-75 !text-slate-200 hover:!text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" (click)="removeInvestigation(i, j)">
                              <mat-icon>close</mat-icon>
                            </button>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                  <div class="mt-4 flex justify-center">
                    <button mat-button class="!text-blue-600 !text-xs !font-bold !bg-blue-50/50 hover:!bg-blue-50 !rounded-lg !px-4" (click)="addInvestigation(i)">
                      <mat-icon class="mr-1 !text-sm">add_circle_outline</mat-icon>
                      Add Test Row
                    </button>
                  </div>
                </div>
              </mat-card>
            </div>
          }
        </div>

        <div class="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex gap-4">
            <button mat-stroked-button class="!rounded-lg !text-slate-600 !font-semibold" (click)="loadDefaults()">
              <mat-icon class="mr-1">auto_awesome</mat-icon>
              Bulk Load Clinical Template
            </button>
          </div>
          
          <div class="flex gap-3">
             <button mat-button class="!text-slate-500 !font-bold text-sm" (click)="goBack()">Discard Changes</button>
             <button mat-flat-button class="!bg-blue-600 !text-white !font-bold !rounded-lg !px-10 !py-2 shadow-sm shadow-blue-100" (click)="saveReport()">
               Finalize Analysis
             </button>
          </div>
        </div>
      </form>
    </div>
  `,

})
export class ReportForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private reportService = inject(ReportService);

  reportId: string | null = null;
  reportForm: FormGroup = this.fb.group({
    patientName: ['', Validators.required],
    age: ['', Validators.required],
    sex: ['Female', Validators.required],
    slNo: [''],
    refBy: [''],
    sampleDate: [new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')],
    resultDate: [new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')],
    sampleType: ['BLOOD'],
    groups: this.fb.array([])
  });

  get groups() {
    return this.reportForm.get('groups') as FormArray;
  }

  getInvestigations(groupIndex: number) {
    return this.groups.at(groupIndex).get('investigations') as FormArray;
  }

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id');
    if (this.reportId) {
      const existingReport = this.reportService.getReportById(this.reportId);
      if (existingReport) {
        this.fillForm(existingReport);
      }
    } else if (this.groups.length === 0) {
      this.loadDefaults();
    }
  }

  fillForm(report: PatientReport) {
    this.reportForm.patchValue({
      patientName: report.patientName,
      age: report.age,
      sex: report.sex,
      slNo: report.slNo,
      refBy: report.refBy,
      sampleDate: report.sampleDate,
      resultDate: report.resultDate,
      sampleType: report.sampleType
    });

    this.groups.clear();
    report.groups.forEach(g => {
      const gIndex = this.addGroup(g.title);
      g.investigations.forEach(inv => {
        this.addInvestigation(gIndex, inv);
      });
    });
  }

  addGroup(title = 'NEW CATEGORY') {
    const group = this.fb.group({
      title: [title, Validators.required],
      investigations: this.fb.array([])
    });
    this.groups.push(group);
    return this.groups.length - 1;
  }

  addInvestigation(groupIndex: number, inv?: Investigation) {
    const investigation = this.fb.group({
      name: [inv?.name || '', Validators.required],
      result: [inv?.result || ''],
      normalValue: [inv?.normalValue || ''],
      unit: [inv?.unit || '']
    });
    this.getInvestigations(groupIndex).push(investigation);
  }

  removeGroup(index: number) {
    this.groups.removeAt(index);
  }

  removeInvestigation(groupIndex: number, invIndex: number) {
    this.getInvestigations(groupIndex).removeAt(invIndex);
  }

  loadDefaults() {
    this.groups.clear();
    DEFAULT_TEST_GROUPS.forEach(g => {
      const gIndex = this.addGroup(g.title);
      g.investigations.forEach(inv => {
        this.addInvestigation(gIndex, inv);
      });
    });
  }

  saveReport() {
    if (this.reportForm.invalid) return;

    const reportData: PatientReport = {
      ...this.reportForm.value,
      id: this.reportId || undefined
    };

    if (this.reportId) {
      this.reportService.updateReport({ ...reportData, id: this.reportId });
    } else {
      this.reportService.addReport(reportData);
    }

    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

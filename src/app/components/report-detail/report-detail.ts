import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PatientReport, InvestigationGroup } from '../../models/report';

@Component({
  selector: 'app-report-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-4 md:p-10 no-print-bg font-sans">
      <div class="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div>
          <button mat-stroked-button class="!rounded-lg !border-slate-200 !text-slate-600 font-bold" routerLink="/">
            <mat-icon class="mr-1">arrow_back</mat-icon>
            Back to Dashboard
          </button>
        </div>
        <div class="flex gap-3">
          <button mat-stroked-button class="!rounded-lg !border-slate-200 !text-slate-600 font-bold" [routerLink]="['/edit', report()?.id]">
            <mat-icon class="mr-1">edit</mat-icon>
            Edit Analysis
          </button>
          <button mat-flat-button class="!bg-blue-600 !text-white !font-bold !rounded-lg !px-6 !shadow-sm !shadow-blue-100" (click)="print()">
            <mat-icon class="mr-1">print</mat-icon>
            Print Final Report
          </button>
        </div>
      </div>

      <!-- Report Content Wrapper -->
      <div class="max-w-4xl mx-auto flex flex-col items-center">
        <div class="w-full text-center mb-4 print:hidden">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">System Generated Validation Preview</span>
        </div>

        <!-- Actual Report Paper Simulation -->
        <div id="printable-report" class="bg-white shadow-2xl mx-auto p-12 print:p-8 print:shadow-none print:border-none border border-slate-200 w-full max-w-[800px] aspect-[1/1.41] flex flex-col report-page overflow-x-auto">
          <!-- Letterhead -->
          <div class="flex justify-between items-start border-b-4 border-blue-800 pb-6 mb-8">
            <div class="flex items-center gap-4">
               <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                 <mat-icon class="scale-150">biotech</mat-icon>
               </div>
               <div>
                  <h1 class="text-3xl font-black text-blue-900 tracking-tighter leading-none">SRI JAYA LAB</h1>
                  <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clinical Investigation Facility</p>
                  <p class="text-[9px] text-slate-400 max-w-[200px] mt-1 italic">Quality Medical Diagnostics with Precision & Care</p>
               </div>
            </div>
            <div class="text-right">
               <h2 class="text-xs font-black text-blue-900 uppercase tracking-widest mb-1">Laboratory Report</h2>
               <div class="text-[9px] text-slate-600 leading-relaxed font-semibold">
                 Puducherry - 605 010<br>
                 Mob: +91 97918 12468<br>
                 Email: srijayaclinicallab&#64;gmail.com
               </div>
            </div>
          </div>

          @if (report(); as r) {
            <!-- Patient Demographics Section -->
            <div class="grid grid-cols-12 gap-x-6 gap-y-4 mb-10 bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div class="col-span-12 mb-2">
                <span class="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Patient Demographics</span>
                <div class="h-0.5 w-8 bg-blue-600 mt-0.5"></div>
              </div>
              
              <div class="col-span-6 flex flex-col">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Patient Name</span>
                <span class="text-sm font-bold text-slate-800 uppercase">{{r.patientName}}</span>
              </div>
              <div class="col-span-3 flex flex-col border-l border-slate-200 pl-4">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Age / Sex</span>
                <span class="text-sm font-bold text-slate-800">{{r.age}} • {{r.sex}}</span>
              </div>
              <div class="col-span-3 flex flex-col border-l border-slate-200 pl-4 text-right">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Reference ID</span>
                <span class="text-sm font-mono font-bold text-slate-600">{{r.slNo}}</span>
              </div>

              <div class="col-span-6 flex flex-col border-t border-slate-200 pt-3">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Ref. Doctor</span>
                <span class="text-xs font-bold text-slate-700 uppercase">{{r.refBy}}</span>
              </div>
              <div class="col-span-3 flex flex-col border-t border-slate-200 pt-3 pl-4">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Sample Date</span>
                <span class="text-[11px] font-bold text-slate-700">{{r.sampleDate}}</span>
              </div>
              <div class="col-span-3 flex flex-col border-t border-slate-200 pt-3 pl-4 text-right">
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Specimen</span>
                <span class="text-xs font-bold text-slate-700 uppercase">{{r.sampleType}}</span>
              </div>
            </div>

            <!-- Investigation Results Table -->
            <div class="flex-1">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="text-left font-bold border-y-2 border-slate-800 bg-slate-50">
                    <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-700">Investigation</th>
                    <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-700 text-center">Result</th>
                    <th class="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-700">Normal Range</th>
                  </tr>
                </thead>
                <tbody class="text-[12px]">
                  @for (group of r.groups; track group.title) {
                    @if (hasValues(group)) {
                      <tr class="bg-blue-900/5">
                        <td colspan="3" class="py-2.5 px-4 font-black text-blue-900 uppercase tracking-[0.2em] text-[10px] border-b border-blue-900/10">
                          {{group.title}}
                        </td>
                      </tr>
                      @for (inv of group.investigations; track inv.name) {
                        @if (inv.result) {
                          <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td class="py-3 px-4 font-semibold text-slate-700">{{inv.name}}</td>
                            <td class="py-3 px-4 text-center">
                              <span class="font-bold text-slate-900 px-3 py-1 rounded bg-slate-50 border border-slate-100 inline-block min-w-[60px]">
                                {{inv.result}} 
                              </span>
                              @if (inv.unit) {
                                <span class="text-[9px] font-bold text-slate-400 ml-2">{{inv.unit}}</span>
                              }
                            </td>
                            <td class="py-3 px-4 italic text-slate-500 font-medium">{{inv.normalValue}}</td>
                          </tr>
                        }
                      }
                    }
                  }
                </tbody>
              </table>
            </div>

            <!-- Digital Verification Disclaimer -->
             <div class="mt-8 border-t border-slate-100 pt-4 mb-12">
                <div class="bg-amber-50/50 border border-amber-100 rounded-lg p-3 flex gap-3 items-center">
                  <mat-icon class="text-amber-500 !text-sm">info</mat-icon>
                  <p class="text-[9px] text-amber-800 leading-tight italic">
                    All results are validated electronically. This report is for clinical correlation by registered medical practitioners. Values marked outside reference range require immediate medical attention.
                  </p>
                </div>
             </div>

            <!-- Validation Authority Signatures -->
            <div class="mt-auto flex justify-between items-end border-t-2 border-slate-800 pt-8">
              <div class="text-center w-56 group">
                <div class="h-10 border-b border-slate-200 mb-2 relative">
                   <div class="absolute inset-0 flex items-center justify-center opacity-10 font-serif text-3xl">SJ LAB</div>
                </div>
                <p class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Lab Incharge</p>
                <p class="text-[9px] font-bold text-slate-600">S. JAYALAKSHMI, B.Sc., M.L.T</p>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center mb-2">
                   <span class="text-[7px] text-slate-300 font-bold uppercase tracking-tighter">Seal</span>
                </div>
              </div>

              <div class="text-center w-56">
                <div class="h-10 border-b border-slate-200 mb-2 invisible print:visible"></div>
                <p class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Pathologist</p>
                <p class="text-[9px] font-bold text-slate-600">Authorized Signature</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    @media print {
      .no-print-bg { background-color: white !important; }
      body { margin: 0; padding: 0; }
      #printable-report { 
        width: 100% !important; 
        max-width: none !important; 
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      .report-page { 
        min-height: 100vh;
      }
    }
  `]
})
export class ReportDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private reportService = inject(ReportService);
  private platformId = inject(PLATFORM_ID);
  report = signal<PatientReport | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.reportService.getReportById(id);
      if (found) {
        this.report.set(found);
        if (isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.has('print')) {
          setTimeout(() => this.print(), 500);
        }
      }
    }
  }

  hasValues(group: InvestigationGroup): boolean {
    return group.investigations.some(inv => !!inv.result);
  }

  print() {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}

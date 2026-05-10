import { Injectable, signal, computed } from '@angular/core';
import { PatientReport } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportsSignal = signal<PatientReport[]>(this.loadFromStorage());

  reports = computed(() => this.reportsSignal());

  private loadFromStorage(): PatientReport[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('reports');
    if (stored) return JSON.parse(stored);
    
    // Initial dummy data
    const initial = [
      {
        id: 'r1',
        patientName: 'Mrs. TAMILSELVI',
        age: '35 Years',
        sex: 'Female' as const,
        slNo: '595 /2013',
        refBy: 'DR. D. SIVARADJE',
        sampleDate: '15-Apr-2013',
        resultDate: '15-Apr-2013',
        sampleType: 'BLOOD & URINE',
        groups: [
          {
            title: 'HAEMATOLOGY',
            investigations: [
              { name: 'HAEMOGLOBIN', result: '12', normalValue: '12.0 - 15.0', unit: 'gm%' },
              { name: 'TOTAL COUNT', result: '5,500', normalValue: '4,500 - 11,000', unit: '/cumm' }
            ]
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];
    this.saveToStorage(initial);
    return initial;
  }

  private saveToStorage(reports: PatientReport[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('reports', JSON.stringify(reports));
  }

  addReport(report: PatientReport) {
    const newReport = {
      ...report,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    const updated = [...this.reportsSignal(), newReport];
    this.reportsSignal.set(updated);
    this.saveToStorage(updated);
    return newReport;
  }

  updateReport(report: PatientReport) {
    const updated = this.reportsSignal().map(r => r.id === report.id ? report : r);
    this.reportsSignal.set(updated);
    this.saveToStorage(updated);
  }

  getReportById(id: string): PatientReport | undefined {
    return this.reportsSignal().find(r => r.id === id);
  }

  deleteReport(id: string) {
    const updated = this.reportsSignal().filter(r => r.id !== id);
    this.reportsSignal.set(updated);
    this.saveToStorage(updated);
  }
}

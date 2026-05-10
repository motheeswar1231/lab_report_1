export interface Investigation {
  name: string;
  result: string;
  normalValue: string;
  unit: string;
}

export interface InvestigationGroup {
  title: string;
  investigations: Investigation[];
}

export interface PatientReport {
  id?: string;
  patientName: string;
  age: number | string;
  sex: 'Male' | 'Female' | 'Other';
  refBy: string;
  slNo: string;
  sampleDate: string;
  resultDate: string;
  sampleType: string;
  groups: InvestigationGroup[];
  totalBillAmount?: number;
  billNo?: string;
  createdAt?: string | Date;
}

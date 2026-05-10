import { InvestigationGroup } from './report';

export const DEFAULT_TEST_GROUPS: InvestigationGroup[] = [
  {
    title: 'HAEMATOLOGY',
    investigations: [
      { name: 'HAEMOGLOBIN', result: '', normalValue: '12.0 - 15.0', unit: 'gm%' },
      { name: 'TOTAL COUNT', result: '', normalValue: '4,500 - 11,000', unit: '/cumm' },
      { name: 'POLYMORPHS', result: '', normalValue: '40 - 65', unit: '%' },
      { name: 'LYMPHOCYTES', result: '', normalValue: '30 - 50', unit: '%' },
      { name: 'EOSINOPHIL', result: '', normalValue: '2 - 8', unit: '%' },
      { name: 'MONOCYTES', result: '', normalValue: '2 - 4', unit: '%' },
      { name: 'E.S.R', result: '', normalValue: '5 - 20', unit: 'mm/hr' },
      { name: 'PLATELET COUNT', result: '', normalValue: '1.4 - 4.4', unit: 'lakhs/cumm' },
      { name: 'AB. EOSINOPHIL COUNT', result: '', normalValue: '40 - 440', unit: '/cumm' },
      { name: 'SMEAR FOR MP', result: 'NEGATIVE', normalValue: 'NEGATIVE', unit: '' },
      { name: 'SMEAR FOR MF', result: 'NEGATIVE', normalValue: 'NEGATIVE', unit: '' },
      { name: 'R.B.C', result: '', normalValue: '4.5 - 5.5', unit: 'millions/cumm' },
      { name: 'P.C.V', result: '', normalValue: '40 - 52', unit: '%' },
      { name: 'M.C.V', result: '', normalValue: '76 - 96', unit: 'cu.microns' },
      { name: 'M.C.H', result: '', normalValue: '27 - 32', unit: 'mmg' },
      { name: 'M.C.H.C', result: '', normalValue: '32 - 36', unit: '%' },
    ]
  },
  {
    title: 'BIOCHEMISTRY',
    investigations: [
      { name: 'RANDOM GLUCOSE', result: '', normalValue: '80 - 140', unit: 'mg/dl' },
      { name: 'FASTING GLUCOSE', result: '', normalValue: '70 - 110', unit: 'mg/dl' },
      { name: 'POST PRANDIAL GLUCOSE', result: '', normalValue: '80 - 140', unit: 'mg/dl' },
      { name: 'BLOOD UREA', result: '', normalValue: '15 - 40', unit: 'mg/dl' },
      { name: 'SERUM CREATININE', result: '', normalValue: '0.4 - 1.4', unit: 'mg/dl' },
      { name: 'SERUM URIC ACID', result: '', normalValue: '2.4 - 7.0', unit: 'mg/dl' },
      { name: 'SERUM CALCIUM', result: '', normalValue: '8.1 - 10.4', unit: 'mg/dl' },
      { name: 'SERUM PHOSPHORUS', result: '', normalValue: '3.0 - 5.0', unit: 'mg/dl' },
      { name: 'BUN', result: '', normalValue: '7.0 - 18.0', unit: 'mg/dl' },
      { name: 'HBA1C', result: '', normalValue: '4.0 - 6.0', unit: '%' },
      { name: 'AVERAGE BLOOD GLUCOSE', result: '', normalValue: '90 - 120', unit: 'mg/dl' },
      { name: 'SGOT', result: '', normalValue: '0 - 40', unit: 'IU/L' },
      { name: 'SGPT', result: '', normalValue: '0 - 40', unit: 'IU/L' },
      { name: 'ALKALINE PHOSPHATASE', result: '', normalValue: '53 - 128', unit: 'IU/L' },
      { name: 'TOTAL PROTEIN', result: '', normalValue: '6.0 - 8.0', unit: 'gm/dl' },
      { name: 'SERUM ALBUMIN', result: '', normalValue: '3.5 - 5.0', unit: 'gm/dl' },
    ]
  },
  {
    title: 'LIPID PROFILE',
    investigations: [
      { name: 'CHOLESTEROL', result: '', normalValue: '< 200', unit: 'mg/dl' },
      { name: 'TRIGLYCERIDES', result: '', normalValue: 'upto - 170', unit: 'mg/dl' },
      { name: 'HDL CHOLESTEROL', result: '', normalValue: '35 - 55', unit: 'mg/dl' },
      { name: 'LDL CHOLESTEROL', result: '', normalValue: 'upto - 155', unit: 'mg/dl' },
      { name: 'VLDL CHOLESTEROL', result: '', normalValue: '', unit: 'mg/dl' },
      { name: 'TOTAL CHOLESTEROL / HDL', result: '', normalValue: '3.0 - 5.0', unit: '' },
      { name: 'LDL/HDL RATIO', result: '', normalValue: '2.8 - 4.1', unit: '' },
    ]
  },
  {
    title: 'ELECTROLYTES',
    investigations: [
      { name: 'SODIUM', result: '', normalValue: '136 - 146', unit: 'mEq/l' },
      { name: 'POTASSIUM', result: '', normalValue: '3.5 - 5.0', unit: 'mEq/l' },
      { name: 'CHLORIDE', result: '', normalValue: '96 - 106', unit: 'mEq/l' },
      { name: 'BICARBONATE', result: '', normalValue: '18 - 28', unit: 'mEq/l' },
    ]
  },
  {
    title: 'URINE ANALYSIS',
    investigations: [
      { name: 'URINE ALBUMIN', result: 'NIL', normalValue: 'NIL', unit: '' },
      { name: 'URINE SUGAR', result: 'NIL', normalValue: 'NIL', unit: '' },
      { name: 'KETONE', result: 'NEGATIVE', normalValue: 'NEGATIVE', unit: '' },
      { name: 'SPECIFIC GRAVITY', result: '1.015', normalValue: '1.005-1.030', unit: '' },
      { name: 'PH', result: '6.0', normalValue: '4.5-8.0', unit: '' },
    ]
  }
];

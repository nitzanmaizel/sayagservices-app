export interface TableCell {
  text: string;
  bold?: boolean;
  underline?: boolean;
}

export interface TableRow {
  cells: TableCell[];
}

export interface NewDoc {
  title: string;
  documentId: string;
}

export interface TableData {
  title: string;
  clientName: string;
  rows: TableRow[];
}

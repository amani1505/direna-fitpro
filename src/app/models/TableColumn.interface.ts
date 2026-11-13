/** A table row: any record with an id. Other fields are read by column key. */
export interface TableRow {
  id: string;
  selected?: boolean;
}

export interface BaseTableColumn {
  key: string;
  type:
    | 'text'
    | 'image'
    | 'badge'
    | 'button'
    | 'checkbox'
    | 'actions'
    | 's/n'
    | 'status'
    | 'date';
  align?: 'left' | 'center' | 'right';
}

export interface HeaderColumn extends BaseTableColumn {
  label?: string;
}

export interface RowColumn extends BaseTableColumn {
  alt?: string;
  actionType?: ('delete' | 'update' | 'view')[];
  icon?: string;
  action?: (row: TableRow) => void;
}

export interface TableActions {
  type: 'search' | 'select' | 'button';
  label?: string;
  value?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  action: (value: Event | string | null) => void;
}

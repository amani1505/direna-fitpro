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
  actionType?: Array<'delete' | 'update' | 'view'>;
  icon?: string;
  action?: Function;
}

export interface TableActions {
  type: 'search' | 'select' | 'button';
  label?: string;
  value?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  action: (value: Event | string | null) => void;
}

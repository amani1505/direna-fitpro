export interface BaseTableColumn {
  key: string;
  type: 'text' | 'image' | 'badge' | 'button' | 'checkbox' | 'actions';
  align?: 'left' | 'center' | 'right';
}

export interface HeaderColumn extends BaseTableColumn {
  label?: string;
}

export interface RowColumn extends BaseTableColumn {
  alt?: string;
  action?: (data: any) => any;
  actionType?: Array<'delete' | 'update' | 'view'>;
  icon?: string;
}

export interface TableActions {
  type: 'search' | 'select' | 'button';
  label?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  action: (value: Event | string | null) => void;
}

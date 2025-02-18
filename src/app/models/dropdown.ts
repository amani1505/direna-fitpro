export interface DropdownConfig {
  triggerType: 'button' | 'icon' | 'avatar' | 'custom';
  width?: string;
  position?: 'left' | 'right' | 'center';
  animation?: 'fade' | 'slide' | 'scale';
}

export interface DropdownHeader {
  image?: string;
  title?: string;
  subtitle?: string;
  component?: any; // For custom header component
}

export interface DropdownItem {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  disabled?: boolean;
  badge?: {
    text: string;
    color?: string;
  };
  divider?: boolean;
}

export interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

export interface ModalConfig {
  title: string;
  showHeader?: boolean;
  showFooter?: boolean;
  customClass?: string;
  closeOnOverlayClick?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

import { Order } from '@model/order.interface';

/** Badge classes for each order status, shared by the overview, table and cards. */
const STATUS_TONES: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  processing: 'bg-secondary-500/15 text-secondary-700 dark:text-secondary-300',
  shipped: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  delivered: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  cancelled: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
};

export function statusTone(status: string | undefined): string {
  return STATUS_TONES[status ?? ''] ?? 'bg-surface-2 text-muted';
}

/** Delivered and cancelled orders can no longer be cancelled. */
export function canCancel(order: Order): boolean {
  return order.status !== 'delivered' && order.status !== 'cancelled';
}

/** Total number of units in the order. */
export function itemCount(order: Order): number {
  const items = order?.items ?? [];
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

/** First photo of up to `max` items, plus how many items are not shown. */
export function orderThumbs(order: Order, max = 3): { images: string[]; more: number } {
  const items = order?.items ?? [];
  const images = items
    .map((item) => item.equipment?.files?.[0]?.file_path)
    .filter((path): path is string => !!path);
  return { images: images.slice(0, max), more: Math.max(items.length - max, 0) };
}

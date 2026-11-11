/**
 * Single source of truth for the business's public contact details.
 * Used by the Contact page and the landing footer.
 *
 * NOTE: address, phone numbers and emails below are carried over from the
 * original site template and should be replaced with Direna FitPro's real
 * details. The map coordinates point to Dar es Salaam.
 */
export interface ContactLink {
  label: string;
  href: string;
}

export interface OpeningHours {
  days: string;
  time: string;
}

export const CONTACT_INFO = {
  address: '1247/Plot No. 39, 15th Phase, Colony, Kukatpally, Hyderabad',
  phones: [
    { label: '1800-121-3637', href: 'tel:18001213637' },
    { label: '+91 555 234-8765', href: 'tel:+915552348765' },
  ] as ContactLink[],
  emails: [
    { label: 'info@fitlife.com', href: 'mailto:info@fitlife.com' },
    { label: 'services@fitlife.com', href: 'mailto:services@fitlife.com' },
  ] as ContactLink[],
  hours: [
    { days: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
    { days: 'Saturday – Sunday', time: '7:00 AM – 2:00 PM' },
  ] as OpeningHours[],
  map: { lat: -6.757139, lng: 39.126722, zoom: 15 },
};

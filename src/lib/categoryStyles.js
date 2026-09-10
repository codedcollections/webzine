export const categoryStyles = {
  nyheter: 'bg-blue-100 text-blue-700',
  guide:   'bg-emerald-100 text-emerald-700',
  recension: 'bg-amber-100 text-amber-700',
  fordjupning: 'bg-green-100 text-green-700'
};

export function getCategoryStyle(slug) {
  return categoryStyles[slug] || 'bg-gray-100 text-gray-700';
}
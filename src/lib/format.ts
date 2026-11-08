export function formatDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number);
	const date = new Date(year, (month ?? 1) - 1, day ?? 1);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

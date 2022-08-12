export function toPageTitle(slug: string) {
	const noHypens = slug.replace(/-/g, ' ');
	const words = noHypens.split(' ');

	return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

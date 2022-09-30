/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				// Assumes Navbar is 70px
				'home-hero': 'calc(100vh - 70px)'
			},
			maxHeight: {
				'home-hero': 'calc(100vh - 70px)'
			},
			minHeight: {
				'home-hero': 'calc(100vh - 70px)'
			},
			colors: {
				'dark-red': '#E8504A',
				'dark-orange': '#EB8045',
				'dark-yellow': '#FDD535',
				'dark-turquoise-g': '#74B26E',
				'dark-turquoise-b': '#4CBEB3',
				'dark-blue': '#60A0DC',
				'dark-purple': '#8B7AB0',
				'dark-bronze': '#E8CDAE',

				'light-red': '#EE7E7A',
				'light-orange': '#EF9A6B',
				'light-yellow': '#FEECA5',
				'light-turquoise-g': '#BDDEBA',
				'light-turquoise-b': '#A4DFD9',
				'light-blue': '#ABCDED',
				'light-purple': '#BDB3D0',
				'light-cream': '#E8CDAE',

				'dark-1': '#000000',
				'dark-2': '#040506',
				'dark-3': '#1A2128',
				'dark-4': '#303C4A',

				gray: '#B2BFCD',
				'off-white': '#F9FAFB'
			},
			gridTemplateRows: {
				12: 'repeat(12, minmax(0, min-content))'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};

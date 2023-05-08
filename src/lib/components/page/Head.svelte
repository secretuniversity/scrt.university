<script lang="ts">
	export let pageTitle = '';
	export let pageDescription =
		'Secret University is providing devs with the knowledge to build a private, decentralized web. Learn how you can join the university and help us to support our developers.';
</script>

<svelte:head>
	<title>{pageTitle} | Secret University</title>
	<meta name="description" content={pageDescription} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JN93QM8T8Z"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-JN93QM8T8Z');
	</script>
	<!-- Hotjar Tracking Code for https://scrt.university -->
	<script>
		(function (h, o, t, j, a, r) {
			h.hj =
				h.hj ||
				function () {
					(h.hj.q = h.hj.q || []).push(arguments);
				};
			h._hjSettings = { hjid: 3477040, hjsv: 6 };
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
	</script>
	<script async data-id="101408546" src="//static.getclicky.com/js"></script>
</svelte:head>

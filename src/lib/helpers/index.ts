import { get } from 'svelte/store';
import { notificationsStore } from '../stores';
import type { ArticleRequest, PathwayRequest } from '$lib/models/index';

type Draft = PathwayRequest | ArticleRequest;
type DraftStorage = { drafts: Record<string, Draft[]> };

export function slugify(str: string) {
	return str
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-');
}

export function getBaseAPIUrl() {
	if (process.env.APP_ENV === 'production') {
		if (process.env.CELADON_URL) {
			return process.env.CELADON_URL;
		}

		console.error('No CELADON_URL set in production environment');
		return '';
	} else {
		return '/api';
	}
}

export function getNotification(
	message: string,
	status: 'success' | 'error' | 'info',
	loading = false
) {
	const n = get(notificationsStore);

	return {
		id: n.length,
		message,
		status,
		loading,
		close: false
	};
}

export function unslugify(str: string) {
	return str
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/-/g, ' ');
}

export function saveLocalDraft(key: string, value: Draft) {
	const drafts = localStorage.getItem('drafts');

	if (drafts) {
		const parsed = JSON.parse(drafts);

		if (parsed[key] as Draft[]) {
			parsed[key] = [value, ...parsed[key]];
		} else {
			parsed[key] = [value];
		}

		localStorage.setItem('drafts', JSON.stringify(parsed));
	} else {
		const newDrafts = { drafts: {} } as DraftStorage;
		newDrafts.drafts[key] = [value];
		localStorage.setItem('drafts', JSON.stringify(newDrafts));
	}
}

export function loadLocalDrafts(key: string): Draft[] | null {
	const drafts = localStorage.getItem('drafts');

	if (!drafts) return null;
	if (!JSON.parse(drafts)[key]) return null;

	return JSON.parse(drafts)[key];
}

export function saveJWT(name: string, token: string) {
	sessionStorage.setItem(name, token);
}

export function loadJWT(name: string): string | null {
	return sessionStorage.getItem(name);
}

export function isExpired(exp: number) {
	return exp < new Date().getTime();
}

// export async function getOrCreateUser(address: string): Promise<User> {
// 	try {
// 		const data = { address };
// 		const res = await fetch('/api/v1/users', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data)
// 		})

// 		const token = res.headers.get('token');
// 		const json = await res.json();

// 		saveJWT(token);
// 	} catch (err) {
// 		$notificationsStore = [
// 			{
// 				message: "Error creating or finding your Secret University account.",
// 				type: "error"
// 			}
// 		]
// 	}
// }

export function retry(fn: () => Promise<any>, retriesLeft = 5, interval = 1000): Promise<any> {
	return fn().catch((err) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (retriesLeft === 1) {
					// reject('maximum retries exceeded');
					reject(err);
					return;
				}

				// Passing on "reject" is the important part
				retry(fn, retriesLeft - 1, interval).then(resolve, reject);
			}, interval);
		});
	});
}

export function genExp(): number {
	const exp = new Date();
	exp.setHours(exp.getHours() + 2);

	return exp.getTime();
}

export function getLessonBaseContent(): string {
	return `
		<h1>Your Lesson</h1>
		<p>This editor supports markdown and will apply styling changes as you type</p>
		<p>It even supports code samples:</p>
		<pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
	`;
}

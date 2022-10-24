import type { ArticleRequest, PathwayRequest, User } from '$lib/models/index'

type Draft = PathwayRequest | ArticleRequest
type DraftStorage = { drafts: Record<string, Draft[]> }

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
	const drafts = localStorage.getItem('drafts')

	if (drafts) {
		const parsed = JSON.parse(drafts)

		if (parsed[key] as Draft[]) {
			parsed[key] = [value, ...parsed[key]]	
		} else {
			parsed[key] = [value]
		}

		localStorage.setItem('drafts', JSON.stringify(parsed))
	} else {
		const newDrafts = { drafts: {} } as DraftStorage
		newDrafts.drafts[key] = [value]
		localStorage.setItem('drafts', JSON.stringify(newDrafts))
	}
}

export function loadLocalDrafts(key: string): Draft[] | null {
	const drafts = localStorage.getItem('drafts');

	if (!drafts) return null
	if (!JSON.parse(drafts)[key]) return null

	return JSON.parse(drafts)[key]
};

export function saveJWT(name: string, token: string) {
	sessionStorage.setItem(name, token);
}

export function loadJWT(name: string): string | null {
	return sessionStorage.getItem(name);
}

export function isExpired(exp: number) {
	return exp < new Date().getTime();
}

export async function getOrCreateUser(address: string): Promise<User | null> {
	return new Promise((resolve, reject) => {
		const data = { address };

		fetch('/api/v1/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((res) => {
				console.log('HERE')
				const token = res.headers.get('token');

				if (token) {
					saveJWT('user', token);
				}

				return res.json();
			})
			.then((res) => {
				resolve(res.data as User)
			})
			.catch(() => {
				reject("Error getting user");
			})

	})
}

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
		})
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

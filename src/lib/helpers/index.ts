export function toPageTitle(slug: string) {
	const noHypens = slug.replace(/-/g, ' ');
	const words = noHypens.split(' ');

	const test = '';

	return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
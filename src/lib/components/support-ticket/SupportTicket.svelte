<form class="w-full space-y-8 divide-y divide-gray">
	<div class="space-y-8 divide-y divide-gray sm:space-y-5">
		<div>
			<div>
				<h3 class="text-lg font-semibold leading-6 text-white">Support Ticket</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray">
					This ticket will be sent directly to the Secret University team.
				</p>
			</div>

			<div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="subject" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Subject
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							id="subject"
							name="subject"
							type="text"
							class="block w-full max-w-lg rounded-md border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="username" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Topic
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<div class="flex max-w-lg rounded-md shadow-sm">
							<span
								class="inline-flex items-center rounded-l-md border border-r-0 border-none bg-dark-2 px-3 text-gray sm:text-sm"
							>
								scrt.university/
							</span>
							<input
								type="text"
								name="username"
								id="username"
								autocomplete="username"
								class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-none bg-dark-3 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="email" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Email address
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							class="block w-full max-w-lg rounded-md border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="about" class="block text-sm font-medium text-off-white sm:mt-px sm:pt-2">
						Description
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<textarea
							id="about"
							name="about"
							rows="3"
							class="block w-full max-w-lg rounded-md border border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<p class="mt-2 text-sm text-gray">Describe your problem in a couple sentences.</p>
					</div>
				</div>

				<div
					class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray sm:pt-5"
				>
					<label for="os" class="block text-sm font-medium text-off-white">Operating System</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<select
							id="os"
							name="os"
							class="block w-full max-w-lg rounded-md border border-none bg-dark-3 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option>Windows</option>
							<option>Mac OS</option>
							<option>Linux</option>
						</select>
					</div>
				</div>

				<div />
			</div>
		</div>
	</div>

	<div class="pt-5">
		<div class="flex justify-end">
			<button
				type="button"
				class="rounded-md bg-white py-2 px-4 text-sm font-medium text-dark-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Clear</button
			>
			<button
				type="submit"
				class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Submit</button
			>
		</div>
	</div>
</form>

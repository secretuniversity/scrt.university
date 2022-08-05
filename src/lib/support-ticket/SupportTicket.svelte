<form class="divide-gray-200 space-y-8 divide-y">
	<div class="divide-gray-200 space-y-8 divide-y sm:space-y-5">
		<div>
			<div>
				<h3 class="text-gray-900 text-lg font-medium leading-6">Support Ticket</h3>
				<p class="text-gray-500 mt-1 max-w-2xl text-sm">
					This ticket will be sent directly to the Secret University team.
				</p>
			</div>

			<div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
				<div
					class="sm:border-gray-200 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5"
				>
					<label for="subject" class="text-gray-700 block text-sm font-medium sm:mt-px sm:pt-2">
						Subject
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							id="subject"
							name="subject"
							type="text"
							class="border-gray-300 block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:border-gray-200 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5"
				>
					<label for="username" class="text-gray-700 block text-sm font-medium sm:mt-px sm:pt-2">
						Topic
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<div class="flex max-w-lg rounded-md shadow-sm">
							<span
								class="border-gray-300 bg-gray-50 text-gray-500 inline-flex items-center rounded-l-md border border-r-0 px-3 sm:text-sm"
							>
								scrt.university/
							</span>
							<input
								type="text"
								name="username"
								id="username"
								autocomplete="username"
								class="border-gray-300 block w-full min-w-0 flex-1 rounded-none rounded-r-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>
				</div>

				<div
					class="sm:border-gray-200 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5"
				>
					<label for="email" class="text-gray-700 block text-sm font-medium sm:mt-px sm:pt-2">
						Email address
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							class="border-gray-300 block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div
					class="sm:border-gray-200 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5"
				>
					<label for="about" class="text-gray-700 block text-sm font-medium sm:mt-px sm:pt-2">
						Description
					</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<textarea
							id="about"
							name="about"
							rows="3"
							class="border-gray-300 block w-full max-w-lg rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<p class="text-gray-500 mt-2 text-sm">Describe your problem in a couple sentences.</p>
					</div>
				</div>

				<div
					class="sm:border-gray-200 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5"
				>
					<label for="os" class="text-gray-700 block text-sm font-medium">Operating System</label>
					<div class="mt-1 sm:col-span-2 sm:mt-0">
						<select
							id="os"
							name="os"
							class="border-gray-300 block w-full max-w-lg rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
				class="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md border bg-white py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Clear</button
			>
			<button
				type="submit"
				class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Submit</button
			>
		</div>
	</div>
</form>

<template>
	<header class="flex justify-between items-center pt-5 px-3 pb-3 sm:p-5 sm:pb-3 tracking-wider">
		<h1 class="text-white">
			<a href="" class="flex items-center"
				><span className="mr-1">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
						<path
							d="M167-120q-21 5-36.5-10.5T120-167l40-191 198 198-191 40Zm191-40L160-358l458-458q23-23 57-23t57 23l84 84q23 23 23 57t-23 57L358-160Zm317-600L261-346l85 85 414-414-85-85Z"
						/>
					</svg>
				</span>
				<span className="font-bold">{{ title }}</span></a
			>
		</h1>
		<p>
			<button class="text-white focus:outline-none m-0 p-1">
				<div class="btn-trigger" id="btn03">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
		</p>
	</header>
	<nav
		class="p-8 rounded-lg bg-white inline-block w-auto absolute right-3 sm:right-5 shadow-md transition-opacity duration-500"
	></nav>
</template>

<script>
export default {
	data() {
		return {
			title: '旅ノート',
		}
	},
}
</script>

<template>
	<main class="mainWrapper px-3 sm:px-5">
		<section
			className="rounded-lg overflow-hidden border border-neutral-200/60 bg-white text-neutral-700 shadow-sm w-full p-5 sm:p-10 sm:pt-8"
		>
			<h2 class="pageTitle">ログイン</h2>
			<form @submit.prevent="login">
				<p class="mb-5">
					<label class="text-sm text-gray-700 block mb-1 font-medium">お名前</label
					><input
						v-model="email"
						type="email"
						class="text-base bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full"
						placeholder="Email"
						required
					/>
				</p>
				<p class="mb-5">
					<label class="text-sm text-gray-700 block mb-1 font-medium">お名前</label
					><input
						v-model="password"
						type="password"
						class="text-base bg-gray-100 border border-gray-200 rounded py-1 px-3 inline-block text-gray-700 placeholder:text-neutral-500 placeholder:text-xs w-full"
						placeholder="Password"
						required
					/>
				</p>
				<p class="mb-5 text-center">
					<button
						type="submit"
						class="py-1.5 px-4 transition-colors bg-green-600 border active:bg-green-800 font-bold border-green-700 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
					>
						ログイン
					</button>
				</p>
			</form>
			<p v-if="error">{{ error }}</p>
		</section>
	</main>
</template>

<script setup>
import {ref} from 'vue'
import api from '../services/api'
import {useRouter} from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
	error.value = ''
	try {
		await api.get('/sanctum/csrf-cookie')
		await api.post('/login', {email: email.value, password: password.value})
		router.push('/another-page')
	} catch (err) {
		if (err.response) {
			// サーバーからのレスポンスがある場合
			error.value = `登録失敗: ${err.response.data.message || err.response.statusText}`
			console.error('Error response:', err.response)
		} else if (err.request) {
			// リクエストは送ったがレスポンスがない場合
			error.value = '登録失敗: サーバーからの応答なし'
			console.error('No response:', err.request)
		} else {
			// その他のエラー
			error.value = `登録失敗: ${err.message}`
			console.error('Error:', err.message)
		}
	}
}
</script>

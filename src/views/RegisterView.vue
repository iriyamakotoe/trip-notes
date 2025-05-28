<template>
	<div>
		<h2>新規登録</h2>
		<form @submit.prevent="register">
			<input v-model="name" type="text" placeholder="Name" required />
			<input v-model="email" type="email" placeholder="Email" required />
			<input
				v-model="password"
				type="password"
				placeholder="Password"
				required
			/>
			<input
				v-model="password_confirmation"
				type="password"
				placeholder="Confirm Password"
				required
			/>
			<button type="submit">登録</button>
		</form>
		<p v-if="error">{{ error }}</p>
	</div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const register = async () => {
	error.value = "";
	try {
		await api.get("/sanctum/csrf-cookie");
		await api.post("/register", {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: password_confirmation.value,
		});
		alert("登録成功！");
	} catch (err) {
		if (err.response) {
			// サーバーからのレスポンスがある場合
			error.value = `登録失敗: ${err.response.data.message || err.response.statusText}`;
			console.error("Error response:", err.response);
		} else if (err.request) {
			// リクエストは送ったがレスポンスがない場合
			error.value = "登録失敗: サーバーからの応答なし";
			console.error("No response:", err.request);
		} else {
			// その他のエラー
			error.value = `登録失敗: ${err.message}`;
			console.error("Error:", err.message);
		}
	}
};
</script>

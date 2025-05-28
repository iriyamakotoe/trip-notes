<template>
	<div>
		<h2>ログイン</h2>
		<form @submit.prevent="login">
			<input v-model="email" type="email" placeholder="Email" required />
			<input
				v-model="password"
				type="password"
				placeholder="Password"
				required
			/>
			<button type="submit">ログイン</button>
		</form>
		<p v-if="error">{{ error }}</p>
	</div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
	error.value = "";
	try {
		await api.get("/sanctum/csrf-cookie"); // 必須：Sanctumの初期化
		await api.post("/login", { email: email.value, password: password.value });
		alert("ログイン成功！");
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

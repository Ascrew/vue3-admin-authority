<!--
 * @Author: zhangyu
 * @Date: 2022-07-19 15:14:28
 * @LastEditors: Please set LastEditors
 * @Description:  后台管理登录界面
 * @FilePath: src/views/login/index.vue
-->
<template>
  <div class="login-container">
    <div class="main">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        v-show="isLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-tooltip
          :visible="capsTooltip"
          content="Caps lock is on"
          placement="right"
          manual
        >
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              @keyup="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="right-form-item">
          <a class="confirm-btn" @click="onTurnRegister">注册</a>
        </el-form-item>
      </el-form>

      <el-form
        ref="formRegisterRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="80px"
        v-show="!isLogin"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="registerForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-tooltip
          :visible="capsTooltip"
          content="Caps lock is on"
          placement="right"
          manual
        >
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              @keyup="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter="register"
            ></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="重复密码" prop="rePassword">
          <el-input
            v-model="registerForm.rePassword"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="register"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="right-form-item">
          <a class="confirm-btn" @click="onTurnLogin">已有账号，直接登录</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { loginApi, registerApi } from "@/api/admin/adminUser";
import { useStore } from "vuex";
import {
  useRoute,
  useRouter,
  LocationQuery,
  RouteLocationNormalizedLoaded,
} from "vue-router";

interface Form {
  username: string;
  password: string;
}

interface RegisterForm extends Form {
  nickname: string;
  rePassword: string;
  email: string;
}

const store = useStore();
const route = useRoute();
const router = useRouter();

const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as LocationQuery);
};

watch(route, (newVal: RouteLocationNormalizedLoaded) => {
  const query = newVal.query as LocationQuery;
  if (query) {
    redirect.value = query.redirect as string;
    otherQuery = getOtherQuery(query);
  }
});

const formRef = ref();
const isLogin = ref(true);

const form = reactive<Form>({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const loading = ref(false);
const redirect = ref("");
// const otherQuery: Dictionary<string> = {};
let otherQuery = reactive({});

const login = async () => {
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      loginApi(form)
        .then(async (res) => {
          if (res.code === 0) {
            ElMessage.success("登录成功");
            await store.dispatch("Login", res);
            router.push({
              path: redirect.value || "/",
              query: otherQuery,
            });
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

let capsTooltip = ref(false);

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e;
  capsTooltip.value =
    key !== null && key.length === 1 && key >= "A" && key <= "Z";
};

const onTurnRegister = () => {
  isLogin.value = false;
};

const formRegisterRef = ref();

const registerForm = reactive<RegisterForm>({
  nickname: "",
  username: "",
  password: "",
  rePassword: "",
  email: "",
});

const registerRules = reactive({
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  rePassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
});

const register = async () => {
  await formRegisterRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      let registerRes = await registerApi(registerForm);
      if (registerRes.code === 0) {
        ElMessage.success("注册成功");
        await store.dispatch("Login", registerRes);
        router.push({
          path: redirect.value || "/",
          query: otherQuery,
        });
      }
      loading.value = false;
    }
  });
};

const onTurnLogin = () => {
  isLogin.value = true;
};
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  background: no-repeat center/cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.login-btn) {
  width: 100%;
}
.right-form-item {
  float: right;
}
.confirm-btn {
  cursor: pointer;
  color: #409eff;
}
</style>

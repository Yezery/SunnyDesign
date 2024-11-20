import withNuxt from "./.nuxt/eslint.config.mjs"
import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

export default withNuxt(
  [
    {
      languageOptions: {
        globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
        ecmaVersion: "latest",
        parser: tseslint.parser
      }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"], // Vue3
    {
      rules: {
        // 写上规范代码的规则，具体规则参考 ESLint 官方文档啦
      }
    },
    { ignores: [".nuxt/"] } // 忽略校验 .nuxt/ 目录下的所有文件
  ]

)

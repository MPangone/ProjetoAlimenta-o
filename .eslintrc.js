module.exports = {
  parser: "vue-eslint-parser", // Use o parser para arquivos Vue
  parserOptions: {
    parser: "@babel/eslint-parser", // Use o parser do Babel para entender sintaxe ES6
    requireConfigFile: false, // Necessário para o Babel parser
    ecmaVersion: 2020, // Permite a sintaxe moderna do ECMAScript
    sourceType: "module", // Permite o uso de módulos ES6
  },
  rules: {
    'vue/multi-word-component-names': 'off', // Desativa a regra de nomes multi-palavras
  },
  env: {
    browser: true, // Para reconhecer variáveis globais do navegador como "window"
    node: true,    // Para reconhecer variáveis globais do Node.js
  },
};

# 1 Cliente (browser)

# 2

```bash
tutorial/                        # pasta raiz geral de nosso projeto
└─ client-browser/               # pasta da aplicação cliente -> arraste esta pasta para dentro do vscode
   └─ src/                       # pasta onde colocaremos nosso código fonte
      ├─ components/             #
      │  └─ form-pessoa          #
      │     ├─ form-pessoa.html  #
      │     ├─ form-pessoa.scss  #
      │     └─ index.ts          # 
      ├─ .d.ts                   #
      ├─ index.html              # 
      ├─ main.scss               # 
      └─ main.ts                 # 
```

```bash
npm init -y
```

```bash
 npm install --save-dev parcel
 ````

 > :warning: **ATENÇÃO** ... `npm install --save-dev parcel@nightly` ...

**`src\index.html`**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Browser Client</title>
</head>
<body>
    <script type="module" src="./main.ts"></script>
</body>
</html>
```

**`src\.d.ts`**
 ```typescript
 declare module "bundle-text:*" {
    const val: string
    export default val
}
 ```
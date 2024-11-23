
# Guia de Uso do Projeto

### Primeiro Passo

Execute o comando abaixo no terminal para instalar as dependências do projeto:

```bash
npm install
```

### Segundo Passo

No arquivo `supabase.tsx`, insira a sua **chave** e a **URL** do Supabase.

### Terceiro Passo

Inicie o projeto com o comando:

```bash
npx expo start
```

Após isso, selecione o modo de visualização **web** pressionando a tecla **W** no terminal.

---

### Funcionamento do Projeto

O projeto possui três telas principais: Login, Registro e Logado. A página de login exige que o usuário insira um e-mail e uma senha previamente cadastrados para acessar a página Logado. Se um e-mail inexistente ou uma senha inválida forem informados, o acesso à página Logado será bloqueado.

Na página de Registro, o usuário deve inserir um e-mail e uma senha. Após pressionar o botão de Registrar, um e-mail será enviado para o endereço informado. Esse e-mail contém um link que deve ser clicado para confirmar a criação do usuário na plataforma.

Caso o e-mail informado não exista você não será capaz de criar a conta na plataforma, uma vez que não confirmará através do link.

Depois de clicar no link de confirmação, o usuário será redirecionado para a página de login, onde precisará inserir o e-mail e a senha cadastrados. Ao fazer isso corretamente, o usuário será autenticado e terá acesso à página Logado.

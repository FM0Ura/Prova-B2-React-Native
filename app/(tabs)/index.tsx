import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar estados locais.
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa componentes básicos do React Native.
import { supabase } from '@/supabase'; // Importa a instância do Supabase configurada previamente.
import { useRouter } from 'expo-router'; // Importa o hook de roteamento do Expo Router.

export let isAuthenticated = false; 
// Variável global para rastrear o estado de autenticação (pode não ser a melhor abordagem para gerenciamento de estado).

const LoginScreen: React.FC = () => {
  // Declara estados para armazenar o e-mail, a senha e as mensagens de feedback para o usuário.
  const [email, setEmail] = useState<string>(''); // Armazena o e-mail digitado pelo usuário.
  const [password, setPassword] = useState<string>(''); // Armazena a senha digitada pelo usuário.
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null); 
  // Armazena mensagens de feedback (sucesso ou erro).
  const router = useRouter(); // Hook para manipular a navegação.

  // Função que realiza o login do usuário.
  const handleLogin = async () => {
    // Tenta autenticar o usuário no Supabase com e-mail e senha.
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Caso haja um erro, define a mensagem com o erro retornado.
      setMessage({ text: error.message, type: 'error' });
    } else {
      // Caso o login seja bem-sucedido, exibe uma mensagem de sucesso.
      setMessage({ text: 'Seu login foi realizado com sucesso!', type: 'success' });
      
      // Aguarda 2 segundos e redireciona o usuário para a página principal.
      setTimeout(() => {
        isAuthenticated = true; // Atualiza a variável global indicando que o usuário está autenticado.
        router.push('../logado'); // Redireciona para a tela principal (ajuste o caminho se necessário).
      }, 2000); // Delay de 2 segundos.
    }
  };

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Login</Text>

      {/* Campo de entrada para o e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail" // Texto exibido quando o campo está vazio.
        value={email} // Liga o campo ao estado do e-mail.
        onChangeText={setEmail} // Atualiza o estado ao digitar algo no campo.
        keyboardType="email-address" // Define o tipo de teclado apropriado para e-mails.
        autoCapitalize="none" // Impede a capitalização automática do texto.
      />

      {/* Campo de entrada para a senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha" // Texto exibido quando o campo está vazio.
        value={password} // Liga o campo ao estado da senha.
        onChangeText={setPassword} // Atualiza o estado ao digitar algo no campo.
        secureTextEntry // Oculta o texto digitado (para senhas).
      />

      {/* Botão para realizar o login */}
      <Button title="Entrar" onPress={handleLogin} />

      {/* Exibição de mensagens de sucesso ou erro */}
      {message && (
        <Text
          style={[
            styles.message, // Aplica estilos básicos.
            { color: message.type === 'success' ? 'green' : 'red' }, // Define a cor (verde para sucesso, vermelho para erro).
          ]}
        >
          {message.text} {/* Exibe a mensagem de feedback. */}
        </Text>
      )}
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: { 
    flex: 1, // Faz o container ocupar toda a altura da tela.
    justifyContent: 'center', // Centraliza os elementos verticalmente.
    padding: 20, // Adiciona espaço interno ao redor do conteúdo.
  },
  title: { 
    fontSize: 24, // Define o tamanho do texto do título.
    fontWeight: 'bold', // Deixa o texto em negrito.
    textAlign: 'center', // Centraliza o texto horizontalmente.
    marginBottom: 20, // Adiciona espaço abaixo do título.
  },
  input: { 
    borderWidth: 1, // Define uma borda ao redor do campo de entrada.
    borderColor: '#ccc', // Define a cor da borda.
    padding: 10, // Adiciona espaço interno ao redor do texto.
    marginBottom: 10, // Adiciona espaço abaixo do campo de entrada.
    borderRadius: 5, // Arredonda os cantos da borda.
  },
  message: { 
    marginTop: 20, // Adiciona espaço acima da mensagem.
    fontSize: 16, // Define o tamanho do texto.
    textAlign: 'center', // Centraliza o texto horizontalmente.
  },
});

export default LoginScreen; // Exporta o componente como padrão.

import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar o estado local.
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa componentes básicos do React Native.
import { supabase } from '@/supabase'; // Importa a instância do Supabase configurada previamente.

// Função para validar e-mail
const isEmailValid = (email: string) => {
  // Define um regex para validar o formato do e-mail.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Retorna true se o e-mail for válido, caso contrário false.
};

const RegisterScreen: React.FC = () => {
  // Declara estados para armazenar o e-mail, a senha e as mensagens de feedback para o usuário.
  const [email, setEmail] = useState<string>(''); // Estado para armazenar o e-mail do usuário.
  const [password, setPassword] = useState<string>(''); // Estado para armazenar a senha do usuário.
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null); 
  // Estado para armazenar uma mensagem de feedback (pode ser sucesso ou erro).

  // Função que lida com o registro do usuário.
  const handleRegister = async () => {
    // Limpa qualquer mensagem de feedback anterior.
    setMessage(null);

    // Valida se o e-mail é válido.
    if (!isEmailValid(email)) {
      setMessage({ text: 'Por favor, insira um e-mail válido.', type: 'error' });
      return; // Interrompe a execução se o e-mail for inválido.
    }

    // Verifica se a senha tem pelo menos 6 caracteres.
    if (password.length < 6) {
      setMessage({ text: 'A senha deve ter pelo menos 6 caracteres.', type: 'error' });
      return; // Interrompe a execução se a senha for curta demais.
    }

    try {
      // Tenta registrar o usuário no Supabase.
      const { error } = await supabase.auth.signUp({
        email: email.trim(), // Remove espaços do início/fim do e-mail.
        password: password.trim(), // Remove espaços do início/fim da senha.
      });

      if (error) {
        // Se houver erro na API, exibe a mensagem de erro.
        setMessage({ text: error.message, type: 'error' });
      } else {
        // Se o registro for bem-sucedido, exibe uma mensagem de sucesso.
        setMessage({
          text: 'Criação solicitada com sucesso! Verifique seu e-mail para confirmar a criação.',
          type: 'success',
        });
      }
    } catch (err) {
      // Captura erros inesperados e exibe uma mensagem genérica.
      console.error('Erro inesperado:', err);
      setMessage({ text: 'Ocorreu um erro inesperado. Tente novamente.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Registro</Text>

      {/* Campo de entrada para o e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail" // Texto exibido enquanto o campo está vazio.
        value={email} // Liga o campo ao estado do e-mail.
        onChangeText={setEmail} // Atualiza o estado quando o usuário digita algo.
        keyboardType="email-address" // Define o teclado apropriado para e-mails.
        autoCapitalize="none" // Impede a capitalização automática do texto.
      />

      {/* Campo de entrada para a senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha" // Texto exibido enquanto o campo está vazio.
        value={password} // Liga o campo ao estado da senha.
        onChangeText={setPassword} // Atualiza o estado quando o usuário digita algo.
        secureTextEntry // Oculta o texto digitado para proteger a senha.
      />

      {/* Botão para registrar */}
      <Button title="Registrar" onPress={handleRegister} />

      {/* Exibição de mensagem de sucesso ou erro */}
      {message && (
        <Text
          style={[
            styles.message, // Aplica estilo básico.
            { color: message.type === 'success' ? 'green' : 'red' }, // Cor verde para sucesso, vermelha para erro.
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
    flex: 1, // Faz o container ocupar toda a tela.
    justifyContent: 'center', // Centraliza os elementos verticalmente.
    padding: 20, // Adiciona espaço interno ao redor do conteúdo.
  },
  title: {
    fontSize: 24, // Define o tamanho da fonte do título.
    fontWeight: 'bold', // Deixa o texto em negrito.
    textAlign: 'center', // Centraliza o texto horizontalmente.
    marginBottom: 20, // Adiciona espaço abaixo do título.
  },
  input: {
    borderWidth: 1, // Adiciona uma borda ao redor do campo.
    borderColor: '#ccc', // Define a cor da borda.
    padding: 10, // Adiciona espaço interno.
    marginBottom: 10, // Adiciona espaço abaixo do campo.
    borderRadius: 5, // Arredonda as bordas do campo.
  },
  message: {
    marginTop: 20, // Adiciona espaço acima da mensagem.
    fontSize: 16, // Define o tamanho da fonte.
    textAlign: 'center', // Centraliza o texto horizontalmente.
  },
});

export default RegisterScreen; // Exporta o componente como padrão.

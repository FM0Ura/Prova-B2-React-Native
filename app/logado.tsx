import React from 'react'; // Importa o React para criar o componente.
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Importa componentes básicos do React Native.
import { isAuthenticated } from './(tabs)/index'; 
// Importa a variável `isAuthenticated` de outro módulo para verificar se o usuário está autenticado.

const SuccessScreen = () => {
  // Verifica se o usuário está autenticado
  if (isAuthenticated === true) {  
    return (
      <View style={styles.container}>
        {/* Tela exibida quando o usuário está autenticado */}
        <Text style={styles.title}>Login Bem-Sucedido!</Text>
        <Text style={styles.message}>Você foi logado com sucesso.</Text>
      </View>
    );
  } else {
    // Tela exibida quando o usuário **não** está autenticado
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro</Text>
        <Text style={styles.message}>Você não está logado.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container ocupar toda a tela.
    justifyContent: 'center', // Centraliza os elementos verticalmente.
    alignItems: 'center', // Centraliza os elementos horizontalmente.
    backgroundColor: '#f5f5f5', // Define uma cor de fundo clara.
  },
  title: {
    fontSize: 24, // Define o tamanho da fonte do título.
    fontWeight: 'bold', // Deixa o texto do título em negrito.
    marginBottom: 10, // Adiciona espaço abaixo do título.
    color: '#4CAF50', // Define a cor verde para o título.
  },
  message: {
    fontSize: 16, // Define o tamanho da fonte da mensagem.
    textAlign: 'center', // Centraliza o texto horizontalmente.
    marginBottom: 20, // Adiciona espaço abaixo da mensagem.
    color: '#555', // Define a cor cinza para a mensagem.
  },
  button: {
    backgroundColor: '#4CAF50', // Define o fundo verde para o botão (não utilizado nesta tela).
    padding: 10, // Adiciona espaçamento interno ao botão.
    borderRadius: 5, // Arredonda os cantos do botão.
  },
  buttonText: {
    color: '#fff', // Define a cor branca para o texto do botão (não utilizado nesta tela).
    fontSize: 16, // Define o tamanho da fonte do texto do botão.
  },
});

export default SuccessScreen; // Exporta o componente como padrão.

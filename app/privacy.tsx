import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/Button';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import theme from '@/styles/theme';
import { verticalScale, moderateScale } from '@/utils/scale';

export default function PrivacyPage() {
  return (
    <ScrollablePage>
      <StatusBar style="light" />

      <Background
        resizeMethod="scale"
        resizeMode="cover"
        source={require('assets/terra.png')}
      >
        <LogoContainer>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('assets/white_logo.png')}
          />
        </LogoContainer>
      </Background>

      <TextContainer>
        <Text weight="bold" size="h1" color="primary">
          Política de Privacidade
        </Text>
        <Text color="dark">
          Prezado(a) usuário(a), a presente Política de Privacidade visa
          esclarecer como coletamos, utilizamos, armazenamos e tratamos seus
          dados pessoais quando você utiliza nosso aplicativo de marketplace e
          educacional ("SustenTerra").
        </Text>

        <Text size="h6" color="primary">
          1. Quem Somos
        </Text>
        <Text color="dark">
          Somos a equipe SustenTerra e nosso aplicativo tem como objetivo ser um
          marketplace e plataforma de curso para produtos e serviços
          sustentáveis feitos a partir do solo.
        </Text>

        <Text size="h6" color="primary">
          2. Quais Informações Coletamos
        </Text>
        <Text size="h6" color="primary">
          2.1. Informações que você nos fornece:
        </Text>
        <Text color="dark">
          - Nome completo; <br />
          - Endereço de e-mail; <br />
          - Número de telefone; <br />
          - Endereço residencial; <br />
          - Informações de pagamento; <br />
          - Mensagens e avaliações; <br />- Outras informações que você nos
          fornece voluntariamente.
        </Text>

        <Text size="h6" color="primary">
          2.2. Informações coletadas automaticamente:
        </Text>
        <Text color="dark">
          - Endereço IP; <br />
          - Tipo de dispositivo; <br />
          - Sistema operacional; <br />
          - Localização; <br />
          - Páginas visitadas; <br />
          - Interações com o aplicativo; <br />- Histórico de compras.
        </Text>

        <Text size="h6" color="primary">
          3. Como Usamos suas Informações
        </Text>
        <Text size="h6" color="primary">
          3.1. Para fornecer os serviços do aplicativo:
        </Text>
        <Text color="dark">
          - Criar e gerenciar sua conta; <br />
          - Processar suas compras; <br />
          - Entregar os produtos; <br />
          - Oferecer suporte ao cliente; <br />
          - Enviar comunicados sobre o aplicativo; <br />- Melhorar a
          experiência do usuário.
        </Text>

        <Text size="h6" color="primary">
          3.2. Para fins de marketing:
        </Text>
        <Text color="dark">
          - Enviar e-mails promocionais; <br />
          - Exibir anúncios personalizados; <br />- Realizar pesquisas de
          mercado.
        </Text>

        <Text size="h6" color="primary">
          3.3. Para fins de segurança e proteção:
        </Text>
        <Text color="dark">
          - Prevenir fraudes e crimes; <br />
          - Proteger a segurança do aplicativo; <br />- Cumprir obrigações
          legais.
        </Text>

        <Text size="h6" color="primary">
          4. Com quem Compartilhamos suas Informações
        </Text>
        <Text size="h6" color="primary">
          4.1. Parceiros de negócios:
        </Text>
        <Text color="dark">
          Compartilhamos suas informações com empresas que nos auxiliam na
          prestação dos serviços do aplicativo, como empresas de entrega,
          processadoras de pagamento e provedores de serviços de nuvem.
        </Text>

        <Text size="h6" color="primary">
          4.2. Autoridades governamentais:
        </Text>
        <Text color="dark">
          Poderemos compartilhar suas informações com autoridades governamentais
          quando necessário para cumprir obrigações legais ou para prevenir
          crimes.
        </Text>

        <Text size="h6" color="primary">
          4.3. Terceiros:
        </Text>
        <Text color="dark">
          Poderemos compartilhar suas informações com outros terceiros, desde
          que você tenha dado seu consentimento expresso.
        </Text>

        <Text size="h6" color="primary">
          5. Seus Direitos como Titular dos Dados
        </Text>
        <Text size="h6" color="primary">
          5.1. Acesso:
        </Text>
        <Text color="dark">
          Você tem o direito de acessar seus dados pessoais que armazenamos.
        </Text>

        <Text size="h6" color="primary">
          5.2. Correção:
        </Text>
        <Text color="dark">
          Você tem o direito de solicitar a correção de seus dados pessoais caso
          estejam incorretos ou incompletos.
        </Text>

        <Text size="h6" color="primary">
          5.3. Exclusão:
        </Text>
        <Text color="dark">
          Você tem o direito de solicitar a exclusão de seus dados pessoais,
          desde que não haja impedimentos legais para tal.
        </Text>

        <Text size="h6" color="primary">
          5.4. Limitação do tratamento:
        </Text>
        <Text color="dark">
          Você tem o direito de solicitar a limitação do tratamento de seus
          dados pessoais em determinadas situações.
        </Text>

        <Text size="h6" color="primary">
          5.5. Portabilidade:
        </Text>
        <Text color="dark">
          Você tem o direito de receber seus dados pessoais em um formato
          estruturado, de uso corrente e de leitura automática, e de
          transmiti-los a outro controlador.
        </Text>

        <Text size="h6" color="primary">
          5.6. Oposição:
        </Text>
        <Text color="dark">
          Você tem o direito de se opor ao tratamento de seus dados pessoais
          para fins de marketing direto.
        </Text>

        <Text size="h6" color="primary">
          5.7. Revogação do consentimento:
        </Text>
        <Text color="dark">
          Você tem o direito de revogar seu consentimento para o tratamento de
          seus dados pessoais a qualquer tempo.
        </Text>

        <Text size="h6" color="primary">
          6. Como Exercitar seus Direitos
        </Text>
        <Text color="dark">
          Para exercer seus direitos como titular dos dados, você pode entrar em
          contato conosco através do seguinte email: sustenterra@gmail.com
        </Text>

        <Text size="h6" color="primary">
          7. Segurança dos seus Dados
        </Text>
        <Text color="dark">
          Adote medidas técnicas e organizacionais para proteger seus dados
          pessoais contra acessos não autorizados, divulgação, uso indevido,
          alteração, perda ou destruição.
        </Text>

        <Text size="h6" color="primary">
          8. Atualizações da Política de Privacidade
        </Text>
        <Text color="dark">
          Esta Política de Privacidade poderá ser atualizada periodicamente. A
          versão mais recente estará sempre disponível em
          https://sustenterra.netlify.app/privacy
        </Text>

        <Text size="h6" color="primary">
          9. Contato
        </Text>
        <Text color="dark">
          Em caso de dúvidas ou sugestões sobre esta Política de Privacidade,
          por favor, entre em contato conosco através dos canais de atendimento
          informados acima.
        </Text>

        <Text size="h6" color="primary">
          10. Legislação Aplicável
        </Text>
        <Text color="dark">
          Esta Política de Privacidade é regida pela Lei Geral de Proteção de
          Dados Pessoais (Lei nº 13.709/2018) e pelas demais leis e
          regulamentações aplicáveis.
        </Text>

        <Text size="h6" color="primary">
          11. Cookies e outras tecnologias de rastreamento
        </Text>
        <Text color="dark">
          Utilizamos cookies e outras tecnologias de rastreamento para coletar
          informações sobre seu uso do aplicativo. Essas tecnologias nos
          permitem lembrar suas preferências, personalizar sua experiência e
          melhorar a qualidade dos nossos serviços.
        </Text>

        <Text size="h6" color="primary">
          12. Menores de Idade
        </Text>
        <Text color="dark">
          O aplicativo não é direcionado a menores de 18 anos. Se você for menor
          de 18 anos, não utilize o aplicativo sem a autorização de seus pais ou
          responsáveis.
        </Text>

        <Text size="h6" color="primary">
          13. Alterações na Política de Privacidade
        </Text>
        <Text color="dark">
          Reservamo-nos o direito de alterar esta Política de Privacidade a
          qualquer tempo. Notificaremos você sobre as alterações por e-mail ou
          através do aplicativo.
        </Text>

        <Text size="h6" color="primary">
          14. Consentimento
        </Text>
        <Text color="dark">
          Ao utilizar o aplicativo, você concorda com os termos desta Política
          de Privacidade.
        </Text>

        <Text size="h6" color="primary">
          15. Vigência
        </Text>
        <Text color="dark">
          Esta Política de Privacidade entra em vigor na data de sua publicação.
        </Text>

        <Text size="h6" weight="bold" color="secondary">
          SustenTerra, 02 de abril de 2024.
        </Text>

        <Button
          color="primary"
          onPress={() => {
            router.push('/');
          }}
        >
          <Feather name="home" size={24} color={theme.colors.light} />
          <Text color="light" size={20}>
            Ir para o início
          </Text>
        </Button>
      </TextContainer>
    </ScrollablePage>
  );
}

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: ${(props) => props.theme.colors.light};
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(25)}px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(200)}px;
`;

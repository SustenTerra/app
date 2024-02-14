import Feather from '@expo/vector-icons/Feather';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { Message } from '@/api';
import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Text from '@/components/Text';
import {
  ContentBackground,
  HeaderWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'user',
    content: 'Oi!',
  },
];

function ChatMessage({ message }: { message: Message }) {
  return (
    <BallonWrapper isUser={message.role === 'user'}>
      <MessageBalloon isUser={message.role === 'user'}>
        <MessageText weight="regular" size="p">
          {message.content}
        </MessageText>
      </MessageBalloon>
    </BallonWrapper>
  );
}

export default function Chat() {
  const theme = useTheme();

  const scrollRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const getNewMessage = async (newMessage?: string) => {
    const messagesToSend = messages;
    if (newMessage) {
      messagesToSend.push({ role: 'user', content: newMessage });
      setMessages(messagesToSend);
    }

    setLoading(true);
    try {
      const newChat = await client.chat.updateChatChatPost({
        messages: messagesToSend,
      });
      setMessages(newChat.messages);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const onSendMessage = () => {
    getNewMessage(newMessage);
    setNewMessage('');

    Keyboard.dismiss();
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    getNewMessage();
  }, []);

  useLayoutEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <Container>
      <TopWrapper>
        <HeaderBackground
          defaultSource={require('assets/gray.png')}
          source={require('assets/courses.png')}
          resizeMode="cover"
        >
          <TransparentBackground>
            <ContentBackground>
              <HeaderWrapper>
                <BackButton />
                <Text weight="regular" size="h1" color="light">
                  Tire suas dúvidas
                </Text>
              </HeaderWrapper>
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      <ContentViewer
        ref={scrollRef}
        contentContainerStyle={{
          paddingVertical: verticalScale(40),
          paddingHorizontal: horizontalScale(20),
        }}
      >
        <MessagesHeader>
          <Feather
            name="message-circle"
            size={moderateScale(70)}
            color={theme.colors.textBody}
          />

          <AlertMessage
            weight="regular"
            size="h6"
            color={theme.colors.textBody}
          >
            Converse com o nosso robô especialista para tirar todas as suas
            dúvidas sobre geotinta ou produtos provenientes da terra. (em fase
            experimental, algumas respostas podem não ser precisas)
          </AlertMessage>

          {messages.slice(1).map((message) => (
            <ChatMessage key={String(Math.random())} message={message} />
          ))}

          {loading && <Loading />}
        </MessagesHeader>
      </ContentViewer>

      <InputContainer>
        <Input
          placeholder="Escreva sua mensagem"
          value={newMessage}
          onChangeText={setNewMessage}
          useFlex
          onSubmitEditing={onSendMessage}
        />

        <SendButton onPress={onSendMessage}>
          <Feather
            name="send"
            size={moderateScale(20)}
            color={theme.colors.light}
          />
        </SendButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const TopWrapper = styled.View`
  height: ${verticalScale(120)}px;
  width: 100%;
  position: relative;
  z-index: 0;
`;

const HeaderBackground = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(120)}px;
`;

const ContentViewer = styled.ScrollView`
  flex: 1;
`;

const MessagesHeader = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AlertMessage = styled(Text)`
  margin-top: ${verticalScale(20)}px;
  text-align: center;
`;

interface MessageBallonProps {
  isUser: boolean;
}

const BallonWrapper = styled.View<MessageBallonProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin-top: ${verticalScale(15)}px;
`;

const MessageBalloon = styled.View<MessageBallonProps>`
  width: 80%;
  padding: ${verticalScale(10)}px ${horizontalScale(20)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme, isUser }) =>
    isUser ? theme.colors.disabled : theme.colors.light};
  margin-bottom: ${verticalScale(10)}px;
`;

const MessageText = styled(Text)`
  color: ${({ theme }) => theme.colors.dark};
`;

const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(10)}px ${horizontalScale(10)}px;
`;

const SendButton = styled.TouchableOpacity`
  width: ${moderateScale(50)}px;
  height: ${moderateScale(50)}px;
  border-radius: ${moderateScale(50)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-left: ${horizontalScale(10)}px;
`;

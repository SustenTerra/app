import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';

import { BlackLine, OrderSummaryContainer } from './styles';
import Button from '../Button';
import { PostsSpacer } from '../pages/posts/styles';

import { OrderView, UserView } from '@/api';
import Text from '@/components/Text';
import { centsToCurrencyString } from '@/utils/strings';

interface OrderSummaryProps {
  order: OrderView;
  seller?: UserView | null;
}

export default function OrderSummary({ order, seller }: OrderSummaryProps) {
  const enterOnContact = () => {
    const cellphone = seller ? order.user.phone : order.post.user.phone;
    Linking.openURL(`https://wa.me/55${cellphone}`);
  };

  const userName = seller ? order.user.full_name : order.post.user.full_name;

  return (
    <OrderSummaryContainer>
      <Text size="h5" weight="bold">
        {centsToCurrencyString(order.post.price || 0)}
      </Text>

      <Text size="h6" weight="bold">
        {order.post.title}
      </Text>

      <Text size="p" weight="regular">
        {seller ? 'Vendido' : 'Comprado'} em{' '}
        {new Date(order.created_at).toLocaleDateString()}
      </Text>

      <BlackLine />

      <Text size="p" weight="regular">
        {seller ? 'Comprado' : 'Vendido'} por {userName}
      </Text>

      <PostsSpacer />

      <Button color="secondary" onPress={enterOnContact}>
        <Feather name="message-circle" size={20} color="white" />

        <Text weight="bold" size="h6" color="white">
          Entrar em contato
        </Text>
      </Button>
    </OrderSummaryContainer>
  );
}

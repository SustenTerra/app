import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

import { OrderView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import EmptyList from '@/components/EmptyList';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { PostsSpacer } from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { moderateScale, verticalScale } from '@/utils/scale';
import { centsToCurrencyString } from '@/utils/strings';

interface OrderSummaryProps {
  order: OrderView;
}

function OrderSummary({ order }: OrderSummaryProps) {
  const enterOnContact = () => {
    Linking.openURL(`https://wa.me/55${order.post.user.phone}`);
  };

  return (
    <OrderSummaryContainer>
      <Text size="h5" weight="bold">
        {centsToCurrencyString(order.post.price || 0)}
      </Text>

      <Text size="h6" weight="bold">
        {order.post.title}
      </Text>

      <Text size="p" weight="regular">
        Comprado em {new Date(order.post.created_at).toLocaleDateString()}
      </Text>

      <BlackLine />

      <Text size="p" weight="regular">
        Vendido por {order.post.user.full_name}
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

export default function MyOrders() {
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await client.oms.getOrdersFromUserOmsUsersMeOrdersGet();
      setOrders(response);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollablePage>
      <PostsSpacer />

      <HeaderWrapper>
        <BackButton href="/profile" />

        <Text weight="bold" size="h5">
          Meus Pedidos
        </Text>
      </HeaderWrapper>

      {loading && <Loading />}

      {orders.length === 0 && !loading && <EmptyList />}

      <OrdersContainer>
        {orders.map((order) => (
          <OrderSummary key={order.id} order={order} />
        ))}
      </OrdersContainer>
    </ScrollablePage>
  );
}

const HeaderWrapper = styled.View`
  width: 100%;
  padding: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const OrdersContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const OrderSummaryContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

const BlackLine = styled.View`
  width: 100%;
  height: ${moderateScale(1)}px;
  background-color: ${({ theme }) => theme.colors.dark};
  margin: ${moderateScale(10)}px 0;
`;

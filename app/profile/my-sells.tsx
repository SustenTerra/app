import styled from 'styled-components/native';

import { OrderView } from '@/api';
import BackButton from '@/components/BackButton';
import EmptyList from '@/components/EmptyList';
import Loading from '@/components/Loading';
import OrderSummary from '@/components/OrderSummary';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { PostsSpacer } from '@/components/pages/posts/styles';
import { useAuth } from '@/hooks/auth';
import { usePolling } from '@/hooks/polling';
import { client } from '@/services/client';
import { moderateScale } from '@/utils/scale';

export default function MyOrders() {
  const auth = useAuth();

  const { data, loading } = usePolling<OrderView[]>(
    () => client.oms.getOrdersForSellerOmsSellersMeOrdersGet(),
    2000,
    [],
  );

  return (
    <ScrollablePage>
      <PostsSpacer />

      <HeaderWrapper>
        <BackButton href="/profile" />

        <Text weight="bold" size="h5">
          Minhas Vendas
        </Text>
      </HeaderWrapper>

      {loading && <Loading />}

      {data?.length === 0 && !loading && <EmptyList />}

      <OrdersContainer>
        {data?.map((order) => (
          <OrderSummary key={order.id} order={order} seller={auth.user} />
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

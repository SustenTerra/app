import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

import {
  DataWrapper,
  ProfileInfoContainer,
  ProfileButtonContainer,
} from './styles';

import { HorizontalLoading } from '@/components/Loading';
import Text from '@/components/Text';
import { useAuth } from '@/hooks/auth';
import { moderateScale } from '@/utils/scale';
import { getFirstAndLastName } from '@/utils/strings';

interface ProfileInfoProps {
  useLoggedUser?: boolean;
  name?: string;
  email?: string;
  verticalMargin?: number;
}

export function ProfileInfo({
  name,
  email,
  verticalMargin,
  useLoggedUser,
}: ProfileInfoProps) {
  const { user } = useAuth();

  const nameString = useLoggedUser ? user?.full_name : name;
  const emailString = useLoggedUser ? user?.email : email;

  if (!user && !name && !email) {
    return (
      <ProfileInfoContainer margin={verticalMargin}>
        <HorizontalLoading />
      </ProfileInfoContainer>
    );
  }
  const userNames = getFirstAndLastName(nameString || '');

  return (
    <ProfileInfoContainer margin={verticalMargin}>
      <Feather name="user" size={moderateScale(50)} />

      <DataWrapper>
        <Text size="h5" weight="bold">
          {userNames.firstName} {userNames.lastName}
        </Text>
        <Text size="h6" weight="regular" color="textBody">
          {emailString || 'Email não informado'}
        </Text>
      </DataWrapper>
    </ProfileInfoContainer>
  );
}

export interface ProfileButtonProps {
  icon:
    | 'grid'
    | 'book'
    | 'edit'
    | 'lock'
    | 'log-out'
    | 'help-circle'
    | 'video'
    | 'map-pin'
    | 'shopping-cart'
    | 'x-circle'
    | 'credit-card';

  title: string;
  description: string;
  shouldHide?: boolean;
  href?: string;
  onPress?: () => void;
}

export function ProfileButton({
  title,
  description,
  href,
  onPress,
  icon,
  shouldHide = false,
}: ProfileButtonProps) {
  if (shouldHide) {
    return <></>;
  }

  const content = (
    <ProfileButtonContainer onPress={onPress}>
      <Feather name={icon} size={moderateScale(24)} />

      <DataWrapper>
        <Text size="h6" weight="bold">
          {title}
        </Text>
        <Text size="h6" weight="regular" color="textBody">
          {description}
        </Text>
      </DataWrapper>
    </ProfileButtonContainer>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }

  return content;
}

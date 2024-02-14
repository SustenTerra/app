import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

import {
  DataWrapper,
  ProfileInfoContainer,
  ProfileButtonContainer,
} from './styles';

import Text from '@/components/Text';
import { useAuth } from '@/hooks/auth';
import { moderateScale } from '@/utils/scale';
import { getFirstAndLastName } from '@/utils/strings';

export function ProfileInfo() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const { firstName, lastName } = getFirstAndLastName(user.full_name);

  return (
    <ProfileInfoContainer>
      <Feather name="user" size={moderateScale(50)} />

      <DataWrapper>
        <Text size="h5" weight="bold">
          {firstName} {lastName}
        </Text>
        <Text size="h6" weight="regular" color="textBody">
          {user.email}
        </Text>
      </DataWrapper>
    </ProfileInfoContainer>
  );
}

export interface ProfileButtonProps {
  icon: 'grid' | 'book' | 'edit' | 'lock' | 'log-out';
  title: string;
  description: string;
  href?: string;
  onPress?: () => void;
}

export function ProfileButton({
  title,
  description,
  href,
  onPress,
  icon,
}: ProfileButtonProps) {
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

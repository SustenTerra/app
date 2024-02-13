import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

import { Background, Content, ContentRow, Wrapper } from './styles';

import Text from '@/components/Text';
import { moderateScale } from '@/utils/scale';

interface BannerProps {
  title: string;
  description: string;
  href: string;
}

function Banner({ title, description, href }: BannerProps) {
  return (
    <Link href={href} asChild>
      <Wrapper>
        <Background
          source={require('assets/terra.png')}
          resizeMode="cover"
          imageStyle={{ borderRadius: moderateScale(25), width: '100%' }}
        >
          <Content>
            <Text size="h6" weight="bold" color="light">
              {title}
            </Text>

            <ContentRow>
              <Text color="light" style={{ marginTop: moderateScale(15) }}>
                {description}
              </Text>

              <Feather name="sun" size={moderateScale(25)} color="#fff" />
            </ContentRow>
          </Content>
        </Background>
      </Wrapper>
    </Link>
  );
}

export default Banner;

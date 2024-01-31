import styled from 'styled-components/native';

import Text from '@/components/Text';
import { Image, ImageBackground } from 'react-native';
import { verticalScale, moderateScale } from '@/utils/scale';

export default function Home() {
  return (
    <Container>
      <Background source={require('assets/terra.png')}>
        {/* <InnerContainer> */}
          <LogoContainer>
            <Image source={require('assets/white_logo.png')} />
          </LogoContainer>
          <TextContainer>
            <Text weight="regular" size="h1" color="primary">
              Explore as possibilidades que a
              <Text weight="bold" size="h1" color="primary">
                {' '}
                Geotinta{' '}
              </Text>
              pode te oferecer
            </Text>
          </TextContainer>
        {/* </InnerContainer> */}
      </Background>
    </Container>
  );
}

const LogoContainer = styled.View`
  height: 60%;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: white;
  flex: 40%;
  padding: ${moderateScale(20)}px;
`;

const Background = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

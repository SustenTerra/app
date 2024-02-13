import Feather from '@expo/vector-icons/Feather';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { ChapterContentView } from '@/api';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  ContentBackground,
  DescriptionWrapper,
  HeaderBackground,
  HeaderWrapper,
  TopWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { horizontalScale, verticalScale } from '@/utils/scale';

export default function ShowContent() {
  const theme = useTheme();
  const auth = useAuth();
  const { contentId } = useLocalSearchParams();

  const [content, setContent] = useState<ChapterContentView | null>(null);
  const [loading, setLoading] = useState(true);

  const getContent = async () => {
    setLoading(true);
    try {
      const contentResponse =
        await client.chapterContents.getContentByIdChapterContentsChapterContentIdGet(
          Number(contentId),
        );
      setContent(contentResponse);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, [contentId]);

  const shouldShowContent = !loading && !!content;

  if (!loading && !auth.user) {
    return <Redirect href="/login" />;
  }

  return (
    <ScrollablePage>
      <StatusBar style="light" />

      <TopWrapper>
        <HeaderBackground
          defaultSource={require('assets/gray.png')}
          source={require('assets/terra.png')}
          resizeMode="cover"
        >
          <TransparentBackground darker>
            <ContentBackground>
              <HeaderWrapper>
                <BackButton />
                <Text weight="regular" size="h6" color="light">
                  Voltar
                </Text>
              </HeaderWrapper>

              {shouldShowContent && (
                <>
                  <Text
                    weight="regular"
                    size="h3"
                    color="light"
                    style={{
                      marginTop: verticalScale(10),
                    }}
                  >
                    {content.name}
                  </Text>

                  <DescriptionWrapper>
                    <Feather name="user" size={20} color={theme.colors.light} />

                    <Text
                      color="light"
                      style={{ marginLeft: horizontalScale(5) }}
                    >
                      Capítulo {content.chapter_index + 1}:{' '}
                      {content.chapter_name}
                    </Text>
                  </DescriptionWrapper>
                </>
              )}
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      {loading && <Loading />}

      {shouldShowContent && (
        <ContentContainer>
          <Text weight="regular" size="h6" color="dark">
            {content.description}
          </Text>
        </ContentContainer>
      )}
    </ScrollablePage>
  );
}

const ContentContainer = styled.View`
  width: 100%;
  padding: 0 ${verticalScale(20)}px ${verticalScale(30)}px
    ${horizontalScale(20)}px;
`;

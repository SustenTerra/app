import Feather from '@expo/vector-icons/Feather';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { ChapterContentView } from '@/api';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import MDViewer from '@/components/MDViewer';
import ScrollablePage from '@/components/ScrollablePage';
import SpeakButton from '@/components/SpeakButton';
import Text from '@/components/Text';
import YTVideo from '@/components/YTVideo';
import {
  ChapterLabel,
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
import { showMessage } from '@/services/messages';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export default function ShowContent() {
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();
  const { courseId, contentId } = useLocalSearchParams();

  const [content, setContent] = useState<ChapterContentView | null>(null);
  const [loading, setLoading] = useState(true);

  const getContent = async () => {
    setLoading(true);
    try {
      if (typeof contentId !== 'string') {
        showMessage({
          type: 'danger',
          title: 'Erro',
          message: 'Conteúdo não encontrado!',
        });
        router.replace('/courses');
        return;
      }

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
  const previousContentHref = `/courses/${courseId}/contents/${content?.previous_chapter_content_id}`;

  const nextContentHref = content?.next_chapter_content_id
    ? `/courses/${courseId}/contents/${content?.next_chapter_content_id}`
    : `/courses/${courseId}/show`;
  const nextContentLabel = content?.next_chapter_content_id
    ? 'Próximo conteúdo'
    : 'Finalizar capítulo';

  const backHref =
    !auth.loading && auth.user?.teacher_at
      ? `/courses/${courseId}/details`
      : `/courses/${courseId}/show`;

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
                <BackButton href={backHref} />
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

                  <ChapterLabel>
                    <DescriptionWrapper>
                      <Feather
                        name="user"
                        size={20}
                        color={theme.colors.light}
                      />

                      <Text
                        color="light"
                        style={{ marginLeft: horizontalScale(5) }}
                      >
                        Capítulo {content.chapter_index + 1}:{' '}
                        {content.chapter_name}
                      </Text>
                    </DescriptionWrapper>

                    {content.description && (
                      <SpeakButton textToSpeak={content.description} />
                    )}
                  </ChapterLabel>
                </>
              )}
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      {loading && <Loading />}

      {shouldShowContent && (
        <ContentContainer>
          {content.video_url && <YTVideo url={content.video_url} />}

          {content.description && <MDViewer content={content.description} />}

          <NavigationWrapper>
            {content.previous_chapter_content_id && (
              <Link asChild href={previousContentHref}>
                <PreviousButton>
                  <Feather
                    name="chevrons-left"
                    size={30}
                    color={theme.colors.dark}
                  />
                </PreviousButton>
              </Link>
            )}

            <Link asChild href={nextContentHref}>
              <NextButton>
                <Text weight="bold" size="h6" color="light">
                  {nextContentLabel}
                </Text>

                <Feather
                  name="chevrons-right"
                  size={30}
                  color={theme.colors.light}
                />
              </NextButton>
            </Link>
          </NavigationWrapper>
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

const NavigationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${verticalScale(20)}px;
`;

const PreviousButton = styled.TouchableOpacity`
  width: ${horizontalScale(55)}px;
  height: ${verticalScale(55)}px;
  border-radius: ${moderateScale(55)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.light};
  margin-right: ${horizontalScale(10)}px;
`;

const NextButton = styled.TouchableOpacity`
  flex: 1;
  border-radius: ${moderateScale(70)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${moderateScale(10)}px ${moderateScale(16)}px;
`;

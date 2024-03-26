import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { CourseCategoryView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ItemsPicker from '@/components/ItemsPicker';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import UploadImage, { ImageAsset } from '@/components/UploadImage';
import {
  ContentBackground,
  HeaderBackground,
  HeaderBackgroundNewCourse,
  HeaderWrapper,
  NewCourseContainer,
  TopWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { NewPostContainer } from '@/components/pages/posts/styles';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';

const headerInfo = {
  new: {
    title: 'Criar curso',
    submit: 'Salvar informações',
  },
};

export default function NewCourse() {
  const auth = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState<ImageAsset | File>(null);
  const [categories, setCategories] = useState<CourseCategoryView[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const categoriesResponse =
        await client.courseCategories.listAllCourseCategoriesCourseCategoriesGet();
      setCategories(categoriesResponse);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCreation = async () => {
    if (!title || !description || !selectedCategory) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    setLoading(true);
    try {
      // let fileToUpload;
      // if (image instanceof File) {
      //   fileToUpload = image;
      // } else {
      //   fileToUpload = {
      //     uri: image.uri,
      //     type: image.mimeType || 'image/jpeg',
      //     name: image.fileName || 'image.jpg',
      //   };
      // }

      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('description', description);
      // formData.append('image', fileToUpload);
      // formData.append('category_id', selectedCategory);

      await client.courses.createCourseCoursesPost({
        author_name: auth.user?.full_name || 'Anônimo',
        course_category_id: selectedCategory,
        description,
        image_url: 'https://owcdn.net/img/62bbec8dc1b9f.png',
        name: title,
      });

      // await client.request.request({
      //   url: '/courses',
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Curso cadastrado com sucesso!',
      });
      router.replace('/courses');
    } catch (err) {
      showErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollablePage>
      <HeaderBackgroundNewCourse
        defaultSource={require('assets/gray.png')}
        source={require('assets/courses.png')}
        resizeMode="cover"
      >
        <TransparentBackground>
          <ContentBackground>
            <HeaderWrapper>
              <BackButton href="/" />
              <Text weight="regular" size="h1" color="light">
                {headerInfo.new.title}
              </Text>
            </HeaderWrapper>
          </ContentBackground>
        </TransparentBackground>
      </HeaderBackgroundNewCourse>

      <NewCourseContainer>
        <Input
          iconName="book"
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          iconName="alert-circle"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        {/* <UploadImage
          label="Imagem do Banner"
          image={image}
          setImage={setImage}
        /> */}

        <ItemsPicker
          icon="list"
          label="Categoria"
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          selectedOptionValue={selectedCategory}
          setSelectedOptionValue={(value) =>
            setSelectedCategory(value as number)
          }
        />

        <Button onPress={handleCreation} color="primary">
          {!loading && (
            <>
              <Feather name="plus-circle" size={20} color="white" />

              <Text color="light" weight="bold">
                {headerInfo.new.submit}
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
      </NewCourseContainer>
    </ScrollablePage>
  );
}

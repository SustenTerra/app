import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import FormData from 'form-data';
import { useEffect, useState } from 'react';

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
  HeaderBackgroundNewCourse,
  HeaderWrapper,
  NewCourseContainer,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';

export default function NewCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImageAsset | File>(null);
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
    if (!title || !description || !selectedCategory || !image) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    setLoading(true);
    try {
      let fileToUpload;
      if (image instanceof File) {
        fileToUpload = image;
      } else {
        fileToUpload = {
          uri: image.uri,
          type: image.mimeType || 'image/jpeg',
          name: image.fileName || 'image.jpg',
        };
      }

      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('image', fileToUpload);
      formData.append('course_category_id', selectedCategory);

      await client.request.request({
        url: '/courses',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
              <BackButton />
              <Text weight="regular" size="h1" color="light">
                Criar curso
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

        <ItemsPicker
          icon="list"
          placeholder="Selecione uma categoria..."
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          selectedOptionValue={selectedCategory}
          setSelectedOptionValue={(value) =>
            setSelectedCategory(value as number)
          }
        />

        <UploadImage
          label="Imagem do Banner"
          image={image}
          setImage={setImage}
        />

        <Button onPress={handleCreation} color="primary">
          {!loading && (
            <>
              <Feather name="plus-circle" size={20} color="white" />

              <Text color="light" weight="bold">
                Salvar informações
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
      </NewCourseContainer>
    </ScrollablePage>
  );
}
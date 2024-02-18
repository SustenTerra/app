import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import FormData from 'form-data';
import { useEffect, useState } from 'react';

import { PostCategoryView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ItemsPicker from '@/components/ItemsPicker';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import UploadImage, { ImageAsset } from '@/components/UploadImage';
import {
  BackButtonWrapper,
  NewPostContainer,
  NewPostTitleWrapper,
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { postTypes } from '@/utils/constants';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<ImageAsset>(null);
  const [categories, setCategories] = useState<PostCategoryView[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const [selectedPostType, setSelectedPostType] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: string) => {
    if (price.trim() === 'R$ 0,0') {
      setPrice('');
      return;
    }

    const val = parseInt(price.replace(/\D/g, ''), 10) / 100;
    setPrice('R$ ' + val.toFixed(2).toString().replace('.', ','));
  };

  const getCategories = async () => {
    try {
      const categoriesResponse =
        await client.postCategories.listAllPostCategoriesPostCategoriesGet();
      setCategories(categoriesResponse);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !selectedCategory ||
      !selectedPostType ||
      !image
    ) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    setLoading(true);
    try {
      const fileToUpload = {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: image.fileName || 'image.jpg',
      };

      const formattedPrice = parseFloat(price.replace('R$ ', '')) * 100;

      const formData = new FormData();
      formData.append('image', fileToUpload);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('price', formattedPrice);
      formData.append('post_type', selectedPostType);
      formData.append('category_id', selectedCategory);

      await client.request.request({
        url: '/posts',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Anúncio cadastrado com sucesso!',
      });
      router.replace('/posts');
    } catch (err) {
      showErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollablePage>
      <NewPostContainer>
        <BackButtonWrapper>
          <BackButton />
          <Text weight="bold">Voltar</Text>
        </BackButtonWrapper>

        <NewPostTitleWrapper>
          <Text size="h1" color="primary" weight="bold">
            Criar anúncio
          </Text>
          <Text color="textBody">
            Preencha todos os dados para anunciar o seu produto ou serviço
            gratuitamente na plataforma.
          </Text>
        </NewPostTitleWrapper>

        <Input
          iconName="edit"
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          iconName="tag"
          placeholder="Preço"
          keyboardType="numeric"
          value={price}
          onChangeText={formatPrice}
        />

        <Input
          iconName="map-pin"
          placeholder="Localização"
          value={location}
          onChangeText={setLocation}
        />
        <Input
          iconName="info"
          placeholder="Preencha a descrição, detalhes e informações sobre o anúncio"
          multiline
          value={description}
          onChangeText={setDescription}
        />

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

        <ItemsPicker
          icon="layers"
          label="Tipo de anúncio"
          options={postTypes.map((postType) => ({
            label: postType.name,
            value: postType.id,
          }))}
          selectedOptionValue={selectedPostType}
          setSelectedOptionValue={(value) =>
            setSelectedPostType(value as string)
          }
        />

        <UploadImage
          label="Imagem do anúncio"
          image={image}
          setImage={setImage}
        />

        <Button onPress={handleSubmit} color="secondary">
          {!loading && (
            <>
              <Feather name="plus-circle" size={24} color="white" />

              <Text color="light" weight="bold">
                Cadastrar anúncio
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
      </NewPostContainer>
    </ScrollablePage>
  );
}

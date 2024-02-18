import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
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
  const [price, setPrice] = useState('R$ 0.00');
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
    const val = parseInt(price.replace(/\D/g, ''), 10) / 100;
    setPrice('R$ ' + val.toFixed(2).toString());
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
      const fileToUpload = await (await fetch(image.uri)).blob();

      const formattedPrice = parseFloat(price.replace('R$ ', '')) * 100;

      await client.posts.createPostPostsPost({
        image: fileToUpload,
        title,
        description,
        location,
        price: formattedPrice,
        post_type: selectedPostType,
        category_id: selectedCategory,
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

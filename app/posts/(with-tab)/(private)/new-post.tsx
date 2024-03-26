import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from 'expo-router';
import FormData from 'form-data';
import { useEffect, useState } from 'react';
import { FlatList, Platform, ScrollView } from 'react-native';

import { PostCategoryView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ItemsPicker from '@/components/ItemsPicker';
import Loading, { HorizontalLoading } from '@/components/Loading';
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
import { brazilianStatesList } from '@/utils/brazilianStatesList';
import { postTypes } from '@/utils/constants';
import { formatCurrencyString } from '@/utils/strings';

const headerInfo = {
  new: {
    title: 'Criar anúncio',
    description:
      'Preencha todos os dados para anunciar o seu produto ou serviço gratuitamente na plataforma.',
    submit: 'Cadastrar anúncio',
  },
  edit: {
    title: 'Editar anúncio',
    description: 'Preencha os dados que você deseja editar no seu anúncio.',
    submit: 'Salvar alterações',
  },
};

export default function NewPost() {
  const params = useLocalSearchParams<{ postId: string }>();

  const [loadingPost, setLoadingPost] = useState(!!params.postId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<ImageAsset | File>(null);
  const [categories, setCategories] = useState<PostCategoryView[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const [selectedPostType, setSelectedPostType] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    setLoadingPost(true);
    try {
      const postResponse = await client.posts.getPostByIdPostsPostIdGet(
        Number(params.postId),
      );

      setTitle(postResponse.title);
      setDescription(postResponse.description);
      setLocation(postResponse.location);
      setPrice(formatCurrencyString(String(postResponse.price)));
      setSelectedCategory(postResponse.category.id);
      setSelectedPostType(postResponse.post_type);
    } catch (error) {
      showErrors(error);
      router.replace('/posts');
    } finally {
      setLoadingPost(false);
    }
  };

  useEffect(() => {
    if (params.postId) {
      getPost();
    }
  }, [params.postId]);

  const updatePrice = (price: string) => {
    setPrice(formatCurrencyString(price));
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

  const handleCreation = async () => {
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

  const handleUpdate = async () => {
    const fields = [
      title,
      description,
      location,
      price,
      selectedCategory,
      selectedPostType,
      image,
    ];
    if (fields.every((field) => !field)) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha pelo menos um campo para atualizar o anúncio.',
      });

      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      if (image) {
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
        formData.append('image', fileToUpload);
      }

      if (price) {
        const formattedPrice = parseFloat(price.replace('R$ ', '')) * 100;
        formData.append('price', formattedPrice);
      }

      if (title) {
        formData.append('title', title);
      }

      if (description) {
        formData.append('description', description);
      }

      if (location) {
        formData.append('location', location);
      }

      if (selectedPostType) {
        formData.append('post_type', selectedPostType);
      }

      if (selectedCategory) {
        formData.append('category_id', selectedCategory);
      }

      await client.request.request({
        url: `/posts/${params.postId}`,
        method: 'PATCH',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Anúncio atualizado com sucesso!',
      });
      router.replace('/profile/my-posts');
    } catch (err) {
      showErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = params.postId ? handleUpdate : handleCreation;

  const headerInfos = headerInfo[params.postId ? 'edit' : 'new'];

  if (loadingPost) {
    return (
      <ScrollablePage>
        <Loading />
      </ScrollablePage>
    );
  }

  return (
    <ScrollablePage>
      <NewPostContainer>
        <BackButtonWrapper>
          <BackButton />
          <Text weight="bold">Voltar</Text>
        </BackButtonWrapper>

        <NewPostTitleWrapper>
          <Text size="h1" color="primary" weight="bold">
            {headerInfos.title}
          </Text>
          <Text color="textBody">{headerInfos.description}</Text>
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
          onChangeText={updatePrice}
        />
        <ItemsPicker
          icon="list"
          label="Localização"
          options={[
            { label: 'Selecione um estado', value: '' },
            ...brazilianStatesList.map((state) => ({
              label: state.name,
              value: state.acronym,
            })),
          ]}
          selectedOptionValue={location || ''}
          setSelectedOptionValue={(value) => setLocation(value as string)}
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
              <Feather
                name={params.postId ? 'save' : 'plus-circle'}
                size={20}
                color="white"
              />

              <Text color="light" weight="bold">
                {headerInfos.submit}
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
      </NewPostContainer>
    </ScrollablePage>
  );
}

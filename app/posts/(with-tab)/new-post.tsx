import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';

import { PostCategoryView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ItemsPicker from '@/components/ItemsPicker';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  BackButtonWrapper,
  ImageForeGround,
  NewPostContainer,
  NewPostTitleWrapper,
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { postTypes } from '@/utils/constants';
import { horizontalScale, verticalScale } from '@/utils/scale';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('R$ 0.00');
  const [image, setImage] = useState<string | null>(null);
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
      !selectedPostType
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
      if (image) {
        // const result = await fetch(image);
        // const blob = await result.blob();

        const formattedPrice = parseFloat(price.replace('R$ ', '')) * 100;
        const stringPrice = formattedPrice.toFixed(2).toString();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('price', stringPrice);
        formData.append('post_type', selectedPostType);
        formData.append('category', selectedCategory.toString());
        // const formData = {
        //   image: blob,
        //   title,
        //   description,
        //   post_type: selectedPostType,
        //   category_id: selectedCategory,
        //   price: parseFloat(price.replace('R$ ', '')) * 100,
        //   location,
        // };
        await client.posts.createPostPostsPost(formData);
        router.replace('/posts');
      }
    } catch (err) {
      console.log(err);
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

        <Text>Imagem do Anúncio</Text>
        <Pressable onPress={pickImage} style={{ alignSelf: 'center' }}>
          <Image
            style={{
              width: horizontalScale(300),
              height: verticalScale(250),
            }}
            source={image ? { uri: image } : require('assets/gray_logo.png')}
          />
          <ImageForeGround style={{ width: horizontalScale(300) }}>
            <Text color="light">Clique para selecionar uma imagem</Text>
          </ImageForeGround>
        </Pressable>

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

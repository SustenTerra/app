import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  ImageForeGround,
  NewPostContainer,
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { postTypes } from '@/utils/constants';
import { horizontalScale, verticalScale } from '@/utils/scale';

interface CategoryOption {
  id: number;
  name: string;
}

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('R$ 0.00');
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedPostType, setSelectedPostType] = useState('');

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
      const categories = categoriesResponse.map(({ name, id }) => ({
        name,
        id,
      }));
      setCategories(categories);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async () => {
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
    }
  };

  return (
    <ScrollablePage>
      <NewPostContainer>
        <BackButton />
        <Text size="h1" color="primary">
          Criar anúncio
        </Text>
        <Text color="primary">Anuncie seu produto ou serviço</Text>
        <Text>Título</Text>
        <Input placeholder="Título" value={title} onChangeText={setTitle} />
        <Text>Preço</Text>
        <Input
          placeholder="Preço"
          keyboardType="numeric"
          value={price}
          onChangeText={formatPrice}
        />
        <Text>Localização</Text>
        <Input
          placeholder="Localização"
          value={location}
          onChangeText={setLocation}
        />
        <Text>Descrição</Text>
        <Input
          placeholder="Descrição"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <Text>Categoria</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          {categories.map(({ name, id }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>
        <Text>Tipo</Text>
        <Picker
          selectedValue={selectedPostType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedPostType(itemValue)
          }
        >
          {postTypes.map(({ name, id }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>
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
          <Text color="light">Cadastrar anúncio</Text>
        </Button>
      </NewPostContainer>
    </ScrollablePage>
  );
}

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Image, Pressable } from 'react-native';

import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { NewPostContainer } from '@/components/pages/posts/styles';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('R$ 0.00');

  const formatPrice = (price: string) => {
    const val = parseInt(price.replace(/\D/g, '')) / 100;
    setPrice('R$ ' + val.toFixed(2).toString());
  };

  const _pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
  };

  return (
    <ScrollablePage>
      <NewPostContainer>
        <BackButton />
        <Text size="h1" color="primary">
          Criar anúncio
        </Text>
        <Text color="primary">Anuncie seu produto ou serviço</Text>
        <Text>Imagem do Anúncio</Text>
        <Pressable onPress={_pickDocument}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require('assets/icon.png')}
          />
        </Pressable>
        <Text>Título</Text>
        <Input placeholder="Título" value={title} onChangeText={setTitle} />
        <Text>Descrição</Text>
        <Input
          placeholder="Descrição"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <Text>Preço</Text>
        <Input
          placeholder="Preço"
          keyboardType="numeric"
          value={price}
          onChangeText={formatPrice}
        />
      </NewPostContainer>
    </ScrollablePage>
  );
}

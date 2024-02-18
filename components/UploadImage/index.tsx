import * as ImagePicker from 'expo-image-picker';

import {
  Container,
  ImageButton,
  ImageForeGround,
  SelectedImage,
} from './styles';

import Text from '@/components/Text';
import { showMessage } from '@/services/messages';
import { verticalScale } from '@/utils/scale';

export type ImageAsset = ImagePicker.ImagePickerAsset | null;

interface Props {
  label: string;
  image: ImageAsset;
  setImage: (image: ImageAsset) => void;
}

function UploadImage({ label, image, setImage }: Props) {
  const pickImage = async () => {
    const cameraResponse = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraResponse.status !== 'granted') {
      showMessage({
        message: 'Permissão de câmera necessária',
        type: 'warning',
        title: 'Atenção!',
      });
      return;
    }

    const libraryResponse = await ImagePicker.requestCameraPermissionsAsync();
    if (libraryResponse.status !== 'granted') {
      showMessage({
        message: 'Permissão de galeria necessária',
        type: 'warning',
        title: 'Atenção!',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  return (
    <Container>
      <Text weight="bold" style={{ marginBottom: verticalScale(10) }}>
        {label}
      </Text>
      <ImageButton onPress={pickImage}>
        <SelectedImage
          source={image ? { uri: image.uri } : require('assets/gray_logo.png')}
        />
        <ImageForeGround>
          <Text weight="bold" color="light">
            {image ? 'Alterar imagem' : 'Clique aqui para selecionar imagem'}
          </Text>
        </ImageForeGround>
      </ImageButton>
    </Container>
  );
}

export default UploadImage;

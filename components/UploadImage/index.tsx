import * as ImagePicker from 'expo-image-picker';

import {
  Container,
  ImageButton,
  ImageForeGround,
  SelectedImage,
} from './styles';

import Text from '@/components/Text';
import { showMessage } from '@/services/messages';
import { isWeb } from '@/utils/platform';
import { verticalScale } from '@/utils/scale';

export type ImageAsset = ImagePicker.ImagePickerAsset | null;

interface Props {
  label: string;
  image: ImageAsset | File;
  setImage: (image: ImageAsset | File) => void;
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

  if (isWeb) {
    return (
      <Container>
        <Text weight="bold" style={{ marginBottom: verticalScale(10) }}>
          {label}
        </Text>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (!event.target.files) return;

            const file = event.target.files[0];
            setImage(file);
          }}
        />
        {image && image instanceof File && (
          <img
            src={URL.createObjectURL(image)}
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        )}
      </Container>
    );
  }

  if (image instanceof File) {
    return null;
  }

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

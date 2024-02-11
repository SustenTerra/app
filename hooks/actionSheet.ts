import { useActionSheet as useNativeActionSheet } from '@expo/react-native-action-sheet';

interface ActionSheetOptions {
  title: string;
  message: string;
  actions: string[];
  actionsCallbacks: (() => void)[];
  onCancel?: () => void;
}

export function useActionSheet({
  actions,
  actionsCallbacks,
  title,
  message,
  onCancel,
}: ActionSheetOptions) {
  const { showActionSheetWithOptions } = useNativeActionSheet();

  const options = [...actions, 'Cancelar'];
  const cancelButtonIndex = actions.length - 1;

  const show = () => {
    showActionSheetWithOptions(
      { options, cancelButtonIndex, title, message },
      (selectedIndex: number | undefined) => {
        if (selectedIndex === cancelButtonIndex) {
          onCancel?.();
          return;
        }

        if (selectedIndex && actionsCallbacks[selectedIndex]) {
          actionsCallbacks[selectedIndex]();
        }
      },
    );
  };

  return { show };
}

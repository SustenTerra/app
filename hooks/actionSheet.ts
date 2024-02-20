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
  const cancelButtonIndex = options.length - 1;

  const show = () => {
    showActionSheetWithOptions(
      { options, cancelButtonIndex, title, message },
      (selectedIndex: number | undefined) => {
        if (selectedIndex === cancelButtonIndex) {
          onCancel?.();
          return;
        }

        if (selectedIndex !== undefined && actionsCallbacks[selectedIndex]) {
          actionsCallbacks[selectedIndex]();
        }
      },
    );
  };

  const hide = () => {
    onCancel?.();
  };

  return { show, hide };
}

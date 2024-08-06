import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { type } from "os";

type ToastType = "success" | "info" | "error" | "warning" | "attention";

const useShowToast = () => {
  const toast = useToast();

  const showToast = (type: ToastType, message: string, title?: string) => {
    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action={type} variant="accent">
            <VStack space="xs" flex={1}>
              {title && <ToastTitle>{title}</ToastTitle>}
              <ToastDescription>{message}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return showToast;
};

export default useShowToast;

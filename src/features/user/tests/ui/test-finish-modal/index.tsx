import { Button, Modal } from "@heroui/react";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const TestFinishModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
}: Props) => {
  const t = useTranslations();

  return (
    <Modal>
      <Modal.Backdrop
        variant="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <Modal.Container placement="center">
          <Modal.Dialog className="rounded-3xl">
            <Modal.CloseTrigger />

            <Modal.Body style={{ color: "black" }}>
              <h3 className="font-bold text-xl text-black! md:text-2xl">
                {t("tests.finishConfirmTitle")}
              </h3>

              <p className="mt-2 text-neutral-600 font-medium text-sm md:text-xl">
                {t("tests.finishConfirmDesc")}
              </p>

              <div className="mt-6 flex flex-col gap-2">
                <Button
                  onPress={onConfirm}
                  className="w-full rounded-xl bg-blue-700 text-white font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit"
                >
                  {t("tests.finishConfirmBtn")}
                </Button>

                <Button
                  onPress={onCancel}
                  variant="ghost"
                  className="w-full rounded-xl font-medium text-sm md:text-xl py-3.5 md:py-4.5 h-fit"
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

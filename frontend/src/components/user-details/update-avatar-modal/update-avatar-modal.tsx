import { FC, UserDetailsUpdateImageRequestDto } from 'common/types/types';
import { Button, Input, Modal } from 'components/common/common';
import { getNameOf, getValidClasses } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userDetailsUpdateAvatar as userDetailsUpdateAvatarValidationSchema } from 'validation-schemas/validation-schemas';

import styles from './styles.module.scss';

type Props = {
  avatarUrl: string | null;
  modalIsOpen: boolean;
  onHandleCloseModal: (val: boolean) => void;
  onHandleUpdateAvatar: (payload: UserDetailsUpdateImageRequestDto) => void;
};

const UpdateAvatarModal: FC<Props> = ({
  avatarUrl,
  modalIsOpen,
  onHandleCloseModal,
  onHandleUpdateAvatar,
}) => {
  const { control, errors, handleSubmit, getValues } =
    useAppForm<UserDetailsUpdateImageRequestDto>({
      defaultValues: {
        avatarUrl: avatarUrl ? avatarUrl : '',
      },
      validationSchema: userDetailsUpdateAvatarValidationSchema,
    });

  return (
    <div
      className={getValidClasses(
        styles.modalWrapper,
        !modalIsOpen && styles.displayNone,
      )}
    >
      <Modal
        onTop
        isOpen={modalIsOpen}
        onClose={(): void => onHandleCloseModal(false)}
        title={'Update your user-details image'}
      >
        <form
          className={styles.formWrapper}
          onSubmit={handleSubmit(onHandleUpdateAvatar)}
        >
          <div className={styles.modalInputWrapper}>
            <Input
              type="text"
              label="Avatar"
              control={control}
              errors={errors}
              name={getNameOf<UserDetailsUpdateImageRequestDto>('avatarUrl')}
              defaultValue={getValues(
                getNameOf<UserDetailsUpdateImageRequestDto>('avatarUrl'),
              )}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              label="Cancel"
              classes={styles.cancelBtn}
              onClick={(): void => onHandleCloseModal(false)}
            />
            <Button type="submit" label="Update" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export { UpdateAvatarModal };

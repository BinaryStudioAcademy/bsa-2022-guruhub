import { FC, UserDetailsUpdateImage } from 'common/types/types';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userDetailsAvatarUpdate as userDetailsAvatarUpdateValidationSchema } from 'validation-schemas/validation-schemas';

import { getValidClasses } from '../../../helpers/dom/get-valid-classes/get-valid-classes.helper';
import { Button } from '../../common/button/button';
import { Input } from '../../common/input/input';
import { Modal } from '../../common/modal/modal';
import styles from './styles.module.scss';

type Props = {
  avatarUrl: string | null;
  modalIsOpen: boolean;
  onHandleCloseModal: (val: boolean) => void;
  onHandleUpdateAvatar: (payload: UserDetailsUpdateImage) => void;
};

const UpdateAvatarModal: FC<Props> = ({
  avatarUrl,
  modalIsOpen,
  onHandleCloseModal,
  onHandleUpdateAvatar,
}) => {
  const { control, errors, handleSubmit, getValues } =
    useAppForm<UserDetailsUpdateImage>({
      defaultValues: {
        avatarUrl: avatarUrl ? avatarUrl : '',
      },
      validationSchema: userDetailsAvatarUpdateValidationSchema,
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
        title={'Update your profile image'}
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
              name={getNameOf<UserDetailsUpdateImage>('avatarUrl')}
              defaultValue={getValues(
                getNameOf<UserDetailsUpdateImage>('avatarUrl'),
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

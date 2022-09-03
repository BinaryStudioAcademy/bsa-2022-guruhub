import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UserWithPermissions } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useRef,
  useState,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';

import styles from './styles.module.scss';

const AvatarWrapper: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenFileBrowser = (): void => {
    inputRef.current?.click();
  };

  const handleFileSelect = (): void => {
    const file = inputRef.current?.files?.[0] ?? null;
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      dispatch(
        userDetailsActions.updateUserAvatar({
          file: formData,
          userId: (user as UserWithPermissions).id,
        }),
      );
    }
  }, [selectedFile]);

  return (
    <div className={styles.flex}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        className="visually-hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <div className={styles.imageWrapper}>
        <button onClick={handleOpenFileBrowser}>
          <Image
            width="136"
            height="136"
            src={defaultUserAvatar}
            alt="user avatar"
            isCircular
          />
        </button>
      </div>
      <div>
        <Button
          type="button"
          btnColor="blue"
          label="Update File"
          btnType="upload"
          className={styles.marginBottom}
          onClick={handleOpenFileBrowser}
        />
        <Button btnColor="blue" label="Save" className={styles.btn} />
      </div>
    </div>
  );
};

export { AvatarWrapper };

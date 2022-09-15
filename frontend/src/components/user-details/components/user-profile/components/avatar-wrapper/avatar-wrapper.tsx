import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UserWithPermissions } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import React from 'react';
import { userDetailsActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  user: UserWithPermissions | null;
  avatarUrl: string | null;
};

const AvatarWrapper: FC<Props> = ({ user, avatarUrl }) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const defaultAvatar = avatarUrl ?? defaultUserAvatar;
  const newAvatar = selectedFile ? URL.createObjectURL(selectedFile) : null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const [file = null] = e.target.files ?? [];
    setSelectedFile(file);
  };

  const handleAvatarUpdate = (): void => {
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
  };

  useEffect(() => {
    return () => {
      if (newAvatar) {
        URL.revokeObjectURL(newAvatar);
      }
    };
  }, [newAvatar]);

  return (
    <div className={styles.flex}>
      <div className={styles.imageWrapper}>
        <Image
          width="136"
          height="136"
          src={selectedFile ? (newAvatar as string) : defaultAvatar}
          alt="user avatar"
          classes={styles.profileImage}
          isCircular
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          btnColor="blue"
          label="Choose File"
          btnType="upload"
          onFileSelect={handleFileSelect}
        />
        <Button
          btnColor="blue"
          label="Save changes"
          onClick={handleAvatarUpdate}
        />
      </div>
    </div>
  );
};

export { AvatarWrapper };

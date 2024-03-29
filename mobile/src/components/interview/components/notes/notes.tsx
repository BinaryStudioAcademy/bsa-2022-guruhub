import React, { FC } from 'react';

import { ButtonVariant, DataStatus, PermissionKey } from '~/common/enums/enums';
import { InterviewNoteCreateRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  ScrollView,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { checkHasPermission } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { interviewActions } from '~/store/actions';
import { interviewNotesCreateArguments } from '~/validation-schemas/validation-schemas';

import { DEFAULT_CREATE_NOTE_PAYLOAD } from './common';
import { NoteCardsList } from './components/components';
import { styles } from './styles';

const Notes: FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { user, interviewId, interviewDataStatus, notes, interviewerId } =
    useAppSelector(({ auth, interview }) => ({
      user: auth.user,
      notes: interview.notes,
      interviewId: interview.interview?.id,
      interviewerId: interview.interview?.interviewer?.id,
      interviewDataStatus: interview.interviewDataStatus,
    }));

  const { control, errors, handleSubmit, reset } =
    useAppForm<InterviewNoteCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_NOTE_PAYLOAD,
      validationSchema: interviewNotesCreateArguments,
    });

  const isLoading = interviewDataStatus === DataStatus.PENDING;

  const toggleInput = (): void => {
    setIsFormOpen((prev) => !prev);
    reset();
  };

  const hasManageInterwiewsPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
    userPermissions: user?.permissions ?? [],
  });

  const canUserAddNote =
    hasManageInterwiewsPermission || interviewerId === user?.id;
  const isAddButtonShown = !isFormOpen && canUserAddNote;

  const handleAdd = async (
    payload: InterviewNoteCreateRequestDto,
  ): Promise<void> => {
    if (interviewId) {
      const { note } = payload;
      await dispatch(
        interviewActions.createNote({ note, interviewId: interviewId }),
      );
      toggleInput();
    }
  };

  useEffect(() => {
    if (interviewId) {
      dispatch(interviewActions.getNotes({ interviewId: Number(interviewId) }));
    }
  }, [interviewId]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsFormOpen(false);
        reset();
      };
    }, []),
  );

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Notes</Text>
        {isAddButtonShown && (
          <Button
            label="Add"
            variant={ButtonVariant.PRIMARY}
            onPress={toggleInput}
            size="small"
            icon="plus"
          />
        )}
      </View>
      {isFormOpen && (
        <View style={styles.inputContainer}>
          <Input
            label="Write your note"
            placeholder="Your note here"
            errors={errors}
            control={control}
            name="note"
            rows={5}
          />
          <View style={styles.buttonContainer}>
            <Stack isHorizontal space={20}>
              <View>
                <Button
                  label="Cancel"
                  variant={ButtonVariant.SECONDARY}
                  size="small"
                  onPress={toggleInput}
                />
              </View>
              <View>
                <Button
                  label="Submit"
                  variant={ButtonVariant.PRIMARY}
                  onPress={handleSubmit(handleAdd)}
                  size="small"
                  isLoading={isLoading}
                />
              </View>
            </Stack>
          </View>
        </View>
      )}
      <NoteCardsList notes={notes} />
    </ScrollView>
  );
};

export { Notes };

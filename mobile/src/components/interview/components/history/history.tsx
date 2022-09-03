import React, { FC } from 'react';

import { ButtonVariant, DataStatus, PermissionKey } from '~/common/enums/enums';
import { InterviewNoteCreateRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  ScrollView,
  Spinner,
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

const History: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { user, interviewId, interviewDataStatus, notes } = useAppSelector(
    ({ auth, interview }) => ({
      user: auth.user,
      notes: interview.notes,
      interviewId: interview.interview?.id,
      interviewDataStatus: interview.interviewDataStatus,
    }),
  );

  const { control, errors, handleSubmit, reset } =
    useAppForm<InterviewNoteCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_NOTE_PAYLOAD,
      validationSchema: interviewNotesCreateArguments,
    });

  const isLoading = interviewDataStatus === DataStatus.PENDING;

  const toggleInput = (): void => {
    setIsOpen((prev) => !prev);
    reset();
  };

  const hasPermission = checkHasPermission({
    permissionKeys: [
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ],
    userPermissions: user?.permissions ?? [],
    checkMode: 'every',
  });

  const handleAdd = (payload: InterviewNoteCreateRequestDto): void => {
    if (interviewId) {
      const { note } = payload;
      dispatch(interviewActions.createNote({ note, interviewId: interviewId }));
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
        setIsOpen(false);
        reset();
      };
    }, []),
  );

  if (isLoading) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
        {!isOpen && hasPermission && (
          <Button
            label="Add"
            variant={ButtonVariant.SECONDARY}
            onPress={toggleInput}
            size="small"
            icon="plus"
          />
        )}
      </View>
      {isOpen && (
        <View style={styles.inputContainer}>
          <Input
            label="Write your note"
            placeholder="..."
            errors={errors}
            control={control}
            name="note"
            numberOfLines={3}
            multiline
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Stack isHorizontal space={40}>
              <View style={styles.button}>
                <Button
                  label="Cancel"
                  variant={ButtonVariant.SECONDARY}
                  size="small"
                  onPress={toggleInput}
                />
              </View>
              <View style={styles.button}>
                <Button
                  label="Save"
                  variant={ButtonVariant.PRIMARY}
                  onPress={handleSubmit(handleAdd)}
                  size="small"
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

export { History };

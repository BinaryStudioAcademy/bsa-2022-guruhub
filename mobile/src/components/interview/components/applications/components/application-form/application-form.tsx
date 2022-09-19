import React, { FC } from 'react';

import {
  ButtonVariant,
  InterviewStatus,
  PermissionKey,
} from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import {
  Button,
  Category,
  Chip,
  DatePicker,
  Dropdown,
  Text,
  View,
} from '~/components/common/common';
import { statusToColor } from '~/components/interviews/common/maps/maps';
import { checkHasPermission, getFormattedDate } from '~/helpers/helpers';
import { useAppForm, useEffect, useState } from '~/hooks/hooks';
import { interviewUpdate as interviewUpdateValidationSchema } from '~/validation-schemas/validation-schemas';

import { ButtonsSection } from './components/components';
import { styles } from './styles';

type Props = {
  interview: InterviewsGetAllItemResponseDto;
  interviewers: InterviewsGetInterviewerResponseDto[];
  user: UserWithPermissions | null;
  isInterviewLoading: boolean;
  handleUpdateInterview: (payload: InterviewsUpdateRequestDto) => void;
};

const ApplicationForm: FC<Props> = ({
  interview,
  interviewers,
  user,
  isInterviewLoading,
  handleUpdateInterview,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { control, handleSubmit, errors, reset } =
    useAppForm<InterviewsUpdateRequestDto>({
      defaultValues: {
        interviewerUserId: interview.interviewer?.id ?? null,
        status: interview.status,
        interviewDate: interview?.interviewDate ?? null,
      },
      validationSchema: interviewUpdateValidationSchema,
    });

  const interviewDate = interview.interviewDate
    ? getFormattedDate(interview.interviewDate, 'dd.MM.yyyy')
    : 'Not assigned yet';

  const interviewersData = interviewers.map((interviewer) => ({
    label: interviewer.interviewer.userDetails.fullName,
    value: interviewer.interviewer.id,
  }));

  const interviewStatus = Object.values(InterviewStatus).map((status) => ({
    label: status,
    value: status,
  }));

  const canEditInterviewPermission = checkHasPermission({
    permissionKeys: [
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ],
    userPermissions: user?.permissions ?? [],
  });

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
    reset();
  };

  useEffect(() => {
    if (interview) {
      reset({
        interviewerUserId: interview.interviewer?.id ?? null,
        status: interview.status,
        interviewDate: interview?.interviewDate ?? null,
      });
    }
  }, [interview]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Parameters</Text>
        {canEditInterviewPermission && (
          <View style={isEditMode && styles.buttonHide}>
            <Button
              label="Edit"
              variant={ButtonVariant.PRIMARY}
              onPress={toggleEditMode}
              size="small"
            />
          </View>
        )}
      </View>
      <View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Name</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.content}>
              {interview.interviewee.userDetails.fullName ?? ''}
            </Text>
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Email</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.content}>
              {interview.interviewee.email ?? ''}
            </Text>
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Category</Text>
          </View>
          <View style={styles.rowContent}>
            <Category
              keyName={interview.courseCategory.key ?? 'unknown'}
              name={interview.courseCategory.name ?? 'Unknown'}
            />
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Date of interview</Text>
          </View>
          <View style={styles.rowContent}>
            {!isEditMode ? (
              <Text style={styles.content}>{interviewDate}</Text>
            ) : (
              <View style={styles.fieldWrapper}>
                <DatePicker
                  name="interviewDate"
                  control={control}
                  errors={errors}
                  minimumDate={new Date()}
                  placeholder="Select date"
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Interviewer</Text>
          </View>
          <View style={styles.rowContent}>
            {!isEditMode ? (
              <Text style={styles.content}>
                {interview.interviewer?.userDetails.fullName ??
                  'Not assigned yet'}
              </Text>
            ) : (
              <View style={styles.fieldWrapper}>
                <Dropdown
                  items={interviewersData}
                  control={control}
                  errors={errors}
                  name="interviewerUserId"
                  placeholder="Select interviewer"
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rowData}>
        <View style={styles.rowTitle}>
          <Text style={styles.title}>Status</Text>
        </View>
        <View style={styles.rowContent}>
          {!isEditMode ? (
            <Chip
              text={interview.status}
              color={statusToColor[interview.status]}
            />
          ) : (
            <View style={styles.fieldWrapper}>
              <Dropdown
                items={interviewStatus}
                control={control}
                errors={errors}
                name="status"
                placeholder="Select status"
              />
            </View>
          )}
        </View>
      </View>
      {isEditMode && (
        <View style={styles.buttonsWrapper}>
          <ButtonsSection
            toggleEditMode={toggleEditMode}
            handleEditInterviewer={handleSubmit(handleUpdateInterview)}
            isLoading={isInterviewLoading}
          />
        </View>
      )}
    </View>
  );
};

export { ApplicationForm };

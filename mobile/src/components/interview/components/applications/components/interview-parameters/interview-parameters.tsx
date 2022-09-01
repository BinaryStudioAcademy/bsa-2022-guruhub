import React, { FC } from 'react';

import { PermissionKey } from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { Dropdown, Text, View } from '~/components/common/common';
import { Category } from '~/components/course/components/components';
import { checkHasPermission, getFormattedDate } from '~/helpers/helpers';
import { useAppForm, useState } from '~/hooks/hooks';
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

const InterviewParameters: FC<Props> = ({
  interview,
  interviewers,
  user,
  isInterviewLoading,
  handleUpdateInterview,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const interviewDate = interview.interviewDate
    ? getFormattedDate(interview.interviewDate, 'kk:mm, dd/MM/yyyy')
    : 'Not assigned yet';

  const interviewersData = interviewers.map((interviewer) => ({
    label: interviewer.interviewer.userDetails.fullName,
    value: interviewer.interviewer.id,
  }));

  const hasEditInterviewPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
  };

  const { control, handleSubmit, errors } =
    useAppForm<InterviewsUpdateRequestDto>({
      defaultValues: {
        interviewerUserId: interview?.interviewer?.id,
      },
      validationSchema: interviewUpdateValidationSchema,
    });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Parameters</Text>
        {hasEditInterviewPermission && (
          <ButtonsSection
            isEditMode={isEditMode}
            toggleEditMode={toggleEditMode}
            handleEditInterviewer={handleSubmit(handleUpdateInterview)}
            isLoading={isInterviewLoading}
          />
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
            <Text style={styles.title}>Type of course</Text>
          </View>
          <View style={styles.rowContent}>
            <Category
              keyName={interview.courseCategory.key ?? 'unknown'}
              name={interview.courseCategory.name ?? 'Unknown'}
              isActive={false}
            />
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Date of interview</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.content}>{interviewDate}</Text>
          </View>
        </View>
        <View style={styles.rowData}>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Interviewer</Text>
          </View>
          <View style={styles.rowContent}>
            {!isEditMode ? (
              <Text style={styles.content}>
                {interview.interviewer?.userDetails.fullName ||
                  'Not assigned yet'}
              </Text>
            ) : (
              <Dropdown
                items={interviewersData}
                control={control}
                errors={errors}
                name="interviewerUserId"
                selectingObjectName="interviewer"
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export { InterviewParameters };

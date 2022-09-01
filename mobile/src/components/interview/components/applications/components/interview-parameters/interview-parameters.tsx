import React, { FC } from 'react';

import { PermissionKey } from '~/common/enums/enums';
import {
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { Dropdown, ScrollView, Text, View } from '~/components/common/common';
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
    : '';

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
      <ScrollView horizontal>
        <View>
          <View style={styles.rowData}>
            <Text style={styles.rowTitle}>Name</Text>
            <Text style={styles.rowContent}>
              {interview.interviewee.userDetails.fullName ?? ''}
            </Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.rowTitle}>Email</Text>
            <Text style={styles.rowContent}>
              {interview.interviewee.email ?? ''}
            </Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.rowTitle}>Type of course</Text>
            <View style={styles.rowContent}>
              <Category
                keyName={interview.courseCategory.key ?? 'unknown'}
                name={interview.courseCategory.name ?? 'Unknown'}
                isActive={false}
              />
            </View>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.rowTitle}>Date of interview</Text>
            <Text style={styles.rowContent}>{interviewDate}</Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.rowTitle}>Interviewer</Text>
            {!isEditMode ? (
              <Text style={styles.rowContent}>
                {interview.interviewer?.userDetails.fullName ?? ''}
              </Text>
            ) : (
              <View style={styles.rowContent}>
                <Dropdown
                  items={interviewersData}
                  control={control}
                  errors={errors}
                  name="interviewerUserId"
                  selectingObjectName="interviewer"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { InterviewParameters };

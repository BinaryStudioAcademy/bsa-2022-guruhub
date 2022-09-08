import { StringCase } from 'common/enums/enums';
import {
  FC,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  SelectorOption,
} from 'common/types/types';
import { Button, Select } from 'components/common/common';
import {
  changeStringCase,
  getFormattedDate,
  getNameOf,
  getValidClasses,
} from 'helpers/helpers';
import { useAppForm, useMemo, useState } from 'hooks/hooks';
import { interviewUpdate as interviewUpdateValidationSchema } from 'validation-schemas/validation-schemas';

import {
  getInterviewersOptions,
  getInterviewStatusOptions,
} from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  interview: InterviewsGetAllItemResponseDto;
  handleUpdateInterview: (payload: InterviewsUpdateRequestDto) => void;
  interviewers: InterviewsGetInterviewerResponseDto[];
};

const InterviewItem: FC<Props> = ({
  interview,
  interviewers,
  handleUpdateInterview,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleToggleEditMode = (): void => {
    setIsEditMode((prevValue) => !prevValue);
  };

  const interviewersOptions = useMemo<SelectorOption<number>[]>(() => {
    return getInterviewersOptions(interviewers);
  }, [interviewers]);

  const statusOptions = useMemo<SelectorOption[]>(() => {
    return getInterviewStatusOptions();
  }, []);

  const camelCaseStatus = changeStringCase({
    caseType: StringCase.CAMEL_CASE,
    stringToChange: interview.status,
  });

  const { control, errors, handleSubmit } =
    useAppForm<InterviewsUpdateRequestDto>({
      defaultValues: {
        interviewerUserId: interview.interviewer?.id ?? '',
        status: interview.status,
      },
      validationSchema: interviewUpdateValidationSchema,
    });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handleUpdateInterview)}>
        <div className={styles.headerInterview}>
          <p className={styles.parameters}>Parameters</p>
          {!isEditMode && (
            <Button
              type="button"
              btnType="outlined"
              btnColor="blue"
              label="Edit"
              onClick={handleToggleEditMode}
            />
          )}
          {isEditMode && (
            <div className={styles.buttonsWrapper}>
              <Button
                type="button"
                btnType="outlined"
                btnColor="blue"
                label="Cancel"
                onClick={handleToggleEditMode}
                className={styles.marginRight}
              />
              <Button
                label="Save"
                btnColor="blue"
                onClick={handleSubmit(handleUpdateInterview)}
              />
            </div>
          )}
        </div>
        <div className={styles.interviewForm}>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Name</p>
            <p className={styles.interviewValue}>
              {interview?.interviewee.userDetails.fullName}
            </p>
          </div>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Email</p>
            <p className={styles.interviewValue}>
              {interview?.interviewee.email}
            </p>
          </div>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Type of course</p>
            <p className={styles.courseCategory}>
              {interview?.courseCategory.name}
            </p>
          </div>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Date of interview</p>
            <p className={styles.interviewValue}>
              {interview?.interviewDate
                ? getFormattedDate(interview?.interviewDate, 'yyyy-MM-dd')
                : ''}
            </p>
          </div>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Interviewer</p>
            {!isEditMode && (
              <p className={styles.interviewValue}>
                {interview?.interviewer?.userDetails.fullName ??
                  'Not assigned yet'}
              </p>
            )}
            {isEditMode && (
              <Select
                options={interviewersOptions}
                name={getNameOf<InterviewsUpdateRequestDto>(
                  'interviewerUserId',
                )}
                className={styles.select}
                control={control}
                errors={errors}
                label="Interviewers"
                hasVisuallyHiddenLabel
              />
            )}
          </div>

          <div className={styles.interviewRow}>
            <p className={styles.header}>Status</p>
            {!isEditMode && (
              <p
                className={getValidClasses(
                  styles.interviewValue,
                  styles.status,
                  styles[camelCaseStatus],
                )}
              >
                {interview.status}
              </p>
            )}
            {isEditMode && (
              <Select
                options={statusOptions}
                name={getNameOf<InterviewsUpdateRequestDto>('status')}
                className={styles.select}
                control={control}
                errors={errors}
                label="Status"
                hasVisuallyHiddenLabel
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export { InterviewItem };

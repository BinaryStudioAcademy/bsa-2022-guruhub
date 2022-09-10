import { StringCase } from 'common/enums/enums';
import {
  FC,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  SelectorOption,
} from 'common/types/types';
import { Button, Datepicker, Select } from 'components/common/common';
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
        interviewDate: interview?.interviewDate ?? null,
      },
      validationSchema: interviewUpdateValidationSchema,
    });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handleUpdateInterview)}>
        <div className={styles.headerInterview}>
          <p className={styles.parameters}>Parameters</p>
          {!isEditMode && (
            <div className={styles.buttonWrapper}>
              <Button
                type="button"
                btnColor="blue"
                label="Edit"
                onClick={handleToggleEditMode}
              />
            </div>
          )}
          {isEditMode && (
            <div className={styles.buttonsWrapper}>
              <div
                className={getValidClasses(
                  styles.marginRight,
                  styles.buttonWrapper,
                )}
              >
                <Button
                  type="button"
                  btnColor="gray"
                  label="Cancel"
                  onClick={handleToggleEditMode}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  label="Save"
                  btnColor="blue"
                  onClick={handleSubmit(handleUpdateInterview)}
                />
              </div>
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
            {!isEditMode && (
              <p className={styles.interviewValue}>
                {interview?.interviewDate
                  ? getFormattedDate(
                      interview?.interviewDate,
                      'HH:mm dd.MM.yyyy',
                    )
                  : 'Not set'}
              </p>
            )}
            {isEditMode && (
              <Datepicker
                control={control}
                name={getNameOf<InterviewsUpdateRequestDto>('interviewDate')}
                placeholder="Set interview date"
                minDate={new Date()}
                selectedDate={interview?.interviewDate}
                withTime={true}
              />
            )}
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

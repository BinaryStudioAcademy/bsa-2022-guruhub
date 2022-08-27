import {
  FC,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsUpdateRequestDto,
  SelectorOptions,
} from 'common/types/types';
import { Button, Select } from 'components/common/common';
import { getFormattedDate, getNameOf } from 'helpers/helpers';
import { useAppForm, useMemo, useState } from 'hooks/hooks';
import { interviewUpdate as interviewUpdateValidationSchema } from 'validation-schemas/validation-schemas';

import { getInterviewersOptions } from './helpers/helpers';
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

  const swapToEditMode = (value: boolean): void => {
    setIsEditMode(value);
  };

  const interviewersOptions = useMemo<SelectorOptions<number>[]>(() => {
    return getInterviewersOptions(interviewers);
  }, []);

  const { control, errors, handleSubmit } =
    useAppForm<InterviewsUpdateRequestDto>({
      defaultValues: {
        interviewerUserId: interview.interviewer?.id ?? '',
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
              onClick={swapToEditMode.bind(this, true)}
            />
          )}
          {isEditMode && (
            <div className={styles.buttonsWrapper}>
              <Button
                type="button"
                btnType="outlined"
                btnColor="blue"
                label="Cancel"
                onClick={swapToEditMode.bind(this, false)}
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
            <p className={styles.interviewValue}>{interview?.interviewee.id}</p>
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
                ? getFormattedDate(
                    interview?.interviewDate.toString(),
                    'yyyy-MM-dd',
                  )
                : ''}
            </p>
          </div>
          <div className={styles.interviewRow}>
            <p className={styles.header}>Interviewer</p>
            {!isEditMode && (
              <p className={styles.interviewValue}>
                {interview?.interviewer.email}
              </p>
            )}
            {isEditMode && (
              <Select
                className={styles.customSelect}
                options={interviewersOptions}
                name={getNameOf<InterviewsUpdateRequestDto>(
                  'interviewerUserId',
                )}
                control={control}
                errors={errors}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export { InterviewItem };

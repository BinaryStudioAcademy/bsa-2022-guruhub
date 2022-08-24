// import { CourseUpdateCategoryRequestDto, FC } from 'common/types/types';
// import { Button, Input, Modal } from 'components/common/common';
// import { getNameOf } from 'helpers/helpers';
// import { useAppDispatch, useAppForm } from 'hooks/hooks';
// import { courseActions } from 'store/actions';
// import { courseCreate as courseCreateValidationSchema } from 'validation-schemas/validation-schemas';

// import styles from './styles.module.scss';

// type Props = {
//   isModalOpen: boolean;
//   onModalToggle: () => void;
// };

// const AddCategoriesModal: FC<Props> = ({ isModalOpen, onModalToggle }) => {
//   const { control, errors, handleSubmit } = useAppForm<CourseUpdateCategoryRequestDto>({
//     defaultValues: DEFAULT_CREATE_COURSE_PAYLOAD,
//     validationSchema: courseCreateValidationSchema,
//   });

//   const dispatch = useAppDispatch();

//   const onSubmit = (payload: CourseUpdateCategoryRequestDto): void => {
//     dispatch(dashboardActions.addCourse(payload)).unwrap().then(onModalToggle);
//   };

//   return (
//     <Modal isOpen={isModalOpen} onClose={onModalToggle} title="Select new category">
//       <h3>Import</h3>
//       <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
//         <div className={styles.formContent}>
//           <Input
//             type="text"
//             label="Place the link"
//             name={getNameOf<CourseUpdateCategoryRequestDto>('url')}
//             control={control}
//             errors={errors}
//           />
//         </div>
//         <div className={styles.buttonWrapper}>
//           <Button type="submit" label="Submit course" btnColor="blue" />
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export { AddCategoriesModal };

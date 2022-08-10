import React, { FC, ReactElement } from 'react';
import { FlatList,View } from 'react-native';

import { CourseCard } from './components/components';
import { styles } from './styles';

const courses = [
  {
    id: '1',
    title: 'Coumplete giude to ASP.Net ',
    vendor_name: 'udemy',
    difficulty: 'Intermediate',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings: 206269,
    isBestseller: true,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/14346_9972_8.jpg',
  },
  {
    id: '2',
    title: 'Coumplete giude to ASP.NetCoumplete giude to ASP.Net',
    vendor_name: 'coursera',
    difficulty: 'Master',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings: 206269,
    isBestseller: false,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/709660_24ad_7.jpg',
  },
  {
    id: '3',
    title: 'Coumplete giude to ASP.Net',
    vendor_name: '',
    difficulty: 'Begginer',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings: 206269,
    isBestseller: true,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/14346_9972_8.jpg',
  },
  {
    id: '4',
    title: 'Coumplete giude to ASP.NetCoumplete giude to ASP.Net',
    vendor_name: 'coursera',
    difficulty: 'Master',
    author_name: 'Ivan Englishman',
    rating_star: '4.4',
    ratings: 206269,
    isBestseller: false,
    price: 33.33,
    course_image: 'https://img-c.udemycdn.com/course/240x135/709660_24ad_7.jpg',
  },
];

const Courses: FC = (): ReactElement => {
  const handleOnCourseCard = (): void => {
    // TODO add
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={({ id }): string => id}
        renderItem={({ item: course }): ReactElement => (
          <CourseCard course={course} onCoursePress={handleOnCourseCard} />
        )}
      />
    </View>
  );
};

export { Courses };

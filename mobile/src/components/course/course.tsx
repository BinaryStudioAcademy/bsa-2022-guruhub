import React, { FC } from 'react';
import { WebView } from 'react-native-webview';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import { Image, Spinner, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppSelector } from '~/hooks/hooks';

import { styles } from './styles';

const Course: FC = () => {
  const { course, dataStatus } = useAppSelector((state) => state.courses);
  const HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="color:white; margin: 0;">
      ${course?.description}
    </body>
    </html>
  `;

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{course?.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: course?.imageUrl ?? getImageUri(defaultCourseImage) }}
      />
      <Text style={styles.h2}>About this course</Text>
      <WebView style={styles.webView} source={{ html: HTML }} />
    </View>
  );
};

export { Course };

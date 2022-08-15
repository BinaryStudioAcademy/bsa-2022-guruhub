import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  title: string;
};

const Course: FC<Props> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          alt="course image"
          src="https://s3-alpha-sig.figma.com/img/1061/d0d6/5fb62cd92930225f6a1d36b92540ee20?Expires=1661731200&Signature=Zu0cMXk-wwu3vVPwL0EzGfJWPsHnFIVQuEM7xIzGE~vXM-HxagZXefxiskN22iM4mtVA0WueXEEj5VUmIlIVtaMfJfUoEjYPv~taQjbT-KRkt23-pMnAVv6PYlKXajTq-OxtWZXcq8DiTcA7thN38rYXvgvC4KHtFeMgsQzyRyWJRFHPRLJWfkvUd8b7ZFxmw0gMSgChR7NoCWffYrFbmdbM2X6b13eqyB-uF~t0Mjnt1qIJOZx-FhRjudqcMGJlYwxCEIh1QKERMycjrmCW~HWFkKbcv0tfmlUZ8~csQzPbvz92Evqqa8sdVGUD6x4EyLWItLBS5ODGxloZH-oNZQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          width="100%"
          height="100%"
        />
      </div>
      <div>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.instructor}>
          <Image
            src={defaultUserAvatar}
            width="25"
            height="25"
            alt="instructor avatar"
            isCircular
          />
          <small className={styles.instructorName}>Jonathan Due</small>
        </div>
        <div className={styles.footer}>
          <h4 className={styles.price}>FREE</h4>
        </div>
      </div>
    </div>
  );
};

export { Course };

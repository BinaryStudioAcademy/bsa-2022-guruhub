import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { VendorKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Icon, Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';

import { Bars } from '../components';
import styles from './styles.module.scss';

const MOCK_RATING = 4.1;

type Props = {
  title: string;
  vendor: VendorKey;
};

const Course: FC<Props> = ({ title, vendor }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vendor}>
        <Icon name={vendor} />
      </div>
      <div className={styles.level}>
        <p className={styles.levelTitle}>Intermediate</p>
        <div className={styles.bars}>
          <Bars level="intermediate" />
        </div>
      </div>
      <div className={styles.content}>
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
          <div className={styles.ratingContainer}>
            <p className={styles.ratingNumber}>{MOCK_RATING}</p>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={getValidClasses(
                  styles.rating,
                  index + 1 <= MOCK_RATING
                    ? styles.ratingFilled
                    : styles.ratingEmpty,
                )}
              >
                &#9733;
              </span>
            ))}
            <p className={styles.numOfVotes}>(206,269)</p>
          </div>
          <div className={styles.footer}>
            <h4 className={styles.price}>FREE</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Course };

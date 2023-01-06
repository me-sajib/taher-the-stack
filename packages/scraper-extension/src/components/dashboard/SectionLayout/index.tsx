import addClass from '../../../utils/addClass';
import Divider from '../Divider';
import styles from './index.module.css';

interface SectionLayoutPropTypes {
  title: string;
  description: string;
  children: JSX.Element | JSX.Element[];
  inputBoxClasses?: string;
}

const SectionLayout = ({
  title,
  description,
  children,
  inputBoxClasses
}: SectionLayoutPropTypes) => (
  <>
    <section className={styles.container}>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={addClass(styles.inputBox, inputBoxClasses)}>
        {children}
      </div>
    </section>
    <Divider />
  </>
);

export default SectionLayout;

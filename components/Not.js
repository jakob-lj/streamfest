import styles from './Not.module.css';

const Not = () => {
  const sendNot = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/not`, {
      method: 'POST',
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className={styles.button} onClick={sendNot}>
      <img className={styles.x} src="/not.png" />
    </div>
  );
};
export default Not;

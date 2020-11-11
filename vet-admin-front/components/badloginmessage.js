import styles from "../styles/badloginmessage.components.module.css";

const BadLoginMessage = (props) => {
  if (props.show) {
    return (
      <div className={styles.maincomponent}>
        <div className={styles.textcomponent}>Wrong email or password</div>
      </div>
    );
  } else {
    return <div />;
  }
};
export { BadLoginMessage };

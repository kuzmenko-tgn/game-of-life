import styles from "./style.module.css";

const Index = (props) => {
  const {
    value = 0,
    onChange,
    label = "",
  } = props;

  const onChangeInput = event => {
    onChange(parseInt(event.target.value))
  }

  return (
    <label className={styles.label}>
      {label}
      <input type="number" value={value} onChange={onChangeInput}/>
    </label>
  )
}

export default Index;

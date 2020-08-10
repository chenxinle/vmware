import React from "react";
import styles from "./Item.module.css";

class Item extends React.Component {
  handleInputChange = (e) => {
    let { id } = this.props.data;
    let { toggleCheckBox } = this.props;
    toggleCheckBox(id);
  };
  state = {
    showInput: false,
  };
  render() {
    let {
      id,
      name,
      location,
      office,
      phoneOffice,
      phoneCell,
      isChecked,
    } = this.props.data;
    let { showInput } = this.state;
    return (
      <tr>
        <td>
          {id && (
            <input
              name="isGoing"
              type="checkbox"
              checked={isChecked}
              onChange={this.handleInputChange}
            />
          )}
        </td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{location}</td>
        <td>{office}</td>
        <td>
          <div className={styles.phone}>
            <div className={`${styles.phoneItem} ${styles.phoneItemLeft}`}>
              {phoneOffice}
            </div>
            {showInput ? (
              <input
                autoFocus
                className={`${styles.phoneItem} ${styles.input}`}
                onChange={this.handleChange}
                type="text"
                onBlur={this.onBlur}
              ></input>
            ) : (
              <div
                onDoubleClick={this.onDoubleClick}
                className={styles.phoneItem}
              >
                {phoneCell}
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  }
  handleChange = (e) => {
    let { updatePhone, data, index } = this.props;
    let { id } = data;
    updatePhone(id, e.target.value, index);
  };
  onDoubleClick = () => {
    this.setState({
      showInput: true,
    });
  };
  onBlur = () => {
    let {updatePhone} = this.props
    setTimeout(() => {
      //清空更改
      updatePhone(-1, '')

      this.setState({
        showInput: false,
      });
    }, 200)
  };
}

export default Item;

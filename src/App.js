import React from "react";
import "./App.css";
import Item from "./Components/Item";
import { mock, addMockData } from "./mock";
import { formatData } from "./service";

class App extends React.Component {
  state = {
    data: formatData(mock),
    isChecked: false,
  };
  updatePhoneInfo = {};
  handleInputChange = () => {
    let { isChecked, data } = this.state;
    let newCheckStatus = !isChecked;
    data.forEach((d) => (d.isChecked = newCheckStatus));
    this.setState({
      isChecked: newCheckStatus,
      data: data.slice(),
    });
  };
  render() {
    return (
      <div>
        {this.renderTable()}
        {this.renderButton()}
      </div>
    );
  }
  update = () => {
    let { data } = this.state;
    let firstEmptyIndex;

    //这里是添加逻辑
    let adds = data.filter((d, index) => {
      if (!d.id && firstEmptyIndex === undefined) {
        firstEmptyIndex = index;
      }
      return !d.id;
    });

    if (adds.length) {
      adds.forEach((a) => {
        firstEmptyIndex++;
        a.id = firstEmptyIndex;
      });
    }

    //这里是修改号码逻辑
    let target;
    if (this.updatePhoneInfo.id === undefined) {
      //这里新增修改号码逻辑
      target = adds.find((a) => a.id === this.updatePhoneInfo.index + 1);
    } else {
      target = data.find((d) => d.id === this.updatePhoneInfo.id);
    }
    if (target) {
      target.phoneCell = this.updatePhoneInfo.phone;
    }

    this.setState({
      data: data.slice(),
    });
  };
  add = () => {
    this.setState({
      data: this.state.data.concat(formatData([{ ...addMockData }])),
    });
  };
  delete = () => {
    let { data } = this.state;
    let unSelectRows = data.filter((data) => data.isChecked === false);
    this.setState({
      data: unSelectRows.slice(),
    });
  };
  renderButton() {
    return (
      <div className="buttons">
        <div onClick={this.delete} className="button delete">
          Delete
        </div>
        <div className="button-right">
          <div onClick={this.update} className="button update">
            Update
          </div>
          <div onClick={this.add} className="button add">
            Add
          </div>
        </div>
      </div>
    );
  }
  headClick = (e) => {
    let { data } = this.state;
    let key = e.target.getAttribute("id");

    if (key === "input") return;

    data.sort((a, b) => {
      if (key === "phone") {
        return a.phoneOffice + a.phoneCell < b.phoneOffice + b.phoneCell
          ? "-1"
          : "1";
      }
      return a[key] < b[key] ? "-1" : "1";
    });
    this.setState({
      data: data.slice(),
    });
  };
  renderTable() {
    let { isChecked, data } = this.state;
    return (
      <table>
        <thead>
          <tr onClick={this.headClick}>
            <th id="input">
              <input
                name="isGoing"
                type="checkbox"
                checked={isChecked}
                onChange={this.handleInputChange}
              />
            </th>
            <th id="id">ID</th>
            <th id="name">Name</th>
            <th id="location">Location</th>
            <th id="office">Office</th>
            <th id="phone">
              <div id="phone" className="phone">
                Phone
              </div>
              <div id="phone" className="phone-bottom">
                <div id="phone" className="phone-item phone-item-left">
                  Office
                </div>
                <div id="phone" className="phone-item">
                  Cell
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderItems()}</tbody>
      </table>
    );
  }
  renderItems() {
    let { data } = this.state;
    return data.map((d, index) => (
      <Item
        data={d}
        key={d.id || index + 1}
        index={index}
        toggleCheckBox={this.toggleCheckBox}
        updatePhone={this.updatePhone}
      />
    ));
  }
  updatePhone = (id, phone, index) => {
    this.updatePhoneInfo.id = id;
    this.updatePhoneInfo.phone = phone;
    this.updatePhoneInfo.index = index;
  };
  toggleCheckBox = (id) => {
    let { data } = this.state;
    let target = data.find((d) => d.id === id);
    target.isChecked = !target.isChecked;

    this.setState({
      data: data.slice(),
      isChecked: data.every((d) => d.isChecked === true),
    });
  };
}

export default App;

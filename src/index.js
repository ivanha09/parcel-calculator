import React from "react";
import ReactDOM from "react-dom";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import Map from "./Map";

import "./styles.css";

function Accordion() {
  return (
    <div className="tabs">
      <div className="tab">
        <input className="checkbox" type="checkbox" id="chck1" />
        <label className="tab-label" htmlFor="chck1">
          Details
        </label>
        <div className="tab-content">
          Length refers to the longest side of the postal items.
          <br />
          <br />
          Circumference refers to the longest distance around the postal item
          with the direction that is not its length.
        </div>
      </div>
    </div>
  );
}

function QuickResult(props) {
  //const { length, width, height } = props;
  const length = props.length ? props.length : 0;
  const width = props.width ? props.width : 0;
  const height = props.height ? props.height : 0;
  const total = length + (height + width) * 2;

  if (length > 150) {
    return (
      <h1>
        The total dimensions for the parcel is {total} cm. <br />
        Length is too long for A and B Standard: {length}
      </h1>
    );
  } else if (length > 105) {
    return (
      <h1>
        The total dimensions for the parcel is {total} cm. <br />
        Length is too long for <span className="redText">B Standards</span>.
      </h1>
    );
  } else if (total > 300) {
    return (
      <h1>
        The total dimensions for the parcel is {total} cm. <br />
        Total dimension is too large for A and B Standards.
      </h1>
    );
  } else if (total > 200) {
    return (
      <h1>
        The total dimensions for the parcel is {total} cm. <br />
        Total dimension is too large for B Standards.
      </h1>
    );
  } else {
    return <h1>The total dimensions for the parcel is {total} cm.</h1>;
  }

  // length > 105
  // ? "Length is too long for B Standard: " + length
  // : length > 150
  // ? "Length is too long for B Standard: " + length
  // : total > 300
  // ? "Total is longer than 3 meters: " + total
  // : total > 200
  // ? "Total is longer than 2 meters: " + total
  // : "Length: " +
  //   length +
  //   " Width: " +
  //   width +
  //   " Height: " +
  //   height +
  //   " Total: " +
  //   total
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: "",
      width: "",
      height: ""
      // displayResult: ""
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleSubmit(event) {
  //   const length = this.state.length ? parseFloat(this.state.length) : 0;
  //   const height = this.state.length ? parseFloat(this.state.length) : 0;
  //   const width = this.state.length ? parseFloat(this.state.length) : 0;

  //   const total = length + (height + width) * 2;

  //   const result =
  //     length > 105
  //       ? "Length is too long for B Standard: " + length
  //       : length > 150
  //       ? "Length is too long for B Standard: " + length
  //       : total > 300
  //       ? "Total is longer than 3 meters: " + total
  //       : total > 200
  //       ? "Total is longer than 2 meters: " + total
  //       : "Length: " +
  //         length +
  //         " Width: " +
  //         width +
  //         " Height: " +
  //         height +
  //         " Total: " +
  //         total;

  //   this.setState({ displayResult: result });

  //   event.preventDefault();
  // }

  render() {
    // height={parseFloat(this.state.height)}
    // width={parseFloat(this.state.width)}
    const total =
      parseFloat(this.state.length) +
      (parseFloat(this.state.height) + parseFloat(this.state.width)) * 2;
    const aStyle =
      this.state.length > 150
        ? { color: "red" }
        : total > 300
        ? { color: "red" }
        : total > 0
        ? { color: "green" }
        : { color: "grey" };
    const bStyle =
      this.state.length > 105
        ? { color: "red" }
        : total > 200
        ? { color: "red" }
        : total > 0
        ? { color: "green" }
        : { color: "grey" };
    const aStandard =
      this.state.length > 150
        ? "red"
        : total > 300
        ? "red"
        : total > 0
        ? "green"
        : "grey";
    const bStandard =
      this.state.length > 105
        ? "red"
        : total > 200
        ? "red"
        : total > 0
        ? "green"
        : "grey";

    return (
      <div className="App">
        <div className="info">
          <h1>Parcel Size Calculator</h1>
          <h3>Enter the dimensions to check the size</h3>
          <form className="wrapper" onSubmit={this.handleSubmit}>
            <p className="label">length (cm):</p>
            <input
              className="box"
              type="text"
              name="length"
              placeholder="60 cm"
              value={this.state.length}
              onChange={this.handleChange}
            />

            <p className="label">width (cm):</p>
            <input
              className="box"
              type="text"
              name="width"
              placeholder="60 cm"
              value={this.state.width}
              onChange={this.handleChange}
            />
            <p className="label">height (cm):</p>
            <input
              className="box"
              type="text"
              name="height"
              placeholder="60 cm"
              value={this.state.height}
              onChange={this.handleChange}
            />

            <br />
          </form>

          <Accordion />

          <p style={aStyle}>
            A: Length = within 150 cm
            <br />
            Length + (Height+Width) x 2 = within 300 cm
            <br />
            Examples of the countries where "A' standards apply:
            <br />
            China, Taiwan, Hong Kong, England
          </p>
          <p style={bStyle}>
            B: Length = within 105 cm
            <br />
            Length+(Height+Width) x 2 = within 200 cm
            <br />
            Examples of the countries where "B" standards apply:
            <br />
            USA, Australia, Korea, Brazil, Mexico
          </p>
          <p>{this.state.displayResult}</p>
          <QuickResult
            length={parseFloat(this.state.length)}
            height={parseFloat(this.state.height)}
            width={parseFloat(this.state.width)}
          />
        </div>
        <div>
          <P5Wrapper
            sketch={sketch}
            rotation={this.state.width}
            length={this.state.length}
            height={this.state.height}
            width={this.state.width}
          />
          <Map aStandard={aStandard} bStandard={bStandard} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

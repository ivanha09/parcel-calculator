import React from "react";
import { VectorMap } from "react-jvectormap";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  changeBg() {
    this.myRef.setBackgroundColor("red");
    // this.refs.map.setBackgroundColor("red");
  }
  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.setBackgroundColor("red");
  }

  render() {
    let A = this.props.aStandard;
    let B = this.props.bStandard;

    const mapData = {
      US: B,
      CA: B,
      MX: B,
      KR: B,
      TW: A,
      CN: A,
      GB: A,
      HK: A
    };

    return (
      <div style={{ width: "100%", height: 500 }}>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "100%"
          }}
          ref={this.textInput}
          onRegionClick={this.focusTextInput} //gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" //color for the clicked country
            },
            selectedHover: {}
          }}
          // regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData,
                attribute: "fill"
                //values: mapData, //this is your data
                //scale: ["#ff0000", "#146804"], //your color game's here
                //normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    );
  }
}
export default Map;

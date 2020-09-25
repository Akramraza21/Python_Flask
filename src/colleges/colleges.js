import React from "react";
import Head from "./head";
import classes from "../colleges/colleges.module.css";

export default function Colleges(props) {
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.data.colleges.map((param, index) => (
          <div key={index} className={classes.container}>
            <Head
              promoted={param.promoted}
              tags={param.tags}
              rating={param.rating}
              ranking={param.ranking}
              rating_remarks={param.rating_remarks}
            />
            <img
              className={classes.picture}
              src={require("../assets/college_02.jpg")}
              alt="college"
            />

            {/* */}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className={classes.collegeName}>
              <div className={classes.fee}>
                <span className={classes.discount}>
                  <del className={classes.smallSize}>
                    ₹{param.discounted_fees}
                  </del>
                </span>
                <span className={classes.smallSize}>
                  <span className={classes.discountPercent}>
                    ·{param.discount}
                  </span>
                </span>

                <div className={classes.originalFee}>
                  ₹{param.original_fees}
                </div>
                <div>
                  <small className={classes.smallSize}>
                    {param.fees_cycle}
                  </small>
                </div>
                <div style={{ paddingTop: "22px", fontSize: "14px" }}>
                  <span className={classes.offColor}>
                    {param.amenties[0]} · {param.amenties[1]}
                  </span>
                </div>
              </div>
              {param.college_name} &nbsp; &nbsp;
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className={classes.unchecked}>
                <span className="fa fa-star"></span>
              </span>
              <br />
              <div className={classes.nearestPlace}>
                <small>
                  <span>{param.nearest_place[0]}</span>
                  &nbsp; &nbsp;
                  <span className={classes.distance}>
                    | &nbsp;{param.nearest_place[1]}
                  </span>
                </small>
                <div className={classes.locate}>
                  <span className={classes.offColor}> 93% Match :</span> 2.5kms
                  <span className={classes.distance}> from GTB Nagar</span>
                  <span className={classes.offColor}>,</span> 7 Kms
                  <span className={classes.distance}> from Rajiv Chowk</span>
                </div>
              </div>
              <div className={classes.offer}>
                Flat Rs<span className={classes.offColor}>2,000</span> off +
                upto Rs <span className={classes.offColor}>500</span> wallet! to
                avail...
                <span className={classes.login}> LOGIN </span>
              </div>
            </div>

            <br />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

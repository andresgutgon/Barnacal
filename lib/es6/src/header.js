// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Curry       from "bs-platform/lib/es6/curry.js";
import * as React       from "react";
import * as ReasonReact from "reason-react/lib/es6/src/ReasonReact.js";
import * as Format      from "date-fns/format";

var component = ReasonReact.statelessComponent("Header");

var header_styles = {
  backgroundColor: "#000",
  display: "flex",
  marginBottom: "10px",
  paddingTop: "0px",
  textAlign: "center",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  alignItems: "center"
};

var header_text_styles = {
  color: "#fff",
  cursor: "pointer",
  fontSize: "22px",
  lineHeight: "40px",
  margin: "0",
  padding: "0.5em 0",
  flexGrow: "2"
};

var navigation_styles = {
  color: "#FFF",
  fontSize: "1.2rem",
  textDecoration: "none",
  width: "50px"
};

function make(reduce, date, onNextMonth, onLastMonth, resetDate, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var current_month = Format(date, "MMMM YYYY");
      return React.createElement("div", {
                  style: header_styles
                }, React.createElement("a", {
                      style: navigation_styles,
                      href: "#",
                      onClick: Curry._1(reduce, onLastMonth),
                      dangerouslySetInnerHTML: {
                        __html: "&larr;"
                      }
                    }), React.createElement("h1", {
                      style: header_text_styles,
                      onClick: Curry._1(reduce, resetDate)
                    }, current_month), React.createElement("a", {
                      style: navigation_styles,
                      href: "#",
                      onClick: Curry._1(reduce, onNextMonth),
                      dangerouslySetInnerHTML: {
                        __html: "&rarr;"
                      }
                    }));
    });
  return newrecord;
}

export {
  component          ,
  header_styles      ,
  header_text_styles ,
  navigation_styles  ,
  make               ,
  
}
/* component Not a pure module */

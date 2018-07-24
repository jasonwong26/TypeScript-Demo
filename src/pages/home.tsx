import * as React from "react";
import Page from "../components/layout/Page";

const articleUrl = "https://dev.to/resir014/redux-4--typescript-29-a-type-safe-approach-2lf4";
const apiHost = process.env.REACT_APP_API_ENDPOINT || "";
const target = "blank";
const rel = "noopener noreferrer";

export default () => (
  <Page>
    <h1>Welcome!</h1>
    <p>
      Welcome to the Redux 4 + TypeScript 2.9 example! This example site shows you the ideal
      project structure, recommended libraries, as well as design pattern on writing type-safe
      React + Redux app with TypeScript.
    </p>
    <p>
      This project is test bed based on: {" "}
      <a href={articleUrl}
         target={target}
         rel={rel}>
         this post
      </a>.
    </p>
    <p>
      To demonstrate, the interactions, tthi site pulls data from the {" "}
      <a href={apiHost}
        target={target}
        rel={rel}>
        OpenDota API
      </a>, and displays information like professional teams, heroes, as well as top players by
      hero. This will also demonstrate how to structure your stores for each feature/module in a
      Redux-enabled app.
    </p>
    <p>Enjoy your stay!</p>
  </Page>
);

import * as React from "react";

interface PageProps {
  className?: string
}

const Page: React.SFC<PageProps> = ({ children }) => (
  <div className="container">{children}</div>
);

export default Page;

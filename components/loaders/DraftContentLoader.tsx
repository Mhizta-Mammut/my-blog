import React from "react"
import ContentLoader from "react-content-loader";

const DraftContentLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <rect x="0" y="4" rx="5" ry="5" width="262" height="25" />
    <rect x="-6" y="40" rx="3" ry="3" width="134" height="7" />
  </ContentLoader>
)

export default DraftContentLoader;
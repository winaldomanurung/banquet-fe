// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
//   useRouteMatch,
// } from "react-router-dom";

// // Since routes are regular React components, they
// // may be rendered anywhere in the app, including in
// // child elements.
// //
// // This helps when it's time to code-split your app
// // into multiple bundles because code-splitting a
// // React Router app is the same as code-splitting
// // any other React app.

// export default function NestingExample() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <hr />

//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function Topics() {
//   // The `path` lets us build <Route> paths that are
//   // relative to the parent route, while the `url` lets
//   // us build relative links.
//   let { path, url } = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${url}/rendering`}>Rendering with React</Link>
//         </li>
//         <li>
//           <Link to={`${url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Switch>
//         <Route exact path={path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//         <Route path={`${path}/:topicId`}>
//           <Topic />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   // The <Route> that rendered this component has a
//   // path of `/topics/:topicId`. The `:topicId` portion
//   // of the URL indicates a placeholder that we can
//   // get from `useParams()`.
//   let { topicId } = useParams();

//   return (
//     <div>
//       <h3>{topicId}</h3>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useRouteMatch } from "react-router-dom";
import ProfileShow from "../components/ProfileShow";
import ProfileEdit from "../components/ProfileEdit";
import ProfileResetPass from "../components/ProfileResetPass";
import ProfileVerification from "../components/ProfileVerification";

import styles from "./Profile.module.css";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles["nav-items"]}>
          <Link to={`${url}/show`} className={styles["nav-item"]}>
            Profile
          </Link>
          <Link to={`${url}/edit`} className={styles["nav-item"]}>
            Edit Profile
          </Link>
          <Link to={`${url}/verification`} className={styles["nav-item"]}>
            Verification
          </Link>
          <Link to={`${url}/reset-password`} className={styles["nav-item"]}>
            Reset Password
          </Link>
        </ul>
      </nav>

      {/* <Routes exact path={path}>
        <Route path="/profile" element={<ProfileShow />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="/verification" element={<ProfileResetPass />} />
        <Route path="/reset-password" element={<ProfileVerification />} />
      </Routes> */}
      <Routes exact path={path}>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Routes>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

export default Profile;

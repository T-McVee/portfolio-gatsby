import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  faGithub,
  faLinkedin,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faAngular,
  faSass,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faGithub,
  faLinkedin,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faAngular,
  faSass,
  faEnvelope,
  faXmark
);

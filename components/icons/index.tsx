import { Permission } from "../permission";

import { Role } from "./role";
import { Application } from "./application";
import { Bolt } from "./bolt";
import { Create } from "./create";
import { Credentials } from "./credentials";
import { Dashboard } from "./dashboard";
import { Delete } from "./delete";
import { Documentation } from "./documnentation";
import { Edit } from "./edit";
import { LockClosed } from "./lock-closed";
import { Log } from "./log";
import { MinusCircle } from "./minus-circle";
import { Option } from "./option";
import { Plugin } from "./plugin";
import { PlusCircle } from "./plus-circle";
import { QuestionMark } from "./question-mark";
import { Session } from "./session";
import { Setting } from "./setting";
import { Users } from "./users";
import { Drag } from "./drag";
import { Scope } from "./scope";
import { Layout } from "./layout";
import { Ai } from "./ai";

const Icons = {
  PlusCircle,
  MinusCircle,
  LockClosed,
  Documentation,
  QuestionMark,
  Bolt,
  Dashboard,
  Application,
  Credentials,
  Session,
  Users,
  Log,
  Plugin,
  Setting,
  Role,
  Permission,
  Option,
  Edit,
  Delete,
  Create,
  Drag,
  Scope,
  Layout,
  Ai
};

export type IconName = keyof typeof Icons;

export default Icons;

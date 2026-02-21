import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import CreateTeam from "./pages/CreateTeam";
import GenerateCode from "./pages/GenerateCode";
import ManageMembers from "./pages/ManageMembers";
import JoinTeam from "./pages/JoinTeam";
import InterestForm from "./pages/InterestForm";
import Home from "./pages/Home";
import MealMatchRequest from "./pages/MealMatchRequest";
import MealMatchAuto from "./pages/MealMatchAuto";
import GroupAssignment from "./pages/GroupAssignment";
import MissionList from "./pages/MissionList";
import MissionDetail from "./pages/MissionDetail";
import MissionSubmit from "./pages/MissionSubmit";
import MissionApproval from "./pages/MissionApproval";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/role-selection", Component: RoleSelection },
  { path: "/create-team", Component: CreateTeam },
  { path: "/generate-code", Component: GenerateCode },
  { path: "/manage-members", Component: ManageMembers },
  { path: "/join-team", Component: JoinTeam },
  { path: "/interest-form", Component: InterestForm },
  { path: "/home", Component: Home },
  { path: "/meal-match-request", Component: MealMatchRequest },
  { path: "/meal-match-auto", Component: MealMatchAuto },
  { path: "/group-assignment", Component: GroupAssignment },
  { path: "/mission-list", Component: MissionList },
  { path: "/mission/:id", Component: MissionDetail },
  { path: "/mission/:id/submit", Component: MissionSubmit },
  { path: "/mission-approval", Component: MissionApproval },
  { path: "/ranking", Component: Ranking },
  { path: "/profile", Component: Profile },
]);

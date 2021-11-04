import React from "react";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import Tabs from "../Tabs/Tabs";
import UserLogs from "../UserLogs/UserLogs";
import Manager from "../Manager/Manager";

const componentMapping = {
  Admin: Tabs,
  Manager: Manager,
  User: UserLogs,
};
function Dashboard() {
  const role = localStorage.getItem("role");
  const Component = componentMapping[role];
  return (
    <>
      <DashboardContent>
        <Component buttonTitle="Add New User" />
      </DashboardContent>
    </>
  );
}

export default Dashboard;

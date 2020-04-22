import React from "react";
import { Link } from "react-router-dom";

const SettingsActions = () => {
  return (
    <div>
      <div class="dash-buttons my-4">
        <Link to="/editProfile" class="btn btn-light">
          <i class="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/addProject" class="btn btn-light ml-2">
          <i class="fas fa-tasks text-primary"></i> Add Project
        </Link>
      </div>
    </div>
  );
};

export default SettingsActions;
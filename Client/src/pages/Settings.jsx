import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, checked } = e.target;
    setSecurity((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-4 md:p-6 min-h-screen space-y-8 bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Notification Preferences */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>Email Alerts</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>SMS Alerts</span>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Security Settings</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="twoFactorAuth"
            checked={security.twoFactorAuth}
            onChange={handleSecurityChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span>Enable Two-Factor Authentication (2FA)</span>
        </label>
      </div>

      {/* Account Info */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <h3 className="text-lg font-semibold">Account Info</h3>
        <p>
          <span className="font-medium">Username:</span> admin_user
        </p>
        <p>
          <span className="font-medium">Role:</span> Super Admin
        </p>
        <p>
          <span className="font-medium">Email:</span> admin@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Settings;

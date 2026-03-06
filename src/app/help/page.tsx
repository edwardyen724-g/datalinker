import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Transform Your Data Management Experience with DataLinker!</h1>
      <p className="mb-6">
        DataLinker is designed to streamline dynamic data management for low-code developers. Below are some essential features and guidance to get you started.
      </p>

      <h2 className="text-xl font-semibold mb-3">MVP Features</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Dynamic value assignments to data fields through an easy-to-use visual editor.</li>
        <li>Drag-and-drop interface for linking data entries and establishing relationships.</li>
        <li>Predefined templates for common data management scenarios to speed up setup.</li>
        <li>Real-time previews of data interactions as changes are made.</li>
        <li>Contextual help and tooltips for guiding users through complex data management tasks.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
      <p className="mb-4">
        Begin by signing up or logging into DataLinker. Once logged in, you can access the visual editor and start creating your data models with our drag-and-drop feature.
      </p>

      <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
      <p>
        If you have any questions or need assistance, feel free to reach out through our support channels or refer to the documentation provided within the app.
      </p>
    </div>
  );
};

export default HelpPage;
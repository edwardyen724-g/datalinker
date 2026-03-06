import React from 'react';
import Image from 'next/image';

const Page: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Transform Your Data Management Experience with DataLinker!
      </h1>
      <p className="mt-4 text-lg text-center text-gray-600">
        Streamline dynamic data management for low-code developers.
      </p>
      <Image
        src="/images/datalinker-hero.png"
        alt="DataLinker Hero Image"
        width={720}
        height={480}
        className="mt-6 rounded-lg"
      />
      <section className="mt-8 max-w-4xl space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">MVP Features</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Dynamic value assignments to data fields through an easy-to-use visual editor.</li>
          <li>Drag-and-drop interface for linking data entries and establishing relationships.</li>
          <li>Predefined templates for common data management scenarios to speed up setup.</li>
          <li>Real-time previews of data interactions as changes are made.</li>
          <li>Contextual help and tooltips for guiding users through complex data management tasks.</li>
        </ul>
      </section>
      <footer className="mt-10">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} DataLinker. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Page;
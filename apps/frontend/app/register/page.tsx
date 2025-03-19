"use client";

import { useState } from "react";

const steps = [
  "Select Business Type",
  "Provide Owner Details",
  "Set Business Location",
  "Review & Submit",
];

export default function RegisterCompany() {
  const [step, setStep] = useState(0);

  return (
    <div className="container mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-900">Company Formation</h2>
      <p className="text-gray-600 mt-2">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="mt-6 flex space-x-4">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className={`px-4 py-2 rounded-md ${step === 0 ? "bg-gray-300" : "bg-blue-600 text-white"}`}
        >
          Previous
        </button>
        <button
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

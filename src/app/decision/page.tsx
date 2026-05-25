import { Suspense } from "react";
import DecisionClient from "./DecisionClient";

export default function DecisionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <DecisionClient />
    </Suspense>
  );
}

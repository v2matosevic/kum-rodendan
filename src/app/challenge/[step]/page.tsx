import ChallengeClient from "./ChallengeClient";

export function generateStaticParams() {
  return [{ step: "1" }, { step: "2" }, { step: "3" }];
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  return <ChallengeClient step={step} />;
}

import DecisionClient from "./DecisionClient";

export default async function DecisionPage(props: {
  searchParams: Promise<{ video?: string }>;
}) {
  const searchParams = await props.searchParams;
  const video = searchParams.video ?? "";
  return <DecisionClient video={video} />;
}
